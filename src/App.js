import React from 'react';
import './App.css';
import { Fetch } from './Fetch';

function App() {
  const [state, setState] = React.useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          The goal here is to test X-State with fetch and see how we can handle complex scenarios
        </p>
        <button onClick={() => setState(!state)}>Toggle</button>
        {state && <Fetch url="https://cat-fact.herokuapp.com" />}
      </header>
    </div>
  );
}

export default App;
