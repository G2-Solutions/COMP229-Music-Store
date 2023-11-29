import React, { useState } from 'react';
import { create } from './api-user.js';
import { Link } from 'react-router-dom';

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
    <div>
      <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center', marginTop: '20px', paddingBottom: '10px' }}>
        <h6>Sign Up</h6>
        <input
          id="name"
          type="text"
          placeholder="Name"
          style={{ marginLeft: '5px', marginRight: '5px', width: '300px' }}
          value={values.name}
          onChange={handleChange('name')}
        />
        <br />
        <input
          id="email"
          type="email"
          placeholder="Email"
          style={{ marginLeft: '5px', marginRight: '5px', width: '300px' }}
          value={values.email}
          onChange={handleChange('email')}
        />
        <br />
        <input
          id="password"
          type="password"
          placeholder="Password"
          style={{ marginLeft: '5px', marginRight: '5px', width: '300px' }}
          value={values.password}
          onChange={handleChange('password')}
        />
        <br />
        {values.error && <p style={{ color: 'red' }}>{values.error}</p>}
        <button onClick={clickSubmit} style={{ margin: 'auto', marginBottom: '10px' }}>
          Submit
        </button>
      </div>
      {values.open && (
        <div>
          <div>New Account successfully created.</div>
          <div>
            <Link to="/login">
              <button autoFocus style={{ color: 'white', backgroundColor: 'blue' }}>
                Continue to sign in
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
