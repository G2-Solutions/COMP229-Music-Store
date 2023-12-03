import React, { useState, useEffect } from 'react';
import { read, update } from './api-user.js';
import { Navigate, useParams } from 'react-router-dom';
import auth from '../auth/auth-helper.js';
import '../styles/form-styles.css';

const EditProfile = ({ match }) => {
  const { userId } = useParams();
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
    redirectToProfile: false,
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    update({ userId: userId }, { t: jwt.token }, user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, userId: data._id, redirectToProfile: true });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (values.redirectToProfile) {
    return <Navigate to={'/user/' + values.userId} />;
  }

  return (
    <div className="form-card">
      <h2>Edit Profile</h2>
      <div>
        <label>Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={values.name}
          className="form-input"
          onChange={handleChange('name')}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={values.email}
          className="form-input"
          onChange={handleChange('email')}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={values.password}
          className="form-input"
          onChange={handleChange('password')}
        />
      </div>
      {values.error && (
        <p style={{ color: 'red' }}>
          {values.error}
        </p>
      )}
      <button className="form-button" onClick={clickSubmit}>
        Submit
      </button>
    </div>
  );
};

export default EditProfile;
