import React, { memo } from "react";
import { RadioGroup } from "../lib/form-components";

export const Filter = memo(function(props) {
  console.log("Filter render");
  return (
    <div className="filter">
      <RadioGroup
        name="filter"
        options={props.options}
        checked={props.checked}
        onChange={props.onChange}
      />
    </div>
  );
});
