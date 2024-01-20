import React from 'react';
import { v4 } from 'uuid';
import CopyIcon from './CopyIcon';
import './roomCodeStyles.css';

const RoomCode = () => {
    const randomRoomCode = v4();

    const copyCode = () => {
        navigator.clipboard.writeText(randomRoomCode).then(() => {
        alert(`Copied to clipboard`)
    })}

    return (
        <div className='room-code'>
            {randomRoomCode}
            <CopyIcon onClickFunc={copyCode}/>
        </div>
    );
}

export default RoomCode;
