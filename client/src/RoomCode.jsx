import React from 'react';
import { v4 } from 'uuid';
import CopyIcon from './CopyIcon';

const RoomCode = () => {
    const randomRoomCode = v4();

    const copyCode = () => {
        navigator.clipboard.writeText(randomRoomCode).then(() => {
        alert(`Copied to clipboard`)
    })}

    return (
        <div
            style={
                {
                    width: 320,
                    height: 50,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#000',
                    color: '#fff'
                }
            }
        >
            {randomRoomCode}
            <CopyIcon onClickFunc={copyCode}/>
        </div>
    );
}

export default RoomCode;
