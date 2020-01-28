import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { firebase } from '../../firebase';
import './login.sass';

const Login = () => {
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setFormError(true);
    }
  };

  return (
    <div className='container'>
      <div className='sign-in_wrapper'>
        <h1 className='sign-in_header'>Please Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='form-control'
            placeholder='Enter your email'
            name='email'
            ref={register({
              required: true,
              pattern: /\S+@\S+\.\S+/
            })}
          />
          <input
            type='password'
            className='form-control'
            placeholder='Enter the password'
            name='password'
            ref={register({ required: true })}
          />
          {errors.email && errors.email.type === 'required' && (
            <p className='text-danger text-center'>Email is required</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className='text-danger text-center'>Invalid email</p>
          )}
          {errors.password && (
            <p className='text-danger text-center'>Password is required</p>
          )}
          {formError && (
            <p className='text-danger text-center'>Wrong email or password</p>
          )}
          <button className='btn btn-warning' disabled={isLoading}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
