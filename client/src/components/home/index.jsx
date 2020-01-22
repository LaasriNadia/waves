import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';

import { connect } from 'react-redux';
import {
  getProductsByArrival,
  getProductsBySell
} from '../../actions/product_actions';

import CardBlock from '../utils/card_block';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    // console.log(this.props);
    return (
      <>
        <HomeSlider />
        <CardBlock
          cards={this.props.product.bySell}
          title='Best Selling Guitars'
        />
        <HomePromotion />
        <CardBlock cards={this.props.product.byArrival} title='New arrivals' />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(Home);
