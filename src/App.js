import React, { useState } from "react";
import "./App.css";

const filterItems = function (filter, items) {
  return items.filter(function (item) {
    if (filter === "Pending") {
      return !item.done;
    }

    if (filter === "Done") {
      return item.done;
    }

    return true;
  });
};

const App = function () {
  const [state, setState] = useState({
    newItem: "",
    filter: "All",
    items: []
  });

  const handleNewItemChange = function (e) {
    setState({ ...state, newItem: e.target.value });
  };

  const addItem = function () {
    setState({
      ...state,
      newItem: "",
      items: [
        ...state.items,
        { text: state.newItem, done: false, id: state.items.length }
      ]
    });
  };

  const toggleStatus = function (id) {
    setState({
      ...state,
      items: state.items.map(function (item) {
        if (item.id !== id) {
          return item;
        }

        return { ...item, done: !item.done };
      })
    });
  };

  const handleFilterChange = function (filter) {
    setState({ ...state, filter: filter });
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="new-item">
          <input
            className="add-input"
            onChange={handleNewItemChange}
            onKeyDown={handleKeyDown}
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
              onChange={() => handleFilterChange("All")}
              checked={state.filter === "All"}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              onChange={() => handleFilterChange("Pending")}
              checked={state.filter === "Pending"}
            />
            Pending
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              onChange={() => handleFilterChange("Done")}
              checked={state.filter === "Done"}
            />
            Done
          </label>
        </div>
        <div className="list">
          {filterItems(state.filter, state.items).map(item => (
            <div
              onClick={() => toggleStatus(item.id)}
              className={item.done ? "item done" : "item"}
              key={item.id}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
