import React from 'react';
import CardBlockShop from '../utils/card_block_shop';
const displayShopCards = props => {
  let load = true;

  props.size >= props.limit && props.size > 0 ? (load = true) : (load = false);

  return (
    <div>
      <div>
        <CardBlockShop grid={props.grid} list={props.products} />
      </div>
      {load ? (
        <div className='load_more_container'>
          <span onClick={() => props.loadMore()}>Load More</span>
        </div>
      ) : null}
    </div>
  );
};
export default displayShopCards;
