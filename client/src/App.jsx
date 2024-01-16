import React from 'react';
import MyMap from './MyMap';
import EnemyMap from './EnemyMap';
import RoomCode from './RoomCode';
import Title from './Title';

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
