import React, { useReducer, useCallback } from "react";
import { Filter } from "./filter";
import { ItemList } from "./item-list";

const identity = x => x;

const initialState = {
  filter: "All",
  filters: [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Done", value: "Done" }
  ]
};

const reducer = function(state, filter) {
  console.log("filterReducer");
  return { ...state, filter: filter };
};

const inputChangeDispatcher = function(dispatch, transform = identity) {
  const secret = Math.random();

  return function(e) {
    console.log("secret", secret);
    dispatch(transform(e.target.value));
  };
};

const filterItems = function(items, filter) {
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

export const FilteredList = function(props) {
  console.log("FilteredList render");
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateFilter = useCallback(inputChangeDispatcher(dispatch), []);

  return (
    <>
      <Filter
        options={state.filters}
        checked={state.filter}
        onChange={updateFilter}
      />
      <ItemList
        items={filterItems(props.items, state.filter)}
        onClick={props.toggleItemStatus}
      />
    </>
  );
};
