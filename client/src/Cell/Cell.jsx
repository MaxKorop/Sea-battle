import React, { useState } from 'react';

const Cell = ({ isEnemy, x, y, isShip }) => {
  const [showMiss, setShowMiss] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const onClickCell = () => {
    if (!hasClicked && isEnemy) {
      setHasClicked(true);

      if (isShip) {
        // Якщо це було влучення
        console.log(x, y, 'hit');
      } else {
        // Якщо це був промах
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

      {/* Додайте надпис "hit", якщо isShip === true та користувач клікнув */}
      {isEnemy && isShip && hasClicked && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'green', // колір тексту
          }}
        >
          hit
        </div>
      )}
    </div>
  );
};

export default Cell;
