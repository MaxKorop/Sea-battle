import React from 'react';
import MyMap from './MyMap';
import EnemyMap from './EnemyMap';
import RoomCode from './RoomCode';

const App = () => {
  return (
    <div>
      <RoomCode />
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{margin: 50}}>
          <MyMap />
        </div>
        <div style={{margin: 50}}>
          <EnemyMap />
        </div>
      </div>
    </div>
  );
}

export default App;
