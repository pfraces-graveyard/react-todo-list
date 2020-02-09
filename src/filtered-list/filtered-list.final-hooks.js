/**
 * Inspiration from
 * <https://medium.com/@sdolidze/react-hooks-memoization-99a9a91c8853>
 */

import React, { useState, useCallback } from "react";
import { Filter } from "./filter";
import { ItemList } from "./item-list";

const getItems = function(items, filter) {
  return items.filter(function(item) {
    if (filter === "Pending") {
      return !item.done;
    }

    if (filter === "Done") {
      return item.done;
    }

    return true;
  });
};

const initialState = {
  filter: "All",
  filters: [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Done", value: "Done" }
  ]
};

export const FilteredList = function(props) {
  console.log("FilteredList render");
  const [state, setState] = useState(initialState);

  const updateFilter = useCallback(e => {
    console.log("updateFilter");
    setState(state => ({ ...state, filter: e.target.value }));
  }, []);

  return (
    <>
      <Filter
        options={state.filters}
        checked={state.filter}
        onChange={updateFilter}
      />
      <ItemList
        items={getItems(props.items, state.filter)}
        onClick={props.toggleItemStatus}
      />
    </>
  );
};
