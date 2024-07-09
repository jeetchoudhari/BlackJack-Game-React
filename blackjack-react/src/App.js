import React, { useState } from 'react';
import './App.css';
import Scoreboard from './Scoreboard';

const cards_dict = {
  'A': 1, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10
};

const Game = () => {
  const [playerSum, setPlayerSum] = useState(0);
  const [computerSum, setComputerSum] = useState(0);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [gameResult, setGameResult] = useState('');
  const [showComputerCards, setShowComputerCards] = useState(false);
  const [scoreboard, setScoreboard] = useState([]);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);

  const startGame = () => {
    let pSum = 0, cSum = 0;
    let pCards = [], cCards = [];

    for (let i = 0; i < 2; i++) {
      const randomCardP = randomCard();
      pCards.push(randomCardP);
      pSum += cards_dict[randomCardP];
    }

    for (let i = 0; i < 2; i++) {
      const randomCardC = randomCard();
      cCards.push(randomCardC);
      cSum += cards_dict[randomCardC];
    }

    setPlayerCards(pCards);
    setComputerCards(cCards);
    setPlayerSum(pSum);
    setComputerSum(cSum);
  };

  const randomCard = () => {
    const cards = Object.keys(cards_dict);
    return cards[Math.floor(Math.random() * cards.length)];
  };

  const drawCard = () => {
    const randomCardP = randomCard();
    const pCards = [...playerCards, randomCardP];
    const pSum = playerSum + cards_dict[randomCardP];
    setPlayerCards(pCards);
    setPlayerSum(pSum);
    
    if (pSum > 21) {
      const result = 'Computer wins';
      setGameResult(result);
      updateScoreboard(result);
      setComputerWins(prev => prev + 1);
    } else if (pSum === 21) {
      const result = 'Player wins';
      setGameResult(result);
      updateScoreboard(result);
      setPlayerWins(prev => prev + 1);
    }
  };

  const stopGame = () => {
    let cSum = computerSum; // Initialize computer sum
    let cCards = [...computerCards]; // Copy current computer cards
  
    // Draw cards for computer until sum is 17 or higher
    while (cSum < 17) {
      const randomCardC = randomCard();
      cCards.push(randomCardC); // Add drawn card to computer cards
      cSum += cards_dict[randomCardC]; // Update computer sum
    }
  
    // Update state with final computer cards and sum
    setComputerCards(cCards);
    setComputerSum(cSum);
    setShowComputerCards(true); // Show computer cards
  
    // Determine game result after computer stops drawing cards
    if ((playerSum > cSum && playerSum <= 21) || (cSum > 21 && playerSum <= 21)) {
      const result = 'Player wins';
      setGameResult(result);
      updateScoreboard(result);
      setPlayerWins(prev => prev + 1); // Increment player wins
    } else if ((cSum > playerSum && cSum <= 21) || (playerSum > 21 && cSum <= 21)) {
      const result = 'Computer wins';
      setGameResult(result);
      updateScoreboard(result);
      setComputerWins(prev => prev + 1); // Increment computer wins
    } else {
      const result = 'Game tied';
      setGameResult(result);
      updateScoreboard(result);
    }
  };

  const refreshGame = () => {
    setPlayerSum(0);
    setComputerSum(0);
    setPlayerCards([]);
    setComputerCards([]);
    setGameResult('');
    setShowComputerCards(false); // Hide computer cards on refresh
  };

  const updateScoreboard = (result) => {
    setScoreboard([...scoreboard, result]);
  };

  return (
    <div className="game-container">
      <p className="start-game">Press "Start Game" to start game and distribute the cards</p>
      <button className="start-btn" onClick={startGame}>Start Game</button>
      <h3>Initial cards are:</h3>
      <div className="player-cards">
        <h3>Player Cards: {playerCards.join(', ')}</h3>
        <p>Player Sum: {playerSum}</p>
      </div>

      <div className="computer-cards">
        <h3>Computer Cards: {computerCards.join(', ')}</h3>
        <p>Computer Sum: {computerSum}</p>
      </div>

      <button onClick={drawCard}>Draw Card</button>
      <button onClick={stopGame}>Stop</button>
      <div className="computer-cards">
        <h3>Cards after user stops</h3>
        <p>Computer Cards: {showComputerCards ? computerCards.join(', ') : '???'}</p>
        <p>Computer Sum: {showComputerCards ? computerSum : '???'}</p>
      </div>
      <div className="game-result">
        {gameResult && <h2>{gameResult}</h2>}
      </div>
      <button onClick={refreshGame}>Refresh Game</button>

      <Scoreboard scoreboard={scoreboard} playerWins={playerWins} computerWins={computerWins} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1 className="">Blackjack Game</h1>
      <Game />
    </div>
  );
}

export default App;
