import React, { Component } from 'react';

import ImageLightbox from '../utils/lightbox';

export default class ProdImage extends Component {
  state = {
    lightBox: false,
    imagePos: 0,
    lightBoxImages: []
  };

  componentDidMount() {
    if (this.props.images.length > 0) {
      let imgs = [];
      this.props.images.map(img => imgs.push(img.url));
      this.setState({
        lightBoxImages: imgs
      });
    }
  }

  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return `/images/image_not_availble.png`;
    }
  };

  handleLightBox = pos => {
    if (this.state.lightBoxImages.length > 0) {
      this.setState({
        lightBox: true,
        imagePos: pos
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightBox: false
    });
  };

  showThumbs = images =>
    this.state.lightBoxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => {
            this.handleLightBox(i);
          }}
          className='thumb'
          style={{ background: `url(${item}) no-repeat` }}
        ></div>
      ) : null
    );

  render() {
    const { images } = this.props;
    console.log(images);
    return (
      <div className='product_image_container'>
        <div className='main_pic'>
          <div
            style={{
              background: `url(${this.renderCardImage(images)}) no-repeat`
            }}
            onClick={() => {
              this.handleLightBox(0);
            }}
          ></div>
        </div>
        <div className='main_thumbs'>{this.showThumbs(images)}</div>
        {this.state.lightBox ? (
          <ImageLightbox
            id={images.public_id}
            images={this.state.lightBoxImages}
            pos={this.state.imagePos}
            open={this.state.lightBox}
            onclose={() => this.handleLightBoxClose()}
          />
        ) : null}
      </div>
    );
  }
}
