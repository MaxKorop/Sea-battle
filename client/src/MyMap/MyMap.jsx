import React from 'react';
import Cell from '../Cell/Cell';

const MyMap = () => {
  const cells = Array.from({ length: 100 }, (_, i) => (
    <Cell key={i} x={(i % 10) + 1} y={Math.floor(i / 10) + 1} />
  ));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 30px)", gridAutoRows: "30px", margin: 50 }}>
      {cells.map(cell => cell)}
    </div>
  );
}

export default MyMap;

