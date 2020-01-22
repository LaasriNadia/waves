import React from 'react';
import MyButton from '../utils/Button';
const HomePromotion = () => {
  return (
    <div className='home_promotion'>
      <div
        className='home_promotion_img'
        style={{
          background: 'url(/images/featured/featured_home_3.jpg)'
        }}
      >
        <div className='tag title'>up to 40% off</div>
        <div className='tag low_title'>in second hand guitars</div>
        <div>
          <MyButton
            className='my_link'
            linkTo='/shop'
            title='shop now'
            type='default'
            addStyles={{
              margin: '10px 0 0 0'
            }}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};
export default HomePromotion;
