import React from 'react';

const Scoreboard = ({ scoreboard, playerWins, computerWins }) => {
  return (
    <div className="scoreboard">
      <h3 className="scoreboard-name">Scoreboard</h3>
      <ul>
        {scoreboard.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      <div className="totalwins-container">
      <p>Total Player Wins: {playerWins}</p>
      <p>Total Computer Wins: {computerWins}</p>
    </div>
    </div>
  );
};

export default Scoreboard;
