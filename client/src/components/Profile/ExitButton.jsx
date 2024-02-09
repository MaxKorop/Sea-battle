import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../..";
import "./ExitButton.css";

const ExitButton = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const logOut = () => {
        user.setLogin('');
        user.setStatistic({});
        localStorage.setItem('tokenInterlink', '');
        navigate('/');
    }
    return (
        <button
            className="exit-button"
            onClick={() => logOut()}
        >
            Log Out
        </button>
    );
});

export default ExitButton;
