import React, { useState } from "react";
import { classList, onEnter } from "./lib/utils";
import { RadioGroup } from "./lib/form-components";
import "./App.css";

const NewItem = function(props) {
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

const Filter = function(props) {
  console.log("Filter render");
  return (
    <div className="filter">
      <RadioGroup
        name="filter"
        radios={props.filters}
        checked={props.checked}
        onChange={props.onChange}
      />
    </div>
  );
};

const ItemList = function(props) {
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

const FilteredList = function(props) {
  console.log("FilteredList render");
  const [state, setState] = useState({
    filter: "All",
    filters: [
      { label: "All", value: "All" },
      { label: "Pending", value: "Pending" },
      { label: "Done", value: "Done" }
    ]
  });

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

  const updateFilter = function(e) {
    console.log("updateFilter");
    setState({ ...state, filter: e.target.value });
  };

  return (
    <>
      <Filter
        filters={state.filters}
        checked={state.filter}
        onChange={updateFilter}
      />
      <ItemList items={getItems()} onClick={props.toggleItemStatus} />
    </>
  );
};

const App = function() {
  console.log("App render");
  const [items, setItems] = useState([]);

  const addItem = function(item) {
    console.log("addItem");
    setItems([...items, { text: item, done: false, id: items.length }]);
  };

  const toggleItemStatus = function(id) {
    console.log("toggleItemStatus");
    setItems(
      items.map(function(item) {
        if (item.id !== id) {
          return item;
        }

        return { ...item, done: !item.done };
      })
    );
  };

  return (
    <div className="App">
      <div className="container">
        <NewItem onItem={addItem} />
        <FilteredList items={items} toggleItemStatus={toggleItemStatus} />
      </div>
    </div>
  );
};

export default App;
