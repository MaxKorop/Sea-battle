import React from 'react';
import { useNavigate } from 'react-router-dom';

const RulesButton = ({ onClick }) => {
    const navigate = useNavigate();
    const CheckRulesClick = () => {
        navigate('/rules')
    }
    return (
        <button
            className="rules-button"
            onClick={CheckRulesClick}
            style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                width: "100%",
                height: 40,
                borderRadius: 5,
            }}
        >
             Check rules
        </button>
    );
};

export default RulesButton;
