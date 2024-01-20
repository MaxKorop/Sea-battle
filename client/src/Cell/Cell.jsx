import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '..';
import Hit from '../Hit&Miss/Hit';
import Miss from '../Hit&Miss/Miss';
import './cellStyles.css';

const Cell = observer(({ isEnemy, x, y, isShip }) => {
  const [showMiss, setShowMiss] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const cellRef = useRef(null);
  const { game } = useContext(Context);
  
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
  
  useEffect(() => {
    if (!isEnemy && isShip) cellRef.current.classList.add('ship');
    if (!isEnemy && !isShip) cellRef.current.classList.remove('ship');
  }, [isEnemy, isShip])

  return (
    <div className='cell' onClick={isEnemy ? onClickCell : undefined} ref={cellRef}>
      {isEnemy && showMiss && 
        <Miss />
      }

      {isEnemy && isShip && hasClicked && 
        <Hit />
      }
    </div>
  );
})

export default Cell;