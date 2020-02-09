import React, { useState } from "react";
import { classList, onEnter } from "./lib/utils";
import { RadioGroup } from "./lib/form-components";
import "./App.css";

const appModel = {
  newItem: "",
  items: [],
  filter: "All",
  filters: [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Done", value: "Done" }
  ],
  getItems: function() {
    const { items, filter } = this;

    return items.filter(function(item) {
      if (filter === "Pending") {
        return !item.done;
      }

      if (filter === "Done") {
        return item.done;
      }

      return true;
    });
  }
};

const App = function() {
  const [state, setState] = useState(appModel);

  const updateNewItem = function(e) {
    setState({ ...state, newItem: e.target.value });
  };

  const addItem = function() {
    if (!state.newItem) {
      return;
    }

    setState({
      ...state,
      newItem: "",
      items: [
        ...state.items,
        { text: state.newItem, done: false, id: state.items.length }
      ]
    });
  };

  const updateFilter = function(e) {
    setState({ ...state, filter: e.target.value });
  };

  const itemStatusToggler = function(id) {
    return function() {
      setState({
        ...state,
        items: state.items.map(function(item) {
          if (item.id !== id) {
            return item;
          }

          return { ...item, done: !item.done };
        })
      });
    };
  };

  return (
    <div className="App">
      <div className="container">
        <div className="new-item">
          <input
            className="add-input"
            onChange={updateNewItem}
            onKeyDown={onEnter(addItem)}
            value={state.newItem}
            placeholder="What to do?"
            autoFocus
          />
          <button className="add" onClick={addItem}>
            +
          </button>
        </div>
        <div className="filter">
          <RadioGroup
            name="filter"
            radios={state.filters}
            onChange={updateFilter}
            checked={state.filter}
          />
        </div>
        <div className="list">
          {state.getItems().map(item => (
            <div
              onClick={itemStatusToggler(item.id)}
              className={classList({ done: item.done }, "item")}
              key={item.id}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
