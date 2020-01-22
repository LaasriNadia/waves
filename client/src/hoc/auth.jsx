import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';

import CircularProgress from '@material-ui/core/CircularProgress';
export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    componentWillMount() {
      this.props.dispatch(auth()).then(res => {
        let user = this.props.user.userData;

        if (!user.isAuth) {
          if (reload) {
            this.props.history.push('/register_login');
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push('/dashboard');
          } else {
            if (reload == false) {
              this.props.history.push('/dashboard');
            }
          }
        }

        this.setState({
          loading: false
        });
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className='main_loader'>
            <CircularProgress style={{ color: '#2196f3' }} thickness={7} />{' '}
          </div>
        );
      } else {
        return (
          <ComposedClass {...this.props} user={this.props.user}></ComposedClass>
        );
      }
    }
  }

  function mapStateToProps(state) {
    return { user: state.user };
  }
  return connect(mapStateToProps)(AuthenticationCheck);
}
