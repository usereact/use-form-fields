import React from 'react';
import useFormFields from '@usereact/form-fields'

import logo from './logo.svg';
import './App.css';

const initialValues = {
  name: '',
  email: '',
  message: '',
}

function App() {
  const { values, fields } = useFormFields(initialValues)

  const handleSubmit = e => {
    e.preventDefault();
    console.log('values: ', values)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h3>Contact</h3>
        <form className="Form-layout" onSubmit={handleSubmit}>
          <label>Name: </label>
          <input type="text" {...fields.name} />
          <label>Email: </label>
          <input type="email" {...fields.email} />
          <label>Message: </label>
          <textarea {...fields.message} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
