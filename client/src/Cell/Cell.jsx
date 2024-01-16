import React, { useState } from 'react';

const Cell = ({ isEnemy, x, y, isShip }) => {
  const [showMiss, setShowMiss] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const onClickCell = () => {
    if (!hasClicked && isEnemy) {
      setShowMiss(true);
      setHasClicked(true);
      console.log(x, y);
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
      {/* Додайте надпис "miss", якщо showMiss === true */}
      {isEnemy && showMiss && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'red', // колір тексту
          }}
        >
          miss
        </div>
      )}
    </div>
  );
};

export default Cell;
