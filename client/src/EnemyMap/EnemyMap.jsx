import React, { useState } from 'react';
import Cell from '../Cell/Cell';

const EnemyMap = () => {
    const cells = Array.from({length: 100}, (_, i) => <Cell key={i} isEnemy={true} x={String(i+1)[1]} y={String(i+1)[0]} />);

    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(10, 30px)", gridAutoRows: "30px", margin: 50}}>
            {cells.map(cell => cell)}
        </div>
    );
}

export default EnemyMap;
