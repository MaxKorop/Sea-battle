import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../..';
import './startButtonStyles.css';

const StartButton = observer(() => {
  const { game } = useContext(Context);
  
  const startGame = () => {
    game.shipCoords.length === 0 ? alert("You can't start game without placing ships") : game.readyToGame();
  }

  return (
    <div>
      {!game.gameStarted && 
        <button onClick={() => startGame()} className='button'>{!game.ready ? 'Ready!' : 'You are ready!'}</button>
      }
    </div>
  );
})

export default StartButton;
