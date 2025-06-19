import React from 'react';

export default function FormInput({
  label,
  id,
  name,
  type = "text",
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
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        className="form-input"
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
    </div>
  );
}