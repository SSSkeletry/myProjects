import React, { useState,useContext } from 'react';
import { Context } from '..';
import '../style/auth.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE,TAXI_ROUTE } from '../utils/consts';
import {login, registration } from '../http/userApi';
import { observer } from 'mobx-react-lite';

const Login = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const {user} = useContext(Context);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const clickAuth = async () => {
        try {
            let data;
            if (!email || !password) {
                alert('Будь ласка, введіть email і пароль');
                return;
            }
            if (isLogin) {
                data = await login(email, password);
            } else {
                const parts = fullName.trim().split(' ');
                if (parts.length < 2) {
                    alert('Будь ласка введіть імя та прізвище');
                    return;
                }
                const [lastName, firstName] = parts;
                data = await registration(email, phone, password, firstName, lastName);
            }
                user.setUser(data.user);
                user.setIsAuth(true);
                navigate(TAXI_ROUTE)
        } catch (e) {
            alert(e.response.data.message);
        }
    }
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
 
    return (
        <div className="auth">
            <div className="input-container">
                <h1>{isLogin ? 'Авторизація' : 'Реєстрація'}</h1>
                <input
                    type="text"
                    className="round-input"
                    placeholder={isLogin ? 'Пошта або номер' : 'Пошта'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {location.pathname === REGISTRATION_ROUTE && (
                     <>
                     <input
                         type="text"
                         className="round-input"
                         placeholder="Номер"
                         value={phone}
                         onChange={e => setPhone(e.target.value)}
                     />
                     <input
                         type="text"
                         className="round-input"
                         placeholder="Прізвище та ім'я"
                         value={fullName}
                         onChange={e => setFullName(e.target.value)}
                     />
                 </>
                    
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
                    <button type="submit" className={isLogin ? "round-button button-left" : "round-button button-left-reg"} onClick={clickAuth}>
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
});

export default Login;