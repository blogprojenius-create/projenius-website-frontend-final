import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import emailjs from "@emailjs/browser";

import ContactContextIndicator from "../ContactContextIndicator/ContactContextIndicator";
import ContactFormProgress from "../ContactFormProgress/ContactFormProgress";
import ContactDynamicField from "../ContactDynamicField/ContactDynamicField";
import ContactButton from "../ContactButton/ContactButton";
import ContactError from "../ContactError/ContactError";
import ContactIcon from "../ContactIcon/ContactIcon";
import { formatFileSize } from "../ContactFileUpload/ContactFileUpload";
import {
  CONTACT_CONFIG,
  CONTACT_TYPES,
} from "../ContactConfig/ContactConfig";

import "./ContactSmartForm.css";


/* ==========================================================================
   EMAILJS CONFIGURATION
========================================================================== */

const EMAILJS_SERVICE_ID = "service_z16d4s2";

const EMAILJS_ADMIN_TEMPLATE_ID = "template_8pa3m69";

const EMAILJS_USER_TEMPLATE_ID = "template_tyrxtpq";

const EMAILJS_PUBLIC_KEY = "GlKARJgJpVd5y7KUO";

const ADMIN_EMAIL = "teamprojenius@gmail.com";


/* ==========================================================================
   FORM HELPERS
========================================================================== */

const CORE_FIELDS = [
  "name",
  "email",
  "phone",
  "organisation",
  "city",
  "message",
];

const isEmpty = (v) =>
  Array.isArray(v)
    ? v.length === 0
    : !String(v ?? "").trim();

const flattenFields = (type) =>
  type.sections.flatMap(
    (section) => section.fields
  );

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* ==========================================================================
   SUBMISSION ID
========================================================================== */

