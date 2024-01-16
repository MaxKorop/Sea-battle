import React, { useState } from 'react';
import Cell from '../Cell/Cell';

const MyMap = () => {
    const cells = Array.from({ length: 100 }, (_, i) => {
        return <Cell key={i} x={Number(String(i+1)[1])} y={Number(String(i+1)[0])}/>;
    });
    
    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(10, 30px)", gridAutoRows: "30px", margin: 50}}>
            {cells.map(cell => cell)}
        </div>
    );
}

export default MyMap;
