import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title/Title";
import './loginPage.css'
import { logIn } from "../../http/userAPI";

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(""); // Стан для зберігання значення логіна
    const [password, setPassword] = useState(""); // Стан для зберігання значення пароля
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState(false);


    const handleLogin = async () => {
        try {
            const res = await logIn(login, password);
            if (typeof res === 'string') return setLoginError(res);
            navigate('/start'); // Перенаправлення на початкову сторінку після успішного входу
        } catch (error) {
            console.error(error); // Виведення в консоль помилки, якщо вона виникла під час входу
        }
    };

    const validateAndSet = e => {
        const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        if (e.target.value.match(regexp)) {
            setPasswordError(false);
            setPassword(e.target.value);
        } else setPasswordError(true);
    }

    const handleNavigateToSignupPage = () => {
        navigate('/signup'); 
    };

    return (
        <div className="login-container">
            <div><Title/></div>
            <div className="login-form">
                <div className="input-group">
                    {loginError && <label htmlFor="login" style={{color: 'red', fontSize: 14, alignSelf: 'flex-start', marginLeft: 10}}>{loginError}</label>}
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
                    {passwordError && <label htmlFor="password" style={{color: 'red', fontSize: 14, alignSelf: 'flex-start', marginLeft: 10}}>Password is not valid</label>}
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter Password" 
                        className="input-field"
                        onChange={e => validateAndSet(e)} // Оновлення стану пароля
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



