import React, { useState, useEffect } from 'react';
import { read, update } from './api-user.js';
import { Navigate } from 'react-router-dom';
import auth from '../auth/auth-helper.js';

const EditProfile = ({ match }) => {
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

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    update({ userId: match.params.userId }, { t: jwt.token }, user).then((data) => {
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
    <div>
      <h2>Edit Profile</h2>
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
      {values.error && (
        <p style={{ color: 'red' }}>
          {values.error}
        </p>
      )}
      <button onClick={clickSubmit}>
        Submit
      </button>
    </div>
  );
};

export default EditProfile;
