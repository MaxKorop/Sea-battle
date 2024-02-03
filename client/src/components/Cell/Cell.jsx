import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../..';
import Hit from '../Hit&Miss/Hit';
import Miss from '../Hit&Miss/Miss';
import './cellStyles.css';

const Cell = observer(({ isEnemy, x, y, isShip, isSunken, isMiss }) => {
  const cellRef = useRef(null);
  const { game } = useContext(Context);
  
  const onClickCell = () => {
    console.log('click');
    if (game.gameStarted && game.move && !game.enemySunkenIncludes([x,y])) {
      game.shot([x, y]);
    }
  };
  
  useEffect(() => {
    if (!isEnemy && isShip) cellRef.current.classList.add('ship');
    if (!isEnemy && !isShip) cellRef.current.classList.remove('ship');
    if (!isEnemy && isSunken) cellRef.current.classList.add('sunken-ship');
    if (!isEnemy && !isSunken) cellRef.current.classList.remove('sunken-ship');
    if (!isEnemy && isMiss) cellRef.current.classList.add('miss');
    if (!isEnemy && !isMiss) cellRef.current.classList.remove('miss');
  }, [isEnemy, isShip, isSunken, isMiss, game])

  return (
    <div className='cell' onClick={isEnemy ? () => onClickCell() : undefined} ref={cellRef}>
      {isEnemy && isMiss && 
        <Miss />
      }

      {isEnemy && isSunken && 
        <Hit />
      }
    </div>
  );
})

export default Cell;