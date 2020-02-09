import React, { useState } from "react";
import { onEnter } from "./lib/utils";

export const NewItem = function(props) {
  console.log("NewItem render");
  const [item, setItem] = useState("");

  const onItem = function() {
    if (!item.length) {
      return;
    }
    props.onItem(item);
    setItem("");
  };

  return (
    <div className="new-item">
      <input
        className="add-input"
        onChange={e => {
          setItem(e.target.value);
        }}
        onKeyDown={onEnter(onItem)}
        value={item}
        placeholder="What to do?"
        autoFocus
      />
      <button className="add" onClick={onItem}>
        +
      </button>
    </div>
  );
};
