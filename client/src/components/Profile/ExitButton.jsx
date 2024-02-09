import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../..";

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
            className="rules-button"
            onClick={() => logOut()}
            style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                height: 40,
                borderRadius: 5,
                width: 80
            }}
        >
            Log Out
        </button>
    );
});

export default ExitButton;