import React, { useRef, useState } from "react";
import ContactIcon from "../ContactIcon/ContactIcon";
import ContactFieldError from "../ContactFieldError/ContactFieldError";
import "./ContactFileUpload.css";

/* =========================================================
   FILE SIZE FORMATTER
========================================================= */

export const formatFileSize = (bytes) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;


/* =========================================================
   CONTACT FILE UPLOAD
========================================================= */

export default function ContactFileUpload({
  field,
  file,
  error,
  maxMB,
  onSelect,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const id = `pjct-f-${field.id}`;
  const hintId = `${id}-hint`;
  const errId = `${id}-err`;

  /* =======================================================
     SELECT FILE
  ======================================================= */

  const pick = (picked) => {
    onSelect(field.id, picked || null);
  };


  /* =======================================================
     NORMAL FILE SELECTION
  ======================================================= */

  const handleInput = (e) => {
    pick(e.target.files && e.target.files[0]);

    /*
      Reset the input so the same file can be selected again
      after removing it.
    */
    e.target.value = "";
  };


  /* =======================================================
     DRAG & DROP
  ======================================================= */

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0]
    ) {
      pick(e.dataTransfer.files[0]);
    }
  };


  return (
    <div
      className={`pjct-upload${
        error ? " pjct-upload--invalid" : ""
      }`}
    >

      {/* ===================================================
          LABEL
      =================================================== */}

      <span
        className="pjct-upload__label"
        id={`${id}-label`}
      >
        {field.label}
      </span>


      {/* ===================================================
          UPLOAD ZONE
      =================================================== */}

      <div
        className={`pjct-upload__zone${
          dragging
            ? " pjct-upload__zone--drag"
            : ""
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >

        <input
          ref={inputRef}
          className="pjct-upload__input"
          id={id}

          /*
            IMPORTANT:
            EmailJS sendForm() uses the input name
            to identify the uploaded file.
          */
          name={field.id}

          type="file"
          accept={field.accept}
          data-pjct-field={field.id}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${hintId}${
            error ? ` ${errId}` : ""
          }`}
          onChange={handleInput}
        />

        <label
          className="pjct-upload__button"
          htmlFor={id}
        >
          <ContactIcon name="upload" />
          Choose file
        </label>

        <span className="pjct-upload__text">
          or drag and drop it here
        </span>
      </div>


      {/* ===================================================
          FILE HINT
      =================================================== */}

      <p
        className="pjct-upload__hint"
        id={hintId}
      >
        {field.fmt} · up to {maxMB} MB. Nothing is uploaded
        until you send the enquiry.
      </p>


      {/* ===================================================
          SELECTED FILE
      =================================================== */}

      {file && (
        <div className="pjct-upload__file">

          <ContactIcon name="file" />

          <span className="pjct-upload__file-name">
            {file.name}
          </span>

          <span className="pjct-upload__file-size">
            {formatFileSize(file.size)}
          </span>

          <button
            type="button"
            className="pjct-upload__remove"
            onClick={() => pick(null)}
            aria-label={`Remove ${file.name}`}
          >
            <ContactIcon
              name="x"
              size="1em"
              strokeWidth={2.2}
            />

            Remove
          </button>

        </div>
      )}


      {/* ===================================================
          ERROR
      =================================================== */}

      <ContactFieldError
        id={errId}
        message={error}
      />

    </div>
  );
}