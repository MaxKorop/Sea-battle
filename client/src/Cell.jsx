import React from 'react';

const Cell = ({ isEnemy, onClickCell, isShip }) => {
    
    if (isEnemy) {
        return (
            <div style={{ width: 50, height: 50, backgroundColor: "#525CEB", border: "1px solid black" }} onClick={onClickCell}>
                
            </div>
        );
    } else {
        return (
            <div style={{ width: 50, height: 50, backgroundColor: "#525CEB", border: "1px solid black" }}>
                
            </div>
        );
    }
}

export default Cell;
