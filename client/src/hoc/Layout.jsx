import React, { Component } from 'react';
import Header from '../components/header_footer/header';
import Footer from '../components/header_footer/footer';
import { connect } from 'react-redux';
import { getSiteInfo } from '../actions/site_actions';
class Layout extends Component {
  componentDidMount() {
    if (this.props.site.length === 0) {
      this.props.dispatch(getSiteInfo());
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className='page_container'>{this.props.children}</div>
        <Footer site={this.props.site} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site
  };
};

export default connect(mapStateToProps)(Layout);
