import React, { useState, useCallback } from "react";
import "./App.css";
import { NewItem } from "./new-item";
import { FilteredList } from "./filtered-list/filtered-list.final-hooks";

const App = function() {
  console.log("App render");
  const [items, setItems] = useState([]);

  const addItem = useCallback(item => {
    console.log("addItem");
    setItems(items => [
      ...items,
      { text: item, done: false, id: items.length }
    ]);
  }, []);

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
