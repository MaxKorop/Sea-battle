import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./components/Title/Title";
import "./Registration/loginPage.css"; 

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(""); // Стан для зберігання значення логіна
    const [password, setPassword] = useState(""); // Стан для зберігання значення пароля

    const handleNavigateToStartPage = () => {
        navigate('/start'); 
    };

    const handleNavigateToSignupPage = () => {
        navigate('/signup'); 
    };

    return (
        <div className="login-container">
            <div><Title/></div>
            <div className="login-form">
                <div className="input-group">
                    <label htmlFor="login"></label>
                    <input 
                        type="text" 
                        id="login" 
                        placeholder="Enter Login" 
                        className="input-field" 
                        value={login} // Значення логіна
                        onChange={(e) => setLogin(e.target.value)} // Оновлення стану логіна
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password"></label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter Password" 
                        className="input-field" 
                        value={password} // Значення пароля
                        onChange={(e) => setPassword(e.target.value)} // Оновлення стану пароля
                    />
                </div>
            </div>
            <button className="login-button" onClick={handleNavigateToStartPage}>Login</button>
            <div className="signup-link">
                Don't have an account? <button className="signup-button" onClick={handleNavigateToSignupPage}>Sign up</button>
            </div>
        </div>
    );
};

export default Login;



