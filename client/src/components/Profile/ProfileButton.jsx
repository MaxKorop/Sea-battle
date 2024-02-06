import React from "react";
import { useNavigate } from 'react-router-dom';

const ProfileButton = () => {
    const navigate = useNavigate();
    const CheckProfilePage = () => {
        navigate('/profile')
    }
    return (
        <button
            className="rules-button"
            onClick={CheckProfilePage}
            style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                width: "100%",
                height: 40,
                borderRadius: 5,
            }}
        >
             Check profile
        </button>
    );
}

export default ProfileButton