import React, { Component } from 'react';

import { connect } from 'react-redux';
import FormField from '../utils/form/FormField';

import { update, generateData, isFormValid } from '../utils/form/formActions';
import { registerUser } from '../../actions/user_actions';

import Dialog from '@material-ui/core/Dialog';

class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        validation: {
          required: true
        },
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter Your Name'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        validation: {
          required: true
        },
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter Your Last Name'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          placeholder: 'Enter Your Email',
          type: 'email'
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
        validationMessage: '',
        touched: false
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm your password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        validationMessage: '',
        touched: false
      }
    }
  };
  updateForm = element => {
    const newformdata = update(element, this.state.formdata, 'register');
    this.setState({
      formError: false,
      formdata: newformdata
    });
  };

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, 'register');
    console.log(dataToSubmit);
    let formIsValid = isFormValid(this.state.formdata, 'register');
    if (formIsValid) {
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then(res => {
          if (res.payload.success) {
            this.setState({
              formError: false,
              formSuccess: true
            });
            setTimeout(() => {
              this.props.history.push('/register_login');
            }, 3000);
          } else {
            this.setState({
              formError: true
            });
          }
        })
        .catch(e => {
          console.log(e);
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
    // console.log(this.state);
    return (
      <div className='page_wrapper'>
        <div className='container'>
          <div className='register_login_container'>
            <div className='left'>
              <form onSubmit={e => this.onSubmit(e)}>
                <h2>Personal Information</h2>
                <div className='form_block_two'>
                  <div className='block'>
                    <FormField
                      id={'name'}
                      formData={this.state.formdata.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='block'>
                    <FormField
                      id={'lastname'}
                      formData={this.state.formdata.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    id={'email'}
                    formData={this.state.formdata.email}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <h2>Verify Password</h2>
                <div className='form_block_two'>
                  <div className='block'>
                    <FormField
                      id={'password'}
                      formData={this.state.formdata.password}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='block'>
                    <FormField
                      id={'confirmPassword'}
                      formData={this.state.formdata.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                {this.state.formError ? (
                  <div>
                    <div className='error_label'>Please check your data</div>
                  </div>
                ) : null}
                <button
                  disabled={this.state.formError}
                  // onSubmit={e => e.submitForm()}
                  onClick={e => this.submitForm(e)}
                >
                  Create an account
                </button>
              </form>
            </div>
          </div>
        </div>
        <Dialog open={this.state.formSuccess}>
          <div className='dialog_alert'>
            <div>Congratulations</div>
            <div>
              You will be redirected to the LOGIN in a couple of seconds...
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
