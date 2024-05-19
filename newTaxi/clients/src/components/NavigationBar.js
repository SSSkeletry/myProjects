import React, { useContext } from 'react';
import { Context } from '..';
import '../style/navbar.css';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const NavigationBar = observer(() => {
    const { user, taxi, dispatcher } = useContext(Context);
    const navigate = useNavigate(); 
    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        taxi.setDriver({});
        taxi.setIsAvailable(false);
        dispatcher.setDispatcher({});
        dispatcher.setIsAvailable(false);
        window.location.reload();
    };
    const handleLoginNavigation = () => {
        navigate('/login'); 
    };
    return (
        user.isAuth ? (
            <div>
                <div id="menu-button" className="menu-button">☰</div>
                <nav id="navigation" className="navigation">
                    <ul className="nav-list">
                        {/* Перевіряємо роль та виводимо відповідні пункти меню */}
                        {taxi.isDriver() ? (
                            <>
                                <li className="nav-item"><a href="/driver">Таксувати</a></li>
                                <li className="nav-item"><a href="/management">Management</a></li>
                            </>
                        ) : dispatcher.isDispatcher() ? (
                            <>
                                <li className="nav-item"><a href="/dispatcher">Почати роботу</a></li>
                                <li className="nav-item"><a href="/manageDrivers">Замовлення</a></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><a href="/settings">Settings</a></li>
                            </>
                        )}
                         <li className="nav-item"><a href="/contact">Contact</a></li>
                        <li className="nav-item"><a href="/profile">Профіль</a></li>

                        <li className="nav-item" onClick={logOut}>
                            <a className="link-button">Вийти</a>
                        </li>
                    </ul>
                </nav>
            </div>
        ) : (
            <div>
                <div id="menu-button" className="menu-button">☰</div>
                <nav id="navigation" className="navigation">
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/design">Design</a></li>
                        <li className="nav-item"><a href="/company">Company</a></li>
                        <li className="nav-item"><a href="/contact">Contact</a></li>
                        <li className="nav-item" onClick={handleLoginNavigation}>
                            <a className="link-button">Авторизація</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    );
});

export default NavigationBar;
