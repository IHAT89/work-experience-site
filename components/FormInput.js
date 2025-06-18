const FormInput = ({ label, id, error, ...props }) => {
  const hasError = !!error;

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '0.5rem' }}>
        {label}
        {props.required && <span aria-hidden="true" style={{ color: 'red' }}>*</span>}
        {props.required && <span className="sr-only">(required)</span>}
      </label>
      <input
        id={id}
        aria-invalid={hasError}
        className={hasError ? 'form-input form-input-error' : 'form-input'}
        {...props}
      />
      {/* This is the crucial part that displays the error message */}
      {hasError && (
        <span role="alert" style={{ color: 'red', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;