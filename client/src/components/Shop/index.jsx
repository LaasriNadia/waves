import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { connect } from 'react-redux';
import CollapseCheckbox from '../utils/collapseCheckbox.jsx';
import { frets, price } from '../utils/form/fixed_categories';
import CollapseRadio from '../utils/collapseRadio';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

import {
  getProductsForShop,
  getBrands,
  getWoods
} from '../../actions/product_actions';

import DisplayShopCards from './displayShopCards';

class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      fret: [],
      wood: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());
    this.props.dispatch(
      getProductsForShop(this.state.skip, this.state.limit, this.state.filters)
    );
  }

  showFilteredResults = filters => {
    this.props
      .dispatch(getProductsForShop(0, this.state.limit, filters))
      .then(() => {
        this.setState({
          skip: 0
        });
      });
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === 'price') {
      let array = [];
      for (let i in price) {
        if (price[i]._id == parseInt(filters, 10)) {
          array = price[i].array;
        }
      }
      newFilters[category] = array;
    }
    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters
    });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;
    this.props
      .dispatch(
        getProductsForShop(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.product.toShop
        )
      )
      .then(() => {
        this.setState({
          skip: skip
        });
      });
  };
  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? 'grid_bars' : ''
    });
  };
  render() {
    const products = this.props.product;
    // console.log(this.props.product.toShop);
    return (
      <div>
        <PageTop title='Browse Products' />
        <div className='container'>
          <div className='shop_wrapper'>
            <div className='left'>
              <CollapseCheckbox
                initState={true}
                title='Brands'
                list={products.brands}
                handleFilters={filters => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckbox
                initState={false}
                title='Frets'
                list={frets}
                handleFilters={filters => this.handleFilters(filters, 'fret')}
              />
              <CollapseCheckbox
                initState={false}
                title='Woods'
                list={products.woods}
                handleFilters={filters => this.handleFilters(filters, 'wood')}
              />
              <CollapseRadio
                initState={true}
                title='Price'
                list={price}
                handleFilters={filters => this.handleFilters(filters, 'price')}
              />
            </div>
            <div className='right'>
              <div className='shop_options'>
                <div className='shop_grids clear'>
                  <div
                    className={`grid_btn ${this.state.grid ? '' : 'active'} `}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>

                  <div
                    className={`grid_btn ${!this.state.grid ? '' : 'active'} `}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div>
                <DisplayShopCards
                  products={this.props.product.toShop}
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={this.props.product.toShopSize}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(Shop);
