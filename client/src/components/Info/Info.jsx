import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../..';
import './info.css';

const Info = observer(() => {
    const { game } = useContext(Context);

    return (
        <div className='messageBox'>
            {game.message}
        </div>
    );
})

export default Info;
