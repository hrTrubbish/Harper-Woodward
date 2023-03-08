import React from 'react';

export default function FormInput({
  labelText,
  name,
  type,
  placeholder,
  onChange,
  value,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        min={type === 'number' ? '0' : undefined}
        onChange={onChange}
      />
    </div>
  );
}
