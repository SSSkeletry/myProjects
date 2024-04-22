import React, { useEffect } from 'react';
import '../style/taxi.css';
import { initMap } from '../script/googleMaps.js';
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const Taxi = () => {
    useEffect(() => {
        const openPopupButton = document.querySelector('.main-text button');
        const closePopupButton = document.querySelector('.popup-close');
        const popup = document.getElementById('popup');
        const popupCont = popup.querySelector('.popup-cont');
        const popupArea = document.querySelector('.popup-area');
        
       // Функція відкриття спливаючого вікна
        function openPopup() {
            document.body.classList.add('no-scroll');
            popup.style.visibility = 'visible';
            popup.style.opacity = '1';
            popupCont.style.opacity = '1';
        }

        // Функція закриття спливаючого вікна
        function closePopup() {
            document.body.classList.remove('no-scroll');
            popup.style.opacity = '0';
            popupCont.style.opacity = '0';
            setTimeout(function () {
                popup.style.visibility = 'hidden';
            }, 500);
        }

        openPopupButton.addEventListener('click', openPopup);
        closePopupButton.addEventListener('click', closePopup);

       // Кнопка обробника для сірої області, щоб закрити спливаюче вікно
        popupArea.addEventListener('click', function (event) {
            if (event.target === popupArea) {
                closePopup();
            }
        });

        var menuButton = document.getElementById('menu-button');
        var navigation = document.getElementById('navigation');

        // Обробник події прокрутки
        window.onscroll = function () {
            if (window.scrollY > 1) {
                menuButton.classList.add('move-left');
                navigation.classList.add('hide');
            } else {
                menuButton.classList.remove('move-left');
                navigation.classList.remove('hide');
            }
        };

        // Динамічне завантаження та ініціалізація Google Maps після завантаження компонента
        const loadGoogleMapsScript = () => {
            const googleMapsScript = document.createElement('script');
            googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
            googleMapsScript.async = true;
            googleMapsScript.defer = true;
            googleMapsScript.onload = initializeMap;
            document.head.appendChild(googleMapsScript);
        };

        const initializeMap = () => {
            const google = window.google;
            if (google) {
                initMap(google);
            } else {
                console.error('Апі не завантажено');
            }
        };

        loadGoogleMapsScript();
    }, []);

    return (
        <>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap" rel="stylesheet"/>
                <section className="main" style={{ width: '100%', height: '100vh' }}>
                <div className="main-text">
                    <h1>Служба Таксі</h1>
                    <button id="openPopupButton"><span>Замовити таксі</span></button>
                    <h2>Швидко, надійно та за вигідною ціною! Ваш комфорт – наша турбота. Не змушуйте себе чекати, дозвольте нам доставити вас туди, куди потрібно.</h2>
                </div>
                <div id="popup" className="popup">
                    <a href="#header" className="popup-area"></a>
                    <div className="popup-body">
                        <div id="map" style={{ height: "30.7vw", width: "25%" }}></div>
                        <div className="popup-cont">
                            <a href="#header" className="popup-close">X</a>
                            <h1 className="order-header">Замовлення таксі</h1>
                            <div className="order-data">
                                <div className="label-box">
                                    <input type="number" id="number" required />
                                    <label htmlFor="number">Введіть номер телефону</label>
                                </div>
                                <div className="label-box">
                                    <input id="loc" required />
                                    <label htmlFor="loc">Місцезнаходження</label>
                                </div>
                                <div className="label-box">
                                    <input id="arrival" required />
                                    <label htmlFor="arrival">Місцеприбуття</label>
                                </div>
                                <div className="label-box">
                                    <input id="comment" required />
                                    <label htmlFor="comment">Коментарі для таксиста</label>
                                </div>
                                <div>
                                    <button id="submit">Підтвердити</button>
                                </div>
                                <div id="shadow"></div>
                                <div id="notfill"><i className='bx bxs-x-circle'></i>Будь ласка, заповніть усі поля!</div>
                                <div id="filled">Дякую що обрали нас! Очікуйте дзвінка! </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="content">
                <h1>Welcome!</h1>
                <p>This is some content in the new block below the full-screen background.</p>
            </div>
        </>
    );
};

export default Taxi;