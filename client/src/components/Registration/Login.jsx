import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title/Title";
import './loginPage.css'
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(""); // Стан для зберігання значення логіна
    const [password, setPassword] = useState(""); // Стан для зберігання значення пароля

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { login, password }); // Відправка POST-запиту з логіном та паролем
            console.log(response.data); // Виведення в консоль отриманої відповіді
            navigate('/start'); // Перенаправлення на початкову сторінку після успішного входу
        } catch (error) {
            console.error(error); // Виведення в консоль помилки, якщо вона виникла під час входу
        }
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
            <button className="login-button" onClick={handleLogin}>Login</button>
            <div className="signup-link">
                Don't have an account? <button className="signup-button" onClick={handleNavigateToSignupPage}>Sign up</button>
            </div>
        </div>
    );
};

export default Login;



