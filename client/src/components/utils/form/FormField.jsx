import React from 'react';

const FormField = ({ formData, change, id }) => {
  const showError = () => {
    let errorMessage = null;

    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className='error_label'> {formData.validationMessage}</div>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = '';
    // console.log(formData);
    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div className='formBlock'>
            {formData.showLabel ? (
              <div className='label_inputs'>{formData.config.label}</div>
            ) : null}
            <input
              {...formData.config}
              value={formData.value}
              onBlur={event => {
                change({ event, id, blur: true });
              }}
              onChange={event => {
                change({ event, id });
              }}
            />
            {showError()}
          </div>
        );
        break;

      case 'textarea':
        formTemplate = (
          <div className='formBlock'>
            {formData.showLabel ? (
              <div className='label_inputs'>{formData.config.label}</div>
            ) : null}
            <textarea
              {...formData.config}
              value={formData.value}
              onBlur={event => {
                change({ event, id, blur: true });
              }}
              onChange={event => {
                change({ event, id });
              }}
            />
            {showError()}
          </div>
        );
        break;
      case 'select':
        formTemplate = (
          <div className='formBlock'>
            {formData.showLabel ? (
              <div className='label_inputs'>{formData.config.label}</div>
            ) : null}
            <select
              value={formData.value}
              onBlur={event => {
                change({ event, id, blur: true });
              }}
              onChange={event => {
                change({ event, id });
              }}
            >
              <option value=''>Select one</option>
              {formData.config.options.map(option => (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;

      default:
        formTemplate = '';
    }
    return formTemplate;
  };

  return <div> {renderTemplate()} </div>;
};

export default FormField;
