import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { firebase } from '../../firebase';
import './login.sass';

// firebase.auth().onAuthStateChanged(user => {
//  console.log(user);
// });

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmittung, setIsSubmitting] = useState(false);
  const [isSuccessfullSubmitting, setIsSuccessfullSubmit] = useState(null);

  const submitForm = e => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!isSubmittung) return;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsSubmitting(false);
        setIsSuccessfullSubmit(true);
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSuccessfullSubmit(false);
      });
  }, [isSubmittung]);

  return (
    <div className='container'>
      <div className='sign-in_wrapper'>
        <h1 className='sign-in_header'>Please Login</h1>
        <form onSubmit={submitForm}>
          <input
            type='email'
            className='form-control'
            placeholder='Enter your email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='password'
            className='form-control'
            placeholder='Enter the password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {isSuccessfullSubmitting === false && (
            <p className='text-danger text-center'>Wrong email or password</p>
          )}
          <button className='btn btn-warning'>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// const formItems = {
//   email: {
//     element: 'input',
//     value: '',
//     config: {
//       id: 'email',
//       name: 'email_input',
//       type: 'email',
//       placeholder: 'Enter your email'
//     },
//     validation: {
//       required: true,
//       email: true
//     },
//     isValid: false,
//     validationMessage: ''
//   },
//   password: {
//     element: 'input',
//     value: '',
//     config: {
//       id: 'password',
//       name: 'password_input',
//       type: 'password',
//       placeholder: 'Enter your password'
//     },
//     validation: {
//       required: true,
//       email: true
//     },
//     isValid: false,
//     validationMessage: ''
//   }
// };

// const [formError, setFormError] = useState(false);
// const [formSuccess, setFormSuccess] = useState(false);
// const [formData, setFormData] = useState(formItems);

// const updateForm = e => {
//   const elementId = e.target.id;
//   const newFormData = { ...formData };
//   const newElement = { ...newFormData[elementId] };
//   newElement.value = e.target.value;
//   const [isValid, validationMessage] = validate(newElement);
//   newElement.isValid = isValid;
//   newElement.validationMessage = validationMessage;
//   newFormData[elementId] = newElement;
//   setFormError(false);
//   setFormData(newFormData);
// };