function newSubmissionId() {
  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }

  return `sub-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}


/* ==========================================================================
   SOURCE LABEL
========================================================================== */

function getSourceLabel(sourcePage) {
  const match = Object.values(CONTACT_TYPES).find(
    (t) => t.meta.source === sourcePage
  );

  return match
    ? match.meta.sourceLabel
    : null;
}


/* ==========================================================================
   VALIDATION
========================================================================== */

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


function isValidPhone(value) {
  const c = String(value).replace(
    /[\s\-().]/g,
    ""
  );

  return (
    /^(\+91|91|0)?[6-9]\d{9}$/.test(c) ||
    /^\+\d{7,15}$/.test(c)
  );
}


function getFileProblem(
  field,
  file,
  maxMB
) {
  const ext = (
    file.name.split(".").pop() || ""
  ).toLowerCase();

  if (!field.ext.includes(ext)) {
    return `That file type isn’t accepted. Please upload a ${field.fmt} file.`;
  }

  if (
    file.size >
    maxMB * 1024 * 1024
  ) {
    return `That file is ${formatFileSize(
      file.size
    )}. The maximum size is ${maxMB} MB.`;
  }

  return "";
}


function validateField(
  field,
  value,
  file,
  maxMB = CONTACT_CONFIG.maxFileMB
) {
  if (field.type === "file") {
    return file
      ? getFileProblem(field, file, maxMB)
      : "";
  }

  if (isEmpty(value)) {
    if (!field.required) return "";

    if (field.type === "select") {
      return "Choose an option.";
    }

    if (field.id === "name") {
      return "Enter your full name.";
    }

    if (field.id === "email") {
      return "Enter your email address.";
    }

    if (field.id === "phone") {
      return "Enter your phone or WhatsApp number.";
    }

    if (field.id === "message") {
      return "Tell us a little about your enquiry.";
    }

    return `${field.label} is required.`;
  }

  const s = String(value).trim();

  if (
    field.type === "email" &&
    !EMAIL_RE.test(s)
  ) {
    return "Enter a valid email address, like name@example.com.";
  }

  if (
    field.type === "tel" &&
    !isValidPhone(s)
  ) {
    return "Enter a valid phone number. Add the country code if it’s outside India.";
  }

  if (
    field.minLength &&
    s.length < field.minLength
  ) {
    return field.id === "message"
      ? "Add a little more detail (at least 10 characters)."
      : `Enter at least ${field.minLength} characters.`;
  }

  if (
    field.type === "number" &&
    (
      Number.isNaN(Number(s)) ||
      Number(s) < (field.min ?? 0)
    )
  ) {
    return "Enter a valid number.";
  }

  return "";
}


/* ==========================================================================
   PAYLOAD
========================================================================== */

function cleanValue(field, value) {
  if (field.type === "multi") {
    return (
      Array.isArray(value)
        ? value
        : []
    ).filter((x) =>
      field.options.includes(x)
    );
  }

  if (
    field.type === "select" ||
    field.type === "radio"
  ) {
    return field.options.includes(value)
      ? value
      : "";
  }

  return String(value ?? "").trim();
}


function buildPayload({
  typeKey,
  sourcePage,
  fields,
  values,
  files,
  submissionId,
}) {
  const payload = {
    enquiryType: typeKey,
    sourcePage,

    name: "",
    email: "",
    phone: "",
    organisation: "",
    city: "",
    message: "",

    enquirySpecificFields: {},

    attachment: null,

    timestamp: "",

    submissionId,
  };

  let file = null;

  fields.forEach((field) => {
    if (field.type === "file") {
      if (files[field.id]) {
        file = files[field.id];

        payload.attachment = {
          field: field.id,
          name: file.name,
          size: file.size,
          type: file.type || null,
        };
      }

      return;
    }

    const v = cleanValue(
      field,
      values[field.id]
    );

    if (
      CORE_FIELDS.includes(field.id)
    ) {
      payload[field.id] = v;
    } else if (!isEmpty(v)) {
      payload.enquirySpecificFields[
        field.id
      ] = v;
    }
  });

  payload.timestamp =
    new Date().toISOString();

  return {
    payload,
    file,
  };
}


/* ==========================================================================
   SUBMIT ERROR
========================================================================== */

class SubmitError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}


/* ==========================================================================
   EMAILJS SUBMISSION
========================================================================== */

async function submitEnquiry({
  payload,
  file,
  form,
}) {
  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_ADMIN_TEMPLATE_ID ||
    !EMAILJS_USER_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY
  ) {
    throw new SubmitError(
      "EMAILJS_NOT_CONFIGURED",
      "Email service is not configured."
    );
  }

  if (!form) {
    throw new SubmitError(
      "FORM_NOT_FOUND",
      "The enquiry form could not be found."
    );
  }

  const sourceLabel =
    getSourceLabel(
      payload.sourcePage
    ) ||
    payload.enquiryType ||
    "General Enquiry";

  const submittedAt =
    new Date(
      payload.timestamp
    ).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );


  /* =========================================================
     ADMIN EMAIL
  ========================================================= */

  const adminParams = {
    to_email: ADMIN_EMAIL,

    name: payload.name,

    email: payload.email,

    phone: payload.phone,

    organisation:
      payload.organisation ||
      "Not provided",

    city:
      payload.city ||
      "Not provided",

    message:
      payload.message ||
      "Not provided",

    enquiry_type:
      sourceLabel,

    source_page:
      payload.sourcePage ||
      "Website",

    enquiry_details:
      Object.keys(
        payload.enquirySpecificFields
      ).length
        ? JSON.stringify(
            payload.enquirySpecificFields,
            null,
            2
          )
        : "No additional details",

    submitted_at:
      submittedAt,

    submission_id:
      payload.submissionId,
  };


  try {
    /*
      sendForm() is used for the admin email because
      the form contains the actual File input.

      This allows EmailJS to send the selected
      attachment together with the enquiry.
    */

    const adminResponse =
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        form,
        {
          publicKey:
            EMAILJS_PUBLIC_KEY,
        }
      );


    if (
      !adminResponse ||
      adminResponse.status !== 200
    ) {
      throw new SubmitError(
        "ADMIN_EMAIL_FAILED",
        "We couldn’t send your enquiry to our team."
      );
    }


    /* =======================================================
       USER CONFIRMATION EMAIL
    ======================================================= */

    const userParams = {
      to_email:
        payload.email,

      name:
        payload.name,

      email:
        payload.email,

      phone:
        payload.phone,

      enquiry_type:
        sourceLabel,

      source_page:
        payload.sourcePage ||
        "Website",

      message:
        payload.message ||
        "Not provided",

      submitted_at:
        submittedAt,

      submission_id:
        payload.submissionId,
    };


    const userResponse =
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_USER_TEMPLATE_ID,
        userParams,
        {
          publicKey:
            EMAILJS_PUBLIC_KEY,
        }
      );


    if (
      !userResponse ||
      userResponse.status !== 200
    ) {
      throw new SubmitError(
        "USER_EMAIL_FAILED",
        "Your enquiry was received, but the confirmation email could not be sent."
      );
    }


    return {
      ok: true,
      admin: true,
      user: true,
    };

  } catch (error) {
    console.error(
      "EmailJS submission error:",
      error
    );

    if (
      error instanceof SubmitError
    ) {
      throw error;
    }

    throw new SubmitError(
      "EMAILJS_ERROR",
      "We couldn’t send your enquiry. Please try again."
    );
  }
}


/* ==========================================================================
   MAIN FORM
========================================================================== */

export default function ContactSmartForm({
  typeKey,
  arrived,
  sourcePage,
  onChangeType,
  onSuccess,
}) {
  const type =
    CONTACT_TYPES[typeKey];

  const fields = useMemo(
    () => flattenFields(type),
    [type]
  );

  const fieldMap = useMemo(
    () =>
      Object.fromEntries(
        fields.map((f) => [
          f.id,
          f,
        ])
      ),
    [fields]
  );


  /* =========================================================
     STATE
  ========================================================= */

  const [values, setValues] =
    useState({});

  const [files, setFiles] =
    useState({});

  const [errors, setErrors] =
    useState({});

  const [touched, setTouched] =
    useState({});

  const [summary, setSummary] =
    useState("");

  const [submitError, setSubmitError] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [tipsOpen] =
    useState(
      () =>
        typeof window !==
          "undefined" &&
        window.matchMedia(
          "(min-width: 960px)"
        ).matches
    );


  /* =========================================================
     REFS
  ========================================================= */

  const submittingRef =
    useRef(false);

  const mountedRef =
    useRef(true);

  const submissionId =
    useRef(
      newSubmissionId()
    );

  const formRef =
    useRef(null);


  /* =========================================================
     EFFECTS
  ========================================================= */

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);


  useEffect(() => {
    setErrors({});
    setTouched({});
    setSummary("");
    setSubmitError(null);
  }, [typeKey]);


  /* =========================================================
     PROGRESS
  ========================================================= */

  const requiredFields =
    fields.filter(
      (f) => f.required
    );

  const doneCount =
    requiredFields.filter(
      (f) =>
        !isEmpty(
          values[f.id]
        )
    ).length;


  /* =========================================================
     FIELD HANDLERS
  ========================================================= */

  const handleChange = (
    id,
    value
  ) => {
    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    const field =
      fieldMap[id];

    const instant =
      field.type === "select" ||
      field.type === "radio" ||
      field.type === "multi";

    if (
      instant ||
      touched[id] ||
      errors[id]
    ) {
      setErrors((prev) => ({
        ...prev,

        [id]:
          validateField(
            field,
            value,
            files[id]
          ),
      }));
    }
  };


  const handleBlur = (id) => {
    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    setErrors((prev) => ({
      ...prev,

      [id]:
        validateField(
          fieldMap[id],
          values[id],
          files[id]
        ),
    }));
  };


  const handleFileSelect = (
    id,
    file
  ) => {
    const problem = file
      ? validateField(
          fieldMap[id],
          null,
          file
        )
      : "";

    setErrors((prev) => ({
      ...prev,
      [id]: problem,
    }));

    setFiles((prev) => {
      const next = {
        ...prev,
      };

      if (
        file &&
        !problem
      ) {
        next[id] = file;
      } else {
        delete next[id];
      }

      return next;
    });
  };


  /* =========================================================
     FOCUS INVALID FIELD
  ========================================================= */

  const focusField = (id) => {
    const el =
      formRef.current &&
      formRef.current.querySelector(
        `[data-pjct-field="${id}"]`
      );

    if (!el) return;

    const target =
      el.matches(
        "input, select, textarea"
      )
        ? el
        : el.querySelector(
            "input, select, textarea"
          );

    if (!target) return;

    target.scrollIntoView({
      behavior:
        prefersReducedMotion()
          ? "auto"
          : "smooth",

      block: "center",
    });

    target.focus({
      preventScroll: true,
    });
  };


  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit =
    async (event) => {
      if (
        event &&
        event.preventDefault
      ) {
        event.preventDefault();
      }

      if (
        submittingRef.current
      ) {
        return;
      }

      setSubmitError(null);
      setSummary("");


      /* =====================================================
         VALIDATE
      ===================================================== */

      const nextErrors = {};

      fields.forEach((f) => {
        const message =
          validateField(
            f,
            values[f.id],
            files[f.id]
          );

        if (message) {
          nextErrors[f.id] =
            message;
        }
      });

      setErrors(nextErrors);


      const keys =
        Object.keys(
          nextErrors
        );

      if (keys.length) {
        setSummary(
          keys.length === 1
            ? "Please fix the highlighted field to continue."
            : `Please fix the ${keys.length} highlighted fields to continue.`
        );

        focusField(keys[0]);

        return;
      }


      /* =====================================================
         START SUBMISSION
      ===================================================== */

      submittingRef.current = true;

      setSubmitting(true);


      try {
        const built =
          buildPayload({
            typeKey,
            sourcePage,
            fields,
            values,
            files,
            submissionId:
              submissionId.current,
          });


        await submitEnquiry({
          ...built,

          form:
            formRef.current,
        });


        /*
          Parent swaps this form for
          the existing success screen.
        */

        onSuccess();

      } catch (err) {
        if (
          mountedRef.current
        ) {
          setSubmitError(err);
        }

      } finally {
        submittingRef.current =
          false;

        if (
          mountedRef.current
        ) {
          setSubmitting(false);
        }
      }
    };


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="pjct-form">

      {/* =====================================================
          LEFT PANEL
      ===================================================== */}

      <aside
        className="pjct-form__panel"
        key={`panel-${typeKey}`}
        aria-label="About this enquiry type"
      >
        <span className="pjct-form__panel-icon">
          <ContactIcon
            name={type.icon}
            size="1.6em"
          />
        </span>

        <h3 className="pjct-form__panel-title">
          {type.label}
        </h3>

        <p className="pjct-form__panel-text">
          {type.panelText}
        </p>

        <details
          className="pjct-form__tips"
          open={tipsOpen}
        >
          <summary className="pjct-form__tips-summary">
            What helps us most
          </summary>

          <ul className="pjct-form__tips-list">
            {type.tips.map(
              (tip) => (
                <li
                  className="pjct-form__tips-item"
                  key={tip}
                >
                  <ContactIcon
                    name="check"
                    size="1.1em"
                    strokeWidth={2.4}
                  />

                  <span>
                    {tip}
                  </span>
                </li>
              )
            )}
          </ul>
        </details>

        <p className="pjct-form__assure">
          You don’t need to have everything
          figured out — share what you know.
        </p>
      </aside>


      {/* =====================================================
          RIGHT FORM
      ===================================================== */}

      <section
        className="pjct-form__card"
        id="pjct-form-card"
        aria-labelledby="pjct-form-heading"
      >
        <div
          className="pjct-form__content"
          key={typeKey}
        >

          <ContactContextIndicator
            type={type}
            arrived={arrived}
            sourceLabel={getSourceLabel(
              sourcePage
            )}
            onChange={onChangeType}
          />

          <h3
            className="pjct-form__title"
            id="pjct-form-heading"
          >
            {type.heading}
          </h3>

          <p className="pjct-form__support">
            {type.support}
          </p>

          {type.note && (
            <p className="pjct-form__note">
              {type.note}
            </p>
          )}


          <ContactFormProgress
            done={doneCount}
            total={
              requiredFields.length
            }
          />


          <form
            className="pjct-form__body"
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            aria-busy={submitting}
          >

            {/*
              Hidden EmailJS values.
              These do not change the UI.
            */}

            <input
              type="hidden"
              name="enquiry_type"
              value={
                getSourceLabel(
                  sourcePage
                ) ||
                type.label ||
                typeKey
              }
              readOnly
            />

            <input
              type="hidden"
              name="source_page"
              value={
                sourcePage || "website"
              }
              readOnly
            />

            <input
              type="hidden"
              name="submitted_at"
              value={new Date().toLocaleString(
                "en-IN"
              )}
              readOnly
            />

            <input
              type="hidden"
              name="submission_id"
              value={
                submissionId.current
              }
              readOnly
            />


            {type.sections.map(
              (section) => (
                <div
                  className="pjct-form__section"
                  key={section.title}
                >

                  <h4 className="pjct-form__section-title">
                    {section.title}
                  </h4>

                  <div className="pjct-form__grid">

                    {section.fields.map(
                      (field) => (
                        <ContactDynamicField
                          key={field.id}
                          field={field}
                          value={
                            values[field.id]
                          }
                          file={
                            files[field.id]
                          }
                          error={
                            errors[field.id]
                          }
                          maxFileMB={
                            CONTACT_CONFIG.maxFileMB
                          }
                          onChange={
                            handleChange
                          }
                          onBlur={
                            handleBlur
                          }
                          onFileSelect={
                            handleFileSelect
                          }
                        />
                      )
                    )}

                  </div>
                </div>
              )
            )}


            {/* =================================================
                SUBMIT ROW
            ================================================= */}

            <div className="pjct-form__submit-row">

              <div className="pjct-form__privacy">
                <span>
                  Your information will be used
                  only to respond to your enquiry.
                </span>

                {type.privacyExtra && (
                  <span>
                    {type.privacyExtra}
                  </span>
                )}
              </div>


              <ContactButton
                type="submit"
                size="lg"
                fluidMobile
                loading={submitting}
              >
                {submitting
                  ? "Sending…"
                  : "Send enquiry"}
              </ContactButton>


              {summary && (
                <div
                  className="pjct-form__summary"
                  role="alert"
                >
                  {summary}
                </div>
              )}


              {submitError && (
                <ContactError
                  error={submitError}
                  onRetry={handleSubmit}
                />
              )}

            </div>

          </form>

        </div>
      </section>

    </div>
  );
}