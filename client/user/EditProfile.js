import React, { useState, useEffect } from 'react';
import { read, update } from './api-user.js';
import { Navigate } from 'react-router-dom';

const styles = {
  card: {
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'center',
    marginTop: '40px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
  title: {
    margin: '16px',
    color: '#333',
  },
  textField: {
    marginLeft: '8px',
    marginRight: '8px',
    width: '300px',
  },
  submit: {
    margin: '16px',
    marginBottom: '16px',
  },
  error: {
    verticalAlign: 'middle',
    color: 'red',
  },
};

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
    return <Redirect to={'/user/' + values.userId} />;
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Edit Profile</h2>
      <input
        id="name"
        type="text"
        placeholder="Name"
        style={styles.textField}
        value={values.name}
        onChange={handleChange('name')}
      />
      <br />
      <input
        id="email"
        type="email"
        placeholder="Email"
        style={styles.textField}
        value={values.email}
        onChange={handleChange('email')}
      />
      <br />
      <input
        id="password"
        type="password"
        placeholder="Password"
        style={styles.textField}
        value={values.password}
        onChange={handleChange('password')}
      />
      <br />
      {values.error && (
        <p style={styles.error}>
          {values.error}
        </p>
      )}
      <button onClick={clickSubmit} style={styles.submit}>
        Submit
      </button>
    </div>
  );
};

export default EditProfile;
