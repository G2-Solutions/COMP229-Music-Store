import React, { useState } from 'react';
import { create } from './api-user.js';
import { Link } from 'react-router-dom';
import '../styles/form-styles.css';

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
    <div className="form-container">
      <div className="form-card">
        <h2>Sign Up</h2>
        <div>
          <label>Name: </label>
          <input id="name" type="text" placeholder="Name" className="form-input" value={values.name} onChange={handleChange('name')} />
        </div>
        <div>
          <label>Email: </label>
          <input id="email" type="email" placeholder="Email" className="form-input" value={values.email} onChange={handleChange('email')} />
        </div>
        <div>
          <label>Password: </label>
          <input id="password" type="password" placeholder="Password" className="form-input" value={values.password} onChange={handleChange('password')} />
        </div>
        <button onClick={clickSubmit} className="form-button">Submit</button>
        {values.error && <p className="form-error">{values.error}</p>}
      </div>
      {
        values.open && (
          <div>
            <div>New account successfully created.</div>
            <div>
              <Link to="/login">
                <button>
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )
      }
    </div >
  );
}
