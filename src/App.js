import React, { useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    newItem: 'what to do?',
    items: [
      { text: 'foo', done: false },
      { text: 'bar', done: false },
      { text: 'qux', done: false },
    ]
  });

  const handleChange = (e) => {
    setState({ ...state, newItem: e.target.value });
  };

  const handleClick = () => {
    setState({
      newItem: '',
      items: [...state.items, { text: state.newItem, done: false }]
    });
  };

  return (
    <div className="App">
      <input onChange={handleChange} value={state.newItem} />
      <button onClick={handleClick}>+</button>
      <div className="list">
        {state.items.map(item => (
          <div className="item">{item.text}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
