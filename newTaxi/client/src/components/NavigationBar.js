import React, { useContext, useState, useEffect } from 'react';
import { Context } from '..';
import '../style/navbar.css';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const NavigationBar = observer(() => {
    const { user, taxi, dispatcher } = useContext(Context);
    const navigate = useNavigate();
    const [isMiniNavbarVisible, setMiniNavbarVisible] = useState(false);
    const [isNavbarHidden, setNavbarHidden] = useState(false);

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

    const handleMenuButtonClick = () => {
        if (!isNavbarHidden) {
            navigate('/');
        } else {
            setMiniNavbarVisible(!isMiniNavbarVisible);
        }
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setNavbarHidden(true);
        } else {
            setNavbarHidden(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        user.isAuth ? (
            <div>
                <div
                    id="menu-button"
                    className="menu-button"
                    onClick={handleMenuButtonClick}
                >
                    ☰
                </div>
                <div className={`mini-navbar ${isMiniNavbarVisible && isNavbarHidden ? 'show' : ''}`}>
                    {taxi.isDriver() ? (
                        <>
                            <div className="nav-item"><a href="/driver">Таксувати</a></div>
                        </>
                    ) : dispatcher.isDispatcher() ? (
                        <>
                            <div className="nav-item"><a href="/dispatcher">Почати роботу</a></div>
                            <div className="nav-item"><a href="/order">Замовлення</a></div>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                    <div className="nav-item"><a href="/contact">Контакти</a></div>
                    <div className="nav-item"><a href="/profile">Профіль</a></div>
                    <div className="nav-item" onClick={logOut}>
                        <a className="link-button">Вийти</a>
                    </div>
                </div>
                <nav id="navigation" className={`navigation ${isMiniNavbarVisible || isNavbarHidden ? 'hide' : ''}`}>
                    <ul className="nav-list">
                        {taxi.isDriver() ? (
                            <>
                                <li className="nav-item"><a href="/driver">Таксувати</a></li>
                            </>
                        ) : dispatcher.isDispatcher() ? (
                            <>
                                <li className="nav-item"><a href="/dispatcher">Почати роботу</a></li>
                                <li className="nav-item"><a href="/order">Замовлення</a></li>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        <li className="nav-item"><a href="/contact">Контакти</a></li>
                        <li className="nav-item"><a href="/profile">Профіль</a></li>
                        <li className="nav-item" onClick={logOut}>
                            <a className="link-button">Вийти</a>
                        </li>
                    </ul>
                </nav>
            </div>
        ) : (
            <div>
                <div
                    id="menu-button"
                    className="menu-button"
                    onClick={handleMenuButtonClick}
                >
                    ☰
                </div>
                <div className={`mini-navbar ${isMiniNavbarVisible && isNavbarHidden ? 'show' : ''}`}>
                    <div className="nav-item"><a href="/contact">Контакти</a></div>
                    <div className="nav-item" onClick={handleLoginNavigation}>
                        <a className="link-button">Авторизація</a>
                    </div>
                </div>
                <nav id="navigation" className={`navigation ${isMiniNavbarVisible || isNavbarHidden ? 'hide' : ''}`}>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/contact">Контакти</a></li>
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
