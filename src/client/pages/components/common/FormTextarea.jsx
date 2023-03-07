import React from 'react';

export default function FormTextarea({
  labelText, name, value, placeholder, onChange, maxLength = '1000', minLength = '0',
}) {
  return (
    <div>
      <label htmlFor={name}>
        {labelText}
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          rows="5"
          cols="62"
          required
        />
      </label>
    </div>
  );
}
