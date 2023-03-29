import React, { useState } from 'react';
import './style.css';
import DisplayCard from './DisplayCard';

export default function App() {
  const [cards, setCards] = useState([]);
  const [sum, setSum] = useState(0);

  const shuffleDeck = () => {
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then((response) => response.json())
      .then((data) => drawCards(data.deck_id));
  };

  const drawCards = (deckId) => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then((response) => response.json())
      .then((data) => {
        const cardValues = data.cards.map((card) => {
          if (
            card.value === 'JACK' ||
            card.value === 'QUEEN' ||
            card.value === 'KING' ||
            card.value === 'ACE'
          ) {
            return 10;
          } else {
            return parseInt(card.value, 10);
          }
        });

        const sum = cardValues.reduce((a, b) => a + b, 0);
        setCards(data.cards);
        setSum(sum);
      });
  };
  return (
    <div className="App">
      <p>Click the button to fetch cards</p>
      <button onClick={shuffleDeck}>Fetch Cards</button>
      {cards.length > 0 && <DisplayCard cards={cards} sum={sum} />}
    </div>
  );
}
