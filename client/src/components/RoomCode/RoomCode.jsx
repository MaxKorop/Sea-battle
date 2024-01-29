import React, { useContext } from 'react';
import CopyIcon from './CopyIcon';
import './roomCodeStyles.css';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { v4 } from 'uuid';

const RoomCode = observer(() => {
    const { game } = useContext(Context);
    if (!game.gameCode) game.setGameCode(v4());

    const copyCode = () => navigator.clipboard.writeText(game.gameCode);

    return (
        <div className='room-code'>
            {game.gameCode}
            <CopyIcon onClickFunc={copyCode} />
        </div>
    );
});

export default RoomCode;
