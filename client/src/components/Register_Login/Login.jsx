import React, { Component } from 'react';

import { connect } from 'react-redux';

import FormField from '../utils/form/FormField';

import { update, generateData, isFormValid } from '../utils/form/formActions';
import { loginUser } from '../../actions/user_actions';

import { withRouter } from 'react-router-dom'; // to use the this.props.history.push('')

class Login extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  updateForm = element => {
    const newformdata = update(element, this.state.formData, 'login');
    this.setState({
      formError: false,
      formData: newformdata
    });
  };

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'login');
    let formIsValid = isFormValid(this.state.formData, 'login');
    if (formIsValid) {
      this.props
        .dispatch(loginUser(dataToSubmit))
        .then(res => {
          if (res.payload.loginSuccess) {
            this.props.history.push('/user/dashboard');
          } else {
            this.setState({
              formError: true
            });
          }
        })
        .catch(e => {
          this.setState({
            formError: true
          });
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div className='signin_wrapper'>
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={element => this.updateForm(element)}
          />
          {this.state.formError ? (
            <div>
              <div className='error_label'>Please check your data</div>
            </div>
          ) : null}
          <button
            disabled={this.state.formError}
            onSubmit={e => e.submitForm()}
            // onClick={e => this.submitForm(e)} we can also use this
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => ({});
// const mapDispatchToProps = dispatch => {};
// export default connect(
//   null,
//   mapDispatchToProps
// )(Login);

export default withRouter(connect()(Login));
