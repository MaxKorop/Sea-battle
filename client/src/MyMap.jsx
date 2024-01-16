import React, { useState } from 'react';
import Cell from './Cell';

const MyMap = () => {
    const [cells, setCells] = useState(Array.from({ length: 100 }, (_, i) => {
        if (i/2) return <Cell key={i} />;
        else return <Cell key={i} />;
    }));
    
    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(10, 50px)", gridAutoRows: "50px", gridColumnGap: "5px", gridRowGap: "5px"}}>
            {cells.map(cell => cell)}
        </div>
    );
}

export default MyMap;
