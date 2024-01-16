import React, { useState } from 'react';

const Cell = ({ isEnemy, x, y, isShip }) => {

    const onClickCell = () => {
        setStyle({...style, backgroundColor: 'gray'});
    }


    const [style, setStyle] = useState({
        width: 30,
        height: 30,
        border: "1px dashed black"
    });
    
    if (isEnemy) {
        return (
            <div style={style} onClick={onClickCell}>
                
            </div>
        );
    } else {
        return (
            <div style={style}>
                
            </div>
        );
    }
}

export default Cell;
