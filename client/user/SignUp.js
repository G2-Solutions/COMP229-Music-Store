import React, { useState } from 'react';
import { create } from './api-user.js';
import { Link } from 'react-router-dom';
import '../styles/signupForm.css'; // Import the CSS file

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: '', open: true });
      }
    });
  };

  return (
    <div className="signupContainer">
      <h2>Sign Up</h2>
      <input
        id="name"
        type="text"
        placeholder="Name"
        value={values.name}
        onChange={handleChange('name')}
      />
      <br />
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange('email')}
      />
      <br />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange('password')}
      />
      <br />
      {values.error && <p>{values.error}</p>}
      <button onClick={clickSubmit}>Submit</button>
      {values.open && (
        <div className="successMessage">
          <div>New Account successfully created.</div>
          <div>
            <Link to="/signin">
              <button autoFocus>Sign In</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
