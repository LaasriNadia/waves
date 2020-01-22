import React, { Component } from 'react';
import MyButton from '../utils/Button';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/user_actions';

class Card extends Component {
  displayImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_availble.png';
    }
  };
  render() {
    return (
      <div className={`card_item_wrapper ${this.props.grid}`}>
        <div
          className='image'
          style={{
            background: `url(${this.displayImage(this.props.images)}) no-repeat`
          }}
        ></div>
        <div className='action_container'>
          <div className='tags'>
            <div className='brand'>{this.props.brand.name}</div>
            <div className='name'>{this.props.name}</div>
            <div className='price'>${this.props.price}</div>
          </div>

          {this.props.grid ? (
            <div className='description'>
              <p>{this.props.description}</p>
            </div>
          ) : null}

          <div className='actions'>
            <div className='button_wrapp'>
              <MyButton
                type='default'
                altClass='card_link'
                title='View product'
                linkTo={`/product_detail/${this.props._id}`}
                addStyles={{
                  margin: '10px 0 0 0'
                }}
              />
            </div>
            <div className='button_wrapp'>
              <MyButton
                type='bag_link'
                runAction={() => {
                  this.props.isAuth
                    ? this.props.dispatch(addToCart(this.props._id))
                    : console.log('not auth');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.user.userData.isAuth
  };
};

export default connect(mapStateToProps)(Card);
