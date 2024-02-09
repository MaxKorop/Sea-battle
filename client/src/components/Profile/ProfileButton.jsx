import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { statistic } from "../../http/gameAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const ProfileButton = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const checkProfilePage = async () => {
        const res = await statistic();
        user.setStatistic(res);
        navigate('/profile')
    }
    return (
        <button
            className="rules-button"
            onClick={() => checkProfilePage()}
            style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                width: "100%",
                height: 40,
                borderRadius: 5,
                marginTop: 15
            }}
        >
            Check profile
        </button>
    );
});

export default ProfileButton