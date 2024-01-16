import React, { useState } from 'react';
import Cell from './Cell';

const EnemyMap = () => {
    const [cells, setCells] = useState(Array.from({length: 100}, (_, i) => <Cell key={i} isEnemy={true} onClickCell={() => console.log("clicked")} />));

    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(10, 50px)", gridAutoRows: "50px", gridColumnGap: "5px", gridRowGap: "5px"}}>
            {cells.map(cell => cell)}
        </div>
    );
}

export default EnemyMap;
