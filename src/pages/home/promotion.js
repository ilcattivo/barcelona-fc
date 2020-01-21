import React, { useState, useEffect } from 'react';
import HeadShake from 'react-reveal/HeadShake';

import { firebasePromotions } from '../../firebase';
// import { validate } from '../../components/misc';
// import FormField from '../../components/formField';

const Promotion = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = e => {
    e.preventDefault();
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    firebasePromotions
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() === null) {
          firebasePromotions.push({ email });
          setIsLoading(false);
          console.log('Congratulations');
        } else {
          setIsLoading(false);
          console.log('Email already exists');
        }
      });
  }, [isLoading, email]);

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
          <form onSubmit={submitForm}>
            <HeadShake>
              <div className='text-light enroll_title'>Enter your email</div>
            </HeadShake>
            <div className='enroll_input mx-auto'>
              <input
                type='email'
                className='form-control'
                placeholder='example@mail.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
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

// const submitForm = e => {
//   e.preventDefault();
//   let dataToSubmit = {};
//   let formIsValid = true;

//   for (let key in formData) {
//     dataToSubmit[key] = formData[key].value;
//     formIsValid = formData[key].isValid && formIsValid;
//   }

//   if (formIsValid) {
//     // send form
//   } else {
//     setFormError(true);
//   }
// };
