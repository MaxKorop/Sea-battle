import React from 'react';
import MyMap from './MyMap/MyMap';
import EnemyMap from './EnemyMap/EnemyMap';
import RoomCode from './RoomCode/RoomCode';
import Title from './Title/Title';

const App = () => {
  return (
    <div>
      <RoomCode />
      <Title />
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", paddingTop: 35 }}>
        <MyMap />
        <EnemyMap />
      </div>
    </div>
  );
}

export default App;
