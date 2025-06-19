import React from 'react';

export default function FormTextarea({
  label,
  id,
  name,
  required = false,
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <div>
      <label htmlFor={id}>
        {label} <span aria-hidden="true" style={{ color: 'red' }}>*</span>
        <span className="sr-only">(required)</span>
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        className="form-textarea"
        aria-label={label}
        aria-required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} style={{ color: 'red' }} role="alert">{error}</span>
      )}

      {error && <span className="error">{error}</span>}
    </div>
  );
}