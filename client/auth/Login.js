import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import auth from './auth-helper';
import { signin } from './api-auth';
import AuthContext from './AuthContext';

const SignIn = () => {
  const { setSignIn } = useContext(AuthContext);

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
        setSignIn(true);
      }
    })
  }

  if (values.redirectToReferrer) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Sign In</h2>
      <div>
        <label>Email:</label>
        <input type="text" onChange={handleChange('email')} value={values.email} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" onChange={handleChange('password')} value={values.password} />
      </div>
      <div>
        <button onClick={clickSubmit}>Sign In</button>
      </div>
      {values.error && <p>{values.error}</p>}
    </div>
  );
};

export default SignIn;
