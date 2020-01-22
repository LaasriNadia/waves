import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/user_actions';

import {
  getProductsById,
  clearProductDetail
} from '../../actions/product_actions';

import ProdNfo from './prodNfo';
import ProdImage from './prodImg';

class Product extends Component {
  state = {
    productDetail: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductsById(id)).then(res => {
      if (!this.props.products.productDetail) {
        this.props.history.push('/');
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCartHandler = id => {
    this.props.dispatch(addToCart(id));
  };

  render() {
    console.log(this.props.products.productDetail);

    return (
      <div>
        <PageTop title='product detail' />
        <div className='container'>
          {this.props.products.productDetail ? (
            <div className='product_detail_wrapper'>
              <div className='left'>
                <div style={{ width: '500px' }}>
                  <ProdImage
                    images={this.props.products.productDetail.images}
                  />
                </div>
              </div>
              <div className='right'>
                <ProdNfo
                  addToCart={id => {
                    this.addToCartHandler(id);
                  }}
                  detail={this.props.products.productDetail}
                />
              </div>
            </div>
          ) : (
            'loading'
          )}
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

export default connect(mapStateToProps)(Product);
