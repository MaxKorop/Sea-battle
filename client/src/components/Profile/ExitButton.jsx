import React from "react";
import { useNavigate } from 'react-router-dom';

const ExitButton = ({ onClick }) => {
    const navigate = useNavigate();
    const ExitClick = () => {
        navigate('/start')
    }
    return (
        <button
            className="rules-button"
            onClick={ExitClick}
            style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                height: 40,
                borderRadius: 5,
                width: 80
            }}
        >
             Exit      
        </button>
    );
};

export default ExitButton;