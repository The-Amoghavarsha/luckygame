import React, { useState } from 'react';
import './App.css';

function LuckyGame() {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Guess, setPlayer1Guess] = useState('');
  const [player2Guess, setPlayer2Guess] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winner, setWinner] = useState('');

  const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(random);
    calculatePoints(random);
  };

  const calculatePoints = (random) => {
    const player1Diff = Math.abs(random - player1Guess);
    const player2Diff = Math.abs(random - player2Guess);

    let newPlayer1Score = player1Score;
    let newPlayer2Score = player2Score;

    if (player1Diff === 0) {
      newPlayer1Score += 2;
    } else if (player1Diff < player2Diff) {
      newPlayer1Score += 1;
    }

    if (player2Diff === 0) {
      newPlayer2Score += 2;
    } else if (player2Diff < player1Diff) {
      newPlayer2Score += 1;
    }

    setPlayer1Score(newPlayer1Score);
    setPlayer2Score(newPlayer2Score);

    checkWinner(newPlayer1Score, newPlayer2Score);
  };

  const checkWinner = (newPlayer1Score, newPlayer2Score) => {
    if (newPlayer1Score >= 10) {
      setWinner(player1Name);
    } else if (newPlayer2Score >= 10) {
      setWinner(player2Name);
    }
  };

  const resetGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setWinner('');
    setRandomNumber(null);
    setPlayer1Guess('');
    setPlayer2Guess('');
  };

  return (
    <div className="game-container">
      <h1>Lucky Game</h1>

      <div className="players">
        <div>
          <label>Player 1 Name: </label>
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            disabled={winner !== ''}
          />
        </div>
        <div>
          <label>Player 2 Name: </label>
          <input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            disabled={winner !== ''}
          />
        </div>
      </div>

      <div className="guesses">
        <div>
          <label>{player1Name || 'Player 1'}'s Guess: </label>
          <input
            type="number"
            value={player1Guess}
            onChange={(e) => setPlayer1Guess(e.target.value)}
            disabled={winner !== ''}
            placeholder="Enter a number"
          />
        </div>
        <div>
          <label>{player2Name || 'Player 2'}'s Guess: </label>
          <input
            type="number"
            value={player2Guess}
            onChange={(e) => setPlayer2Guess(e.target.value)}
            disabled={winner !== ''}
            placeholder="Enter a number"
          />
        </div>
      </div>

      <button onClick={generateRandomNumber} disabled={winner !== ''}>
        Generate Random Number
      </button>

      {randomNumber && <h2>Random Number: {randomNumber}</h2>}

      <div className="scores">
        <h3>{player1Name || 'Player 1'}'s Score: {player1Score}</h3>
        <h3>{player2Name || 'Player 2'}'s Score: {player2Score}</h3>
      </div>

{winner && <h2 className="winner-message">{winner} Wins!</h2>}

      <button onClick={resetGame} className="reset-btn">
        Reset Game
      </button>
    </div>
  );
}

export default LuckyGame;

