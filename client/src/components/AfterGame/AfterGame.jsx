import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import './afterGame.css'

const AfterGame = observer(({ clearAllMapsStates }) => {
    const { game } = useContext(Context);
    const navigate = useNavigate();

    const playAgain = () => {
        game.playAgain();
        clearAllMapsStates();
    }

    const exit = () => {
        game.disconnect();
        game.clearStore();
        navigate('/start');
    }

    return (
        <div className='after-game-wrapper'>
            <button className='button' onClick={() => playAgain()}>Play Again</button>
            <button className='button' onClick={() => exit()}>Exit</button>
        </div>
    );
});

export default AfterGame;
