import React, { Component } from 'react';
import UserLayout from '../../UserPrivate/user';
import { connect } from 'react-redux';
import FormField from '../../utils/form/FormField';
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from '../../utils/form/formActions';

import { updateSiteInfo } from '../../../actions/site_actions';

class ManageSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: 'input',
        value: '',
        validation: {
          required: true
        },
        config: {
          label: 'address',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter the site address'
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'working hours',
          name: 'hours_input',
          placeholder: 'Enter Site working hours',
          type: 'text'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      phone: {
        element: 'input',
        value: '',
        validation: {
          required: true
        },
        config: {
          label: ' phone number',
          name: 'phone_input',
          type: 'text',
          placeholder: 'Enter the site phone number'
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'email',
          name: 'email_input',
          placeholder: 'Enter Site Email',
          type: 'email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      }
    }
  };

  componentDidMount() {
    this.props.dispatch(updateSiteInfo()).then(() => {
      const newFormData = populateFields(
        this.state.formdata,
        this.props.site.siteInfo[0]
      );
      this.setState({
        formdata: newFormData
      });
    });
  }

  updateForm = element => {
    const newformdata = update(element, this.state.formdata, 'site_info');
    this.setState({
      formError: false,
      formdata: newformdata
    });
  };

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, 'site_info');
    let formIsValid = isFormValid(this.state.formdata, 'site_info');
    if (formIsValid) {
      console.log(dataToSubmit);
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    console.log(this.state.formdata, this.props.site.siteInfo);
    return (
      <UserLayout>
        <h1>Site Info</h1>
        <form onSubmit={e => this.onSubmit(e)}>
          <FormField
            id={'address'}
            formData={this.state.formdata.address}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'phone'}
            formData={this.state.formdata.phone}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'email'}
            formData={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'hours'}
            formData={this.state.formdata.hours}
            change={element => this.updateForm(element)}
          />
          <div>
            {this.state.formSuccess ? (
              <div className='form_success'>Success!</div>
            ) : null}
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
              Update site info
            </button>
          </div>
        </form>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site
  };
};

export default connect(mapStateToProps)(ManageSiteInfo);
