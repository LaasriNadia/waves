import React from 'react';
import MyButton from '../utils/Button';
import Slider from 'react-slick';
const HomeSlider = props => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  const slides = [
    {
      img: '/images/featured/featured_home.jpg',
      lineOne: 'Fender',
      lineTwo: 'Custom shop',
      linkTitle: 'Shop now',
      linkTo: '/shop'
    },
    {
      img: '/images/featured/featured_home_2.jpg',
      lineOne: 'B-Stock',
      lineTwo: 'Awesome discounts',
      linkTitle: 'View offers',
      linkTo: '/shop'
    }
  ];
  return (
    <div className='featured_container'>
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div key={i}>
            <div
              className='featured_image'
              style={{
                background: `url(${slide.img})`,
                height: `${window.innerHeight}px`
              }}
            >
              <div className='featured_action'>
                <div className='tag title'>{slide.lineOne}</div>
                <div className='tag low_title'>{slide.lineTwo}</div>
                <div>
                  <MyButton
                    type='default'
                    title={slide.linkTitle}
                    linkTo={slide.linkTo}
                    addStyles={{
                      margin: '10px 0 0 0'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default HomeSlider;
