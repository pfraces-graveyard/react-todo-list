import React, { memo } from "react";

export const RadioGroup = memo(function(props) {
  return props.radios.map(radio => (
    <label key={radio.value}>
      <input
        type="radio"
        name={props.name}
        value={radio.value}
        onChange={props.onChange}
        checked={props.checked === radio.value}
      />
      {radio.label}
    </label>
  ));
});
