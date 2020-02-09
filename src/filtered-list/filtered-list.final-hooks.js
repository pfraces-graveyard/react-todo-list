import React, { useState, useCallback } from "react";
import { Filter } from "./filter";
import { ItemList } from "./item-list";

export const FilteredList = function(props) {
  console.log("FilteredList render");
  const [state, setState] = useState({
    filter: "All",
    filters: [
      { label: "All", value: "All" },
      { label: "Pending", value: "Pending" },
      { label: "Done", value: "Done" }
    ]
  });

  const updateFilter = useCallback(e => {
    console.log("updateFilter");
    setState(state => ({ ...state, filter: e.target.value }));
  }, []);

  const getItems = function() {
    return props.items.filter(function(item) {
      if (state.filter === "Pending") {
        return !item.done;
      }

      if (state.filter === "Done") {
        return item.done;
      }

      return true;
    });
  };

  return (
    <>
      <Filter
        options={state.filters}
        checked={state.filter}
        onChange={updateFilter}
      />
      <ItemList items={getItems()} onClick={props.toggleItemStatus} />
    </>
  );
};
