import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css"
import Title from "../Title/Title";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); // Стан для зберігання імені користувача
    const [password, setPassword] = useState(""); // Стан для зберігання пароля
    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', { username, password }); // Відправка POST-запиту з логіном та паролем
            console.log(response.data); // Виведення в консоль отриманої відповіді
            navigate('/start'); // Перенаправлення на початкову сторінку після успішного входу
        } catch (error) {
            console.error(error); // Виведення в консоль помилки, якщо вона виникла під час входу
        }
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
                <button className="Signup-button" onClick={handleLogin}>Sign up</button>
            </div>
        </div>
    );
};

export default Signup;
