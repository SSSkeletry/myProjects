import React, { useEffect, useState } from 'react';
import '../style/taxi.css';
import { initMap } from '../script/googleMaps.js';
import { create, getData } from '../http/userApi';
import { observer } from 'mobx-react-lite';

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Taxi = observer(() => {
    const [phone, setPhone] = useState('');
    const [startPlace, setStartPlace] = useState('');
    const [endPlace, setEndPlace] = useState('');
    const [comment, setComment] = useState('');
    const [showNotFilledMessage, setShowNotFilledMessage] = useState(false);
    const [showFilledMessage, setShowFilledMessage] = useState(false);

    const handleOrderSubmit = async () => {
        if (!startPlace || !endPlace) {
            setShowNotFilledMessage(true);
            setShowFilledMessage(false);
            setTimeout(() => setShowNotFilledMessage(false), 3000);
            return;
        }
        try {
            const order = await create(phone, startPlace, endPlace, comment);
            console.log('Поїздка створена:', order);
            setShowFilledMessage(true);
            setShowNotFilledMessage(false);
            setTimeout(() => setShowFilledMessage(false), 5000);
        } catch (error) {
            console.error('Помилка створення:', error);
            setShowNotFilledMessage(true);
            setShowFilledMessage(false);
            setTimeout(() => setShowNotFilledMessage(false), 3000);
        }
    };
    

    const fetchPhoneNumber = async () => {
        try {
            const phone = await getData();
            if (phone) {
                setPhone(parseInt(phone));
            }
        } catch (error) {
            console.error('Помилка отримання номера телефону:', error);
        }
    };

    useEffect(() => {
        const openPopupButton = document.querySelector('.main-text button');
        const closePopupButton = document.querySelector('.popup-close');
        const popup = document.getElementById('popup');
        const popupCont = popup.querySelector('.popup-cont');
        const popupArea = document.querySelector('.popup-area');

        function openPopup() {
            document.body.classList.add('no-scroll');
            popup.style.visibility = 'visible';
            popup.style.opacity = '1';
            popupCont.style.opacity = '1';
        }

        function closePopup() {
            document.body.classList.remove('no-scroll');
            popup.style.opacity = '0';
            popupCont.style.opacity = '0';
            setTimeout(() => {
                popup.style.visibility = 'hidden';
            }, 500);
        }

        openPopupButton.addEventListener('click', openPopup);
        closePopupButton.addEventListener('click', closePopup);

        popupArea.addEventListener('click', function(event) {
            if (event.target === popupArea) {
                closePopup();
            }
        });

        var menuButton = document.getElementById('menu-button');
        var navigation = document.getElementById('navigation');

        window.onscroll = function() {
            if (window.scrollY > 1) {
                menuButton.classList.add('move-left');
                navigation.classList.add('hide');
            } else {
                menuButton.classList.remove('move-left');
                navigation.classList.remove('hide');
            }
        };

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
                initMap(google, setStartPlace, setEndPlace);
            } else {
                console.error('API не завантажено');
            }
        };

        fetchPhoneNumber();
        loadGoogleMapsScript();
    }, []);

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap" rel="stylesheet" />
            <section className="main" style={{ width: '100%', height: '100vh' }}>
                <div className="main-text">
                    <h1>Служба Таксі</h1>
                    <button id="openPopupButton"><span>Замовити таксі</span></button>
                    <h2>Швидко, надійно та за вигідною ціною! Ваш комфорт – наша турбота. Не змушуйте себе чекати, дозвольте нам доставити вас туди, куди потрібно.</h2>
                </div>
                <div id="popup" className="popup">
                    <a href="#header" className="popup-area" aria-label="Close popup"></a>
                    <div className="popup-body">
                        <div id="map" style={{ height: "30.7vw", width: "25%" }}></div>
                        <div className="popup-cont">
                            <a href="#header" className="popup-close">X</a>
                            <h1 className="order-header">Замовлення таксі</h1>
                            <div className="order-data">
                                <div className="label-box">
                                    <input type="number" id="number" value={phone} onChange={e => setPhone(e.target.value)} required />
                                    <label htmlFor="number">Введіть номер телефону</label>
                                </div>
                                <div className="label-box">
                                    <input id="loc" value={startPlace} onChange={e => setStartPlace(e.target.value)} required />
                                    <label htmlFor="loc">Місцезнаходження</label>
                                </div>
                                <div className="label-box">
                                    <input id="arrival" value={endPlace} onChange={e => setEndPlace(e.target.value)} required />
                                    <label htmlFor="arrival">Місцеприбуття</label>
                                </div>
                                <div className="label-box">
                                    <input id="comment" value={comment} onChange={e => setComment(e.target.value)} required />
                                    <label htmlFor="comment">Коментарі для таксиста</label>
                                </div>
                                <div>
                                    <button id="submit" className='popup-button' onClick={handleOrderSubmit}>Підтвердити</button>
                                </div>
                                {(showNotFilledMessage || showFilledMessage) && (
                                    <div id="shadow" className="visible"></div>
                                )}
                                {showNotFilledMessage && (
                                    <div id="notfill" className="visible">
                                        <i className='bx bxs-x-circle'></i>Будь ласка, заповніть усі поля!
                                    </div>
                                )}
                                {showFilledMessage && (
                                    <div id="filled" className="visible">
                                        Дякую що обрали нас! Очікуйте дзвінка!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
});

export default Taxi;
