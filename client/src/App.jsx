import React from 'react';
import MyMap from './MyMap/MyMap';
import EnemyMap from './EnemyMap/EnemyMap';
import RoomCode from './RoomCode/RoomCode';
import Title from './Title/Title';
import StartButton from './StartButton/StartButton';

const App = () => {
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

export default App;
