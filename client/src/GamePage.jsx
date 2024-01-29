import React from 'react';
import MyMap from './components/Map/MyMap';
import EnemyMap from './components/Map/EnemyMap';
import RoomCode from './components/RoomCode/RoomCode';
import Title from './components/Title/Title';
import StartButton from './components/StartButton/StartButton';

const GamePage = () => {

  const beforeUnload = event => {
    window.setTimeout(() => {
      window.location = '/';
    }, 0);
    window.onbeforeunload = null;
  }

  if (window.location.pathname === '/game') {
    window.addEventListener('beforeunload', beforeUnload)
  }

  return (
    <div>
      <RoomCode />
      <Title />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", paddingTop: 35, width: '100%' }}>
          <MyMap />
          <EnemyMap />
        </div>
        <StartButton />
      </div>
    </div>
  );
}

export default GamePage;