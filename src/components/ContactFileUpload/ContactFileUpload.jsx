import React, { useRef, useState } from "react";
import ContactIcon from "../ContactIcon/ContactIcon";
import ContactFieldError from "../ContactFieldError/ContactFieldError";
import "./ContactFileUpload.css";

/* "230 KB" / "1.4 MB" — also used by ContactSmartForm for its error messages */
export const formatFileSize = (bytes) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/* Optional attachment / resume.
   The file is only kept in memory here — it is NOT uploaded until the form is submitted. */
export default function ContactFileUpload({ field, file, error, maxMB, onSelect }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const id = `pjct-f-${field.id}`;
  const hintId = `${id}-hint`;
  const errId = `${id}-err`;

  const pick = (picked) => onSelect(field.id, picked || null);

  const handleInput = (e) => {
    pick(e.target.files && e.target.files[0]);
    e.target.value = ""; // lets the same file be chosen again after removing it
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) pick(e.dataTransfer.files[0]);
  };

  return (
    <div className={`pjct-upload${error ? " pjct-upload--invalid" : ""}`}>
      <span className="pjct-upload__label" id={`${id}-label`}>{field.label}</span>

      <div
        className={`pjct-upload__zone${dragging ? " pjct-upload__zone--drag" : ""}`}
        onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          className="pjct-upload__input"
          id={id}
          type="file"
          accept={field.accept}
          data-pjct-field={field.id}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${hintId}${error ? ` ${errId}` : ""}`}
          onChange={handleInput}
        />
        <label className="pjct-upload__button" htmlFor={id}>
          <ContactIcon name="upload" />
          Choose file
        </label>
        <span className="pjct-upload__text">or drag and drop it here</span>
      </div>

      <p className="pjct-upload__hint" id={hintId}>
        {field.fmt} · up to {maxMB} MB. Nothing is uploaded until you send the enquiry.
      </p>

      {file && (
        <div className="pjct-upload__file">
          <ContactIcon name="file" />
          <span className="pjct-upload__file-name">{file.name}</span>
          <span className="pjct-upload__file-size">{formatFileSize(file.size)}</span>
          <button type="button" className="pjct-upload__remove" onClick={() => pick(null)} aria-label={`Remove ${file.name}`}>
            <ContactIcon name="x" size="1em" strokeWidth={2.2} />
            Remove
          </button>
        </div>
      )}

      <ContactFieldError id={errId} message={error} />
    </div>
  );
}
