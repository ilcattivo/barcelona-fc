import React, { useState } from 'react';
import HeadShake from 'react-reveal/HeadShake';
import { useForm } from 'react-hook-form';

import { firebasePromotions } from '../../firebase';

const Promotion = () => {
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const validateEmail = async email => {
    setIsLoading(true);

    const res = await firebasePromotions
      .orderByChild('email')
      .equalTo(email)
      .once('value');

    setIsLoading(false);
    if (res.val()) return false;
    else return true;
  };

  const onSubmit = async ({ email }) => {
    setIsLoading(true);
    await firebasePromotions.push({ email });
    setIsLoading(false);
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 2000);
  };

  return (
    <section className='promotion'>
      <div className='container'>
        <div className='promotion_bg'></div>
        <div className='promotion_wrapper'>
          <h2 className='promotion_header text-warning'>
            WIN 2 TICKETS TO COME TO THE ROUND OF 16 GAME AGAINST NAPOLI
          </h2>
          <p className='promotion_descr text-light'>
            Feel the Champions League magic at Camp Nou
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeadShake>
              <div className='text-light enroll_title'>Enter your email</div>
            </HeadShake>
            <div className='enroll_input mx-auto'>
              <input
                className='form-control'
                placeholder='example@mail.com'
                name='email'
                ref={register({
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                  validate: validateEmail
                })}
              />
              {errors.email && errors.email.type === 'required' && (
                <span className='text-danger'>This field is required</span>
              )}
              {errors.email && errors.email.type === 'pattern' && (
                <span className='text-danger'>Incorrect email</span>
              )}
              {errors.email && errors.email.type === 'validate' && (
                <span className='text-danger'>Email already exists</span>
              )}
              {formSuccess && (
                <span className='text-success'>
                  You have successfully subscribed
                </span>
              )}
              <button className='btn btn-warning' disabled={isLoading}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
