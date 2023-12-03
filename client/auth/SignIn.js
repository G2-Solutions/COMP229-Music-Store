import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import auth from './auth-helper';
import { signin } from './api-auth';
import AuthContext from './AuthContext';
import '../styles/form-styles.css';

const SignIn = () => {
  const { setSignIn, setAuthUser } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirectToReferrer: true })
        })
        setAuthUser(data.user._id);
        setSignIn(true);
      }
    })
  }

  if (values.redirectToReferrer) {
    return <Navigate to="/" />;
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Sign In</h2>
        <div>
          <label>Email: </label>
          <input type="text" placeholder="Email" className="form-input" onChange={handleChange('email')} value={values.email} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" placeholder="Password" className="form-input" onChange={handleChange('password')} value={values.password} />
        </div>
        <div>
          <button onClick={clickSubmit} className="form-button">Sign In</button>
        </div>
        {values.error && <p className="form-error">{values.error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
