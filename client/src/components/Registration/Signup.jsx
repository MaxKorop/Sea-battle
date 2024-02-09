import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css"
import Title from "../Title/Title";
import { signUp } from "../../http/userAPI";

const Signup = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(""); // Стан для зберігання імені користувача
    const [password, setPassword] = useState(""); // Стан для зберігання пароля
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const handleSignup = async () => {
        try {
            const res = await signUp(login, password);
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

    return (
        <div className="signup-container">
            <Title />
            <h2>Sign up</h2>
            <div className="signup-form">
                <div className="input-group">
                    {loginError && <label htmlFor="login" style={{color: 'red', fontSize: 14, alignSelf: 'flex-start', marginLeft: 10}}>{loginError}</label>}
                    <input 
                        type="text" 
                        id="login" 
                        placeholder="Enter your login" 
                        className="input-field" 
                        value={login} 
                        onChange={e => setLogin(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                    {passwordError && <label htmlFor="password" style={{color: 'red', fontSize: 14, alignSelf: 'flex-start', marginLeft: 10}}>Password is not valid</label>}
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        className="input-field"
                        onChange={e => validateAndSet(e)} 
                    />
                </div>
                <button className="Signup-button" onClick={() => handleSignup()}>Sign up</button>
            </div>
        </div>
    );
};

export default Signup;
