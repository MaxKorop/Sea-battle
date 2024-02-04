import React, { useContext, useEffect, useState } from 'react';
import MyMap from './components/Map/MyMap';
import EnemyMap from './components/Map/EnemyMap';
import RoomCode from './components/RoomCode/RoomCode';
import Title from './components/Title/Title';
import StartButton from './components/StartButton/StartButton';
import Info from './components/Info/Info';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import AfterGame from './components/AfterGame/AfterGame';


const GamePage = observer(() => {
  const [clear, setClear] = useState(false);
  const { game } = useContext(Context);
  const navigate = useNavigate();
  
  useEffect(() => {
    setClear(false);

    if (localStorage.getItem('redirect') === 'true') navigate('/start');

    const handleBeforeUnload = () => {
      localStorage.setItem('redirect', true);
    }

    window.addEventListener('unload', handleBeforeUnload);

    return () => {
      window.removeEventListener('unload', handleBeforeUnload);
    };

  }, [navigate]);

  const clearMapsStates = () => {
    setClear(true);
  }

  return (
    <div>
      <RoomCode />
      <Title />
      {game.gameStarted && <Info />}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", paddingTop: 35, width: '100%' }}>
          {clear ? (<>
              <MyMap />
              <EnemyMap /> 
            </>) : (<>
              <MyMap />
              <EnemyMap /> 
            </>
          )}
        </div>
        <StartButton />
        {game.gameFinished && <AfterGame clearAllMapsStates={clearMapsStates} />}
      </div>
    </div>
  );
});

export default GamePage;