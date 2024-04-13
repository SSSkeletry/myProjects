import React, { useContext } from 'react';
import { Context } from '..';

const NavigationBar = () => {
    const {user} = useContext(Context);
    return (
        <div>
            <a href="#home">Главная</a>
            <a href="#about">О нас</a>
            <a href="#services">Услуги</a>
            <a href="#contact">Контакты</a>
            <a href="#book">Забронировать</a>
        </div>
    )
}

export default NavigationBar