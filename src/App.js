import React, { useState } from "react";
import "./App.css";

const classList = function(...args) {
  return args
    .reduce(function(acc, arg) {
      if (typeof arg === "string") {
        return [...acc, ...arg.split(" ")];
      }

      return [...acc, ...Object.keys(arg).filter(key => arg[key])];
    }, [])
    .join(" ");
};

const filterItems = function(filter, items) {
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

const App = function() {
  const [state, setState] = useState({
    newItem: "",
    filter: "All",
    items: []
  });

  const handleNewItemChange = function(e) {
    setState({ ...state, newItem: e.target.value });
  };

  const addItem = function() {
    setState({
      ...state,
      newItem: "",
      items: [
        ...state.items,
        { text: state.newItem, done: false, id: state.items.length }
      ]
    });
  };

  const handleNewItemKeyDown = function(e) {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const toggleStatus = function(id) {
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

  const handleFilterChange = function(e) {
    setState({ ...state, filter: e.target.value });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="new-item">
          <input
            className="add-input"
            onChange={handleNewItemChange}
            onKeyDown={handleNewItemKeyDown}
            value={state.newItem}
            placeholder="What to do?"
            autoFocus
          />
          <button className="add" onClick={addItem}>
            +
          </button>
        </div>
        <div className="filter">
          <label>
            <input
              type="radio"
              name="filter"
              value="All"
              onChange={handleFilterChange}
              checked={state.filter === "All"}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="Pending"
              onChange={handleFilterChange}
              checked={state.filter === "Pending"}
            />
            Pending
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="Done"
              onChange={handleFilterChange}
              checked={state.filter === "Done"}
            />
            Done
          </label>
        </div>
        <div className="list">
          {filterItems(state.filter, state.items).map(item => (
            <div
              onClick={() => toggleStatus(item.id)}
              className={classList("item", { done: item.done })}
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
