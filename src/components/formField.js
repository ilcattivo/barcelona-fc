import React from 'react';

const FormField = ({ formData, onChange }) => {
  let formTemplate = null;
  switch (formData.element) {
    case 'input':
      formTemplate = (
        <input
          {...formData.config}
          className='form-control'
          onChange={onChange}
        />
      );
      break;
    default:
      break;
  }
  return formTemplate;
};

export default FormField;
