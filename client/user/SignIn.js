import React, { useState } from 'react';
import { signin } from './api-user';
import { useNavigate } from 'react-router-dom';
import '../styles/signInForm.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      email: values.email,
      password: values.password,
    };

    signin(user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: '' });
        // Redirect to home page after successful sign-in
        navigate('/');
      }
    });
  };

  return (
    <div className="signInFormContainer">
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
