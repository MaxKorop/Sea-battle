import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Back.css";

const Back = () => {
    const navigate = useNavigate();
    const backToStartPage = () => {
        navigate('/start');
    };

    return (
        <div className="back-container">
            <button
                className="rules-button"
                onClick={backToStartPage}
            >
                Back
            </button>
        </div>
    );
};

export default Back;
