import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';

const StartButton = observer(() => {
  const { game } = useContext(Context);
    
  return (
    <div>
       {!game.gameStarted && (
        <button
          onClick={() => game.setGameStarted(true)}
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
})

export default StartButton;
