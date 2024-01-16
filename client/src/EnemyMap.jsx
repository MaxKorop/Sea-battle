import React, { useState } from 'react';
import Cell from './Cell';

const EnemyMap = () => {
    const cells = Array.from({length: 100}, (_, i) => <Cell key={i} isEnemy={true} />);

    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(10, 40px)", gridAutoRows: "40px", margin: 50}}>
            {cells.map(cell => cell)}
        </div>
    );
}

export default EnemyMap;
