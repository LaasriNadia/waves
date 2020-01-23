import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import { getCartItems, removeFromCart } from '../../actions/user_actions';

import UserLayout from '../UserPrivate/user';
import UserProductBlock from '../utils/User/product_block';

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };
  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        this.props
          .dispatch(getCartItems(cartItems, user.userData.cart))
          .then(() => {
            if (this.props.user.cartDetail.length > 0) {
              this.calculateTotalPrice();
            }
          });
      }
    }
  }

  calculateTotalPrice = () => {
    let totalPrice = 0;
    this.props.user.cartDetail.map(item => {
      totalPrice += item.quantity * parseInt(item.price);
      this.setState({
        total: totalPrice,
        showTotal: true
      });
    });
  };

  showNoItemMsg = () => (
    <div className='cart_no_items'>
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items</div>
    </div>
  );

  showSuccessMsg = () => (
    <div className='cart_success'>
      <FontAwesomeIcon icon={faSmile} />
      <div>Thank you, purchase completed!</div>
    </div>
  );

  removeItem = id => {
    this.props.dispatch(removeFromCart(id)).then(res => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculateTotalPrice();
      }
    });
  };
  render() {
    // console.log(this.props.user.cartDetail.length);
    return (
      <UserLayout>
        <div>
          <h1>My cart</h1>
          <div className='user_cart'>
            <UserProductBlock
              products={this.props.user}
              type='cart'
              removeItem={id => this.removeItem(id)}
            />
            {this.state.showTotal ? (
              <div>
                <div className='user_cart_sum'>
                  <div> Total amount : ${this.state.total}</div>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              this.showSuccessMsg()
            ) : (
              this.showNoItemMsg()
            )}
          </div>
          {this.state.showTotal ? (
            <div className='paypal_button_container'>paypal</div>
          ) : null}
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserCart);
