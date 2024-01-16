import React from 'react';

const Cell = ({ isEnemy, x, y, isShip }) => {

    const onClickCell = () => {
        console.log(`x: ${x}, y: ${y}`);
    }
    
    if (isEnemy) {
        return (
            <div style={{ width: 40, height: 40, border: "1px dashed black" }} onClick={onClickCell}>
                
            </div>
        );
    } else {
        return (
            <div style={{ width: 40, height: 40, border: "1px dashed black" }}>
                
            </div>
        );
    }
}

export default Cell;
