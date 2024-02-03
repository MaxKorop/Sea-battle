import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css"
import Title from "../Title/Title";

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); // Стан для зберігання імені користувача
    const [password, setPassword] = useState(""); // Стан для зберігання пароля
    const handleNavigateToStartPage = () => {
        navigate('/start'); 
    };


    return (
        <div className="signup-container">
            <Title />
            <h2>Sign up</h2>
            <div className="signup-form">
                <div className="input-group">
                    <label htmlFor="username"></label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Enter your username" 
                        className="input-field" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password"></label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        className="input-field" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button className="Signup-button" onClick={handleNavigateToStartPage}>Sign up</button>
            </div>
        </div>
    );
};

export default Signup;
