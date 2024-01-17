import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Context } from '..';
import Hit from '../Hit&Miss/Hit';
import Miss from '../Hit&Miss/Miss';

const Cell = observer(({ isEnemy, x, y, isShip }) => {
  const [showMiss, setShowMiss] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const { game } = useContext(Context);
  let cellStyles = {
    width: 30,
    height: 30,
    border: "1px dashed black",
    position: 'relative'
  }
  if (!isEnemy && isShip) cellStyles.backgroundColor = 'gray';

  const onClickCell = () => {
    if (game.gameStarted && !hasClicked) {
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
      style={cellStyles}
      onClick={isEnemy ? onClickCell : undefined}
    >
      {isEnemy && showMiss && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Miss />
        </div>
      )}

      {isEnemy && isShip && hasClicked && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Hit />
        </div>
      )}
    </div>
  );
})

export default Cell;