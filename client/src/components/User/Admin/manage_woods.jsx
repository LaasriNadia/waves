import React, { Component } from 'react';

import FormField from '../../utils/form/FormField';
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/form/formActions';
import { connect } from 'react-redux';
import {
  getWoods,
  clearProduct,
  addWood
} from '../../../actions/product_actions';

class ManageWoods extends Component {
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
          placeholder: 'Enter the Wood'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  componentDidMount() {
    this.props.dispatch(getWoods());
  }

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'woods');
    this.setState({
      formSuccess: true,
      formdata: newFormData
    });
    setTimeout(() => {
      this.setState({
        formSuccess: false
      });
    }, 3000);
    this.props.dispatch(clearProduct());
  };

  submitForm = e => {
    e.preventDefault();
    // console.log('object');
    let dataToSubmit = generateData(this.state.formdata, 'woods');
    let formIsValid = isFormValid(this.state.formdata, 'woods');
    let existingWoods = this.props.products.woods;
    if (formIsValid) {
      this.props.dispatch(addWood(dataToSubmit, existingWoods)).then(res => {
        if (this.props.products.addWood.success === true) {
          //   this.props.dispatch(getBrands());
          this.resetFieldHandler();
        } else {
          this.setState({
            formSuccess: false
          });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };
  updateForm = element => {
    const newformdata = update(element, this.state.formdata, 'woods');
    this.setState({
      formError: false,
      formdata: newformdata
    });
  };

  updateFields = newFormData => {
    this.setState({
      formdata: newFormData
    });
  };

  showCategoryItems = () =>
    this.props.products.woods
      ? this.props.products.woods.map(brand => (
          <div key={brand._id} className='category_item'>
            {brand.name}
          </div>
        ))
      : null;

  render() {
    return (
      <div className='admin_category_wrapper'>
        <h1>Woods</h1>
        <div className='admin_two_column'>
          <div className='left'>
            <div className='brands_container'>{this.showCategoryItems()}</div>
          </div>
          <div className='right'>
            <form onSubmit={e => this.submitForm(e)}>
              <FormField
                id={'name'}
                formData={this.state.formdata.name}
                change={element => this.updateForm(element)}
              />
              {this.state.formSuccess ? (
                <div className='form_success'>Success..</div>
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
                Add Wood
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product
  };
};

export default connect(mapStateToProps)(ManageWoods);
