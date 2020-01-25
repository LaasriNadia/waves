import React, { Component } from 'react';
import UserLayout from '../UserPrivate/user';
import FormField from '../utils/form/FormField';
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from '../utils/form/formActions';
import { updateProfile, clearUpdateProfile } from '../../actions/user_actions';
import { connect } from 'react-redux';
class Info extends Component {
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
      }
    }
  };

  componentDidMount() {
    const newFormData = populateFields(
      this.state.formdata,
      this.props.user.userData
    );
    this.setState({
      formdata: newFormData
    });
    console.log(this.state.formdata);
  }

  updateForm = element => {
    const newformdata = update(element, this.state.formdata, 'updateInfo');
    this.setState({
      formError: false,
      formdata: newformdata
    });
    // console.log(this.state.formdata);
  };

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, 'updateInfo');
    let formIsValid = isFormValid(this.state.formdata, 'updateInfo');
    if (formIsValid) {
      console.log(dataToSubmit);
      this.props.dispatch(updateProfile(dataToSubmit)).then(res => {
        console.log(res);
        if (this.props.user.updateProfile.success) {
          this.setState(
            {
              formSuccess: true
            },
            () => {
              setTimeout(() => {
                this.props.dispatch(clearUpdateProfile());
                this.setState({
                  formSuccess: false
                });
              }, 2000);
            }
          );
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <UserLayout>
        <h1>updating infos</h1>
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

          {this.state.formSuccess ? (
            <div className='form_success'>Success!!</div>
          ) : null}
          {this.state.formError ? (
            <div>
              <div className='error_label'>Please check your data</div>
            </div>
          ) : null}
          <button
            disabled={this.state.formError}
            onClick={e => this.submitForm(e)}
          >
            Update infos
          </button>
        </form>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Info);
