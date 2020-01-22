import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router';
import { logoutUser } from '../../../actions/user_actions';

class Header extends Component {
  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true
      }
    ],
    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false
      },
      {
        name: 'Log in',
        linkTo: '/register_login',
        public: true
      },
      {
        name: 'Log out',
        linkTo: '/user/logout',
        public: false
      }
    ]
  };

  handleCart = (item, i) => {
    const user = this.props.user.userData;
    return (
      <div className='cart_link' key={i}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={item.linkTo}>{item.name}</Link>
      </div>
    );
  };

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(res => {
      if (res.payload.success) {
        this.props.history.push('/');
      }
    });
  };

  returnTheLink = (item, i) =>
    item.name === 'Log out' ? (
      <div
        className='log_out_link'
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  showLinks = type => {
    if (type == this.state.page) {
      return type.map((item, i) => {
        return this.returnTheLink(item, i);
      });
    } else {
      let publicLinks = type.filter(link => {
        return link.public == true;
      });
      let privateLinks = type.filter(link => link.public == false);
      if (this.props.user.userData) {
        if (this.props.user.userData.isAuth) {
          return privateLinks.map((item, i) => {
            if (item.name == 'My Cart') {
              return this.handleCart(item, i);
            } else return this.returnTheLink(item, i);
          });
        } else {
          return publicLinks.map((item, i) => {
            return this.returnTheLink(item, i);
          });
        }
      }
    }
  };

  render() {
    return (
      <header className='bck_b_light'>
        <div className='container'>
          <div className='left'>
            <div className='logo'>WAVES</div>
          </div>
          <div className='right'>
            <div className='top'>{this.showLinks(this.state.user)}</div>
            <div className='bottom'>{this.showLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(withRouter(Header));
