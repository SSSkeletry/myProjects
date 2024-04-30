import React, { useContext } from 'react';
import { Context } from '..';
import '../style/navbar.css';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const NavigationBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate(); // Hook for navigation

    const handleLoginNavigation = () => {
        navigate('/login'); // Use navigate instead of push
    };
    return (
        user.isAuth ? (
            <div>
                <div id="menu-button" className="menu-button">☰</div>
                <nav id="navigation" className="navigation">
                    <ul className="nav-list">
                        {/* Перевіряємо роль та виводимо відповідні пункти меню */}
                        {user.role === 'dispatcher' ? (
                            <>
                                <li className="nav-item"><a href="#">Диспетчер</a></li>
                                <li className="nav-item"><a href="#">Reports</a></li>
                                <li className="nav-item"><a href="#">Management</a></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><a href="#">Профіль</a></li>
                                <li className="nav-item"><a href="#">Settings</a></li>
                            </>
                        )}
                        <li className="nav-item"><a href="#">Company</a></li>
                        <li className="nav-item"><a href="#">Contact</a></li>
                        <li className="nav-item"><a href="#">Вийти</a></li>
                    </ul>
                </nav>
            </div>
        ) : (
            <div>
                <div id="menu-button" className="menu-button">☰</div>
                <nav id="navigation" className="navigation">
                    <ul className="nav-list">
                        <li className="nav-item"><a>Design</a></li>
                        <li className="nav-item"><a>Company</a></li>
                        <li className="nav-item"><a>Contact</a></li>
                        <li className="nav-item"onClick={handleLoginNavigation}><a>Авторизація</a></li>
                    </ul>
                </nav>
            </div>
        )
    );
})

export default NavigationBar;