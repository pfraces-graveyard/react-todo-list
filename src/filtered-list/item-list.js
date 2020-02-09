import React from "react";
import { classList } from "../lib/utils";

export const ItemList = function(props) {
  console.log("ItemList render");
  return (
    <div className="list">
      {props.items.map(item => (
        <div
          onClick={() => {
            props.onClick(item.id);
          }}
          className={classList({ done: item.done }, "item")}
          key={item.id}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};
