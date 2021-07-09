import React from 'react';
import Joi from 'joi-browser';

export class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  validate = data => {
    const {error} = Joi.validate(data, this.schema, {
      abortEarly: false,
    });
    if (!error) return {};

    const errors = {};
    error.details.forEach(item => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };

  handleSubmit = e => {
    const errors = this.validate();
    this.setState({errors});
    if (Object.keys(errors).length === 0) {
      this.submitForm();
    } else {
      console.log(errors);
    }
  };
}

export default Form;
