import React, { useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    newItem: 'what to do?',
    items: [
      { text: 'foo', done: false, id: 0 },
      { text: 'bar', done: true, id: 1 },
      { text: 'qux', done: false, id: 2 },
    ]
  });

  const handleChange = (e) => {
    setState({ ...state, newItem: e.target.value });
  };

  const handleClick = () => {
    setState({
      newItem: '',
      items: [...state.items, { text: state.newItem, done: false, id: state.items.length }]
    });
  };

  const toggleStatus = (id) => {
    setState({
      ...state,
      items: state.items.map(item => item.id === id ? { ...item, done: !item.done } : item)
    });
  };

  return (
    <div className="App">
      <input onChange={handleChange} value={state.newItem} />
      <button onClick={handleClick}>+</button>
      <div className="list">
        {state.items.map(item => (
          <div onClick={() => toggleStatus(item.id)} className={ item.done ? 'item done' : 'item' } key={item.id}>{item.text}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
