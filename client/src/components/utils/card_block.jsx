import React from 'react';
import Card from '../utils/card';

const CardBlock = props => {
  const displayCards = cards =>
    cards ? cards.map((card, i) => <Card key={i} {...card} />) : null;
  return (
    <div className='card_block'>
      <div className='container'>
        {props.title ? <div className='title'>{props.title} </div> : null}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {displayCards(props.cards)}
        </div>
      </div>
    </div>
  );
};
export default CardBlock;
