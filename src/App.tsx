import { Checkbox,Icon } from 'antd';
import * as React from 'react';
import { TestComponent } from 'src/components/TestComponent';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React 1</h1>
        </header>
          <TestComponent name="dan" framework="lili" />
        <p className="App-intro">
          <Checkbox>Checkbox</Checkbox>
            <Icon type="step-forward" />

          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
