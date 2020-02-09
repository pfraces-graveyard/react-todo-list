import React, { memo } from "react";

export const RadioGroup = memo(function({ name, options, onChange, checked }) {
  return options.map(option => (
    <label key={option.value}>
      <input
        type="radio"
        name={name}
        value={option.value}
        onChange={onChange}
        checked={checked === option.value}
      />
      {option.label}
    </label>
  ));
});
