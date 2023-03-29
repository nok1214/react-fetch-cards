import React from 'react';

export default function DisplayCard({ cards, sum }) {
  return (
    <div>
      {cards.map((card) => (
        <img key={card.code} src={card.image} alt="card" />
      ))}
      <div>Sum: {sum}</div>
    </div>
  );
}
