import React, { useState } from 'react';
import '../style/auth.css'; // Ensure the CSS path is correct
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Login = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleAuth = (event) => {
        event.preventDefault();
        console.log(emailOrPhone, password);
        if (isLogin) {
            // Добавьте логику авторизации здесь
        } else {
            // Добавьте логику регистрации здесь
        }
    };

    
    return (
        <div className="auth">
            <div className="input-container">
                <h1>{isLogin ? 'Авторизація' : 'Реєстрація'}</h1>
                <input
                    type="text"
                    className="round-input"
                    placeholder="Пошта або номер"
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                />
                {location.pathname === REGISTRATION_ROUTE && (
                    <input
                        type="text"
                        className="round-input"
                        placeholder="Номер"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                )}
                <input
                    type={showPassword ? "text" : "password"}
                    className="round-input animated-input"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                    <span className="input-group-text" onClick={togglePasswordVisibility}>
                        <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
                    </span>
                </div>
                <div className="button-container">
                    <button type="submit" className={isLogin ? "round-button button-left" : "round-button button-left-reg"} onClick={handleAuth}>
                        {isLogin ? 'Авторизуватися' : 'Зареєструватися'}
                    </button>
                    {isLogin ? (
                        <button className="round-button button-right">
                            <NavLink to={REGISTRATION_ROUTE} style={{ textDecoration: 'none', color: 'inherit' }}>Реєстрація</NavLink>
                        </button>
                    ) : (
                        <button className="round-button button-right-reg">
                            <NavLink to={LOGIN_ROUTE} style={{ textDecoration: 'none', color: 'inherit' }}>Увійти</NavLink>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;