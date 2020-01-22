import React, { Component } from 'react';

import UserLayout from '../../UserPrivate/user';
import FileUpload from '../../utils/form/fileUpload';
import FormField from '../../utils/form/FormField';
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields
} from '../../utils/form/formActions';
import { connect } from 'react-redux';
import {
  getBrands,
  getWoods,
  addProduct,
  clearProduct
} from '../../../actions/product_actions';

class AddProduct extends Component {
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
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter Your Name'
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        validation: {
          required: true
        },
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter description'
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      price: {
        element: 'input',
        value: '',
        validation: {
          required: true
        },
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter the price'
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      brand: {
        element: 'select',
        value: '',
        validation: {
          required: true
        },
        config: {
          label: 'Product brand',
          name: 'brand_input',
          options: []
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        validation: {
          required: true
        },
        config: {
          label: 'Product shipping',
          name: 'shipping_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        validation: {
          required: true
        },
        config: {
          label: 'Available in stock',
          name: 'available_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      wood: {
        element: 'select',
        value: '',
        validation: {
          required: true
        },
        config: {
          label: 'Product Wood',
          name: 'wood_input',
          options: []
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      frets: {
        element: 'select',
        value: '',
        validation: {
          required: true
        },
        config: {
          label: 'Frets',
          name: 'frets_input',
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 }
          ]
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        validation: {
          required: true
        },
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            { key: true, value: 'public' },
            { key: false, value: 'hidden' }
          ]
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showLabel: true
      }
    }
  };

  updateFields = newFormData => {
    this.setState({
      formdata: newFormData
    });
  };

  componentDidMount() {
    const formdata = this.state.formdata;

    this.props.dispatch(getBrands()).then(res => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.brands,
        'brand'
      );
      this.updateFields(newFormData);
    });

    this.props.dispatch(getWoods()).then(res => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.woods,
        'wood'
      );
      this.updateFields(newFormData);
    });
  }

  updateForm = element => {
    const newformdata = update(element, this.state.formdata, 'products');
    this.setState({
      formError: false,
      formdata: newformdata
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'products');
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
    let dataToSubmit = generateData(this.state.formdata, 'products');
    let formIsValid = isFormValid(this.state.formdata, 'products');
    if (formIsValid) {
      // console.log(dataToSubmit);
      this.props.dispatch(addProduct(dataToSubmit)).then(res => {
        if (this.props.products.addProduct.success === true) {
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

  imagesHandler = images => {
    const newFormdata = { ...this.state.formdata };
    newFormdata.images.value = images;
    newFormdata.images.valid = true;
    this.setState({
      formdata: newFormdata
    });
    // console.log(this.state.formdata);
  };

  render() {
    return (
      <UserLayout>
        <div>
          Add Product
          <form onSubmit={e => this.submitForm(e)}>
            <FileUpload
              imagesHandler={images => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />

            <FormField
              id={'name'}
              formData={this.state.formdata.name}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={'description'}
              formData={this.state.formdata.description}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={'price'}
              formData={this.state.formdata.price}
              change={element => this.updateForm(element)}
            />
            <div className='form_devider'></div>
            <FormField
              id={'brand'}
              formData={this.state.formdata.brand}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={'shipping'}
              formData={this.state.formdata.shipping}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={'available'}
              formData={this.state.formdata.available}
              change={element => this.updateForm(element)}
            />
            <div className='form_devider'></div>
            <FormField
              id={'wood'}
              formData={this.state.formdata.wood}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={'frets'}
              formData={this.state.formdata.frets}
              change={element => this.updateForm(element)}
            />
            <div className='form_devider'></div>
            <FormField
              id={'publish'}
              formData={this.state.formdata.publish}
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
              Add product
            </button>
          </form>
        </div>
      </UserLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.product
  };
};
export default connect(mapStateToProps)(AddProduct);
