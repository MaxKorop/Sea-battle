import React, { useState } from 'react';
import Cell from './Cell';

const MyMap = () => {
    const cells = Array.from({ length: 100 }, (_, i) => {
        if (i/2) return <Cell key={i} />;
        else return <Cell key={i} />;
    });
    
    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(10, 40px)", gridAutoRows: "40px", margin: 50}}>
            {cells.map(cell => cell)}
        </div>
    );
}

export default MyMap;
