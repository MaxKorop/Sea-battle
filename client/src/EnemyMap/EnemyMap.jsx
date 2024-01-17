import React, { useState } from 'react';
import Cell from '../Cell/Cell';

const EnemyMap = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const cells = Array.from({ length: 100 }, (_, i) => (
    <Cell key={i} isEnemy={true} x={(i % 10) + 1} y={Math.floor(i / 10) + 1} gameStarted={gameStarted} />
  ));

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 30px)", gridAutoRows: "30px", margin: '50px auto' }}>
        {cells.map(cell => React.cloneElement(cell, { gameStarted }))}
      </div>
      {!gameStarted && (
        <button
          onClick={startGame}
          style={{
            marginTop: 20,
            padding: '10px 20px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Start Game
        </button>
      )}
    </div>
  );
}

export default EnemyMap;
