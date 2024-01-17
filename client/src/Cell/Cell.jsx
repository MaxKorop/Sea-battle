import React, { useState } from 'react';

const Cell = ({ isEnemy, x, y, isShip, gameStarted }) => {
  const [showMiss, setShowMiss] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const onClickCell = () => {
    if (gameStarted && !hasClicked && isEnemy) {
      setHasClicked(true);

      if (isShip) {
        console.log(x, y, 'hit');
      } else {
        setShowMiss(true);
        console.log(x, y, 'miss');
      }
    }
  };

  return (
    <div
      style={{
        width: 30,
        height: 30,
        border: "1px dashed black",
        position: 'relative',
      }}
      onClick={isEnemy ? onClickCell : undefined}
    >
      {isEnemy && showMiss && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'red',
          }}
        >
          miss
        </div>
      )}

      {isEnemy && isShip && hasClicked && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'green',
          }}
        >
          hit
        </div>
      )}
    </div>
  );
};

export default Cell;