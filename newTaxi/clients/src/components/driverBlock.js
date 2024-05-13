import React, { useEffect } from 'react';
import '../style/driver-block.css';
import taxopark from '../assets/taxopark.png';
import beDriver from '../assets/beDriver.png';
import bonuses from '../assets/bonuses.png';
import grafick from '../assets/grafick.png';
import support from '../assets/support.png';
import CircleType from 'circletype';

function DriverBlock() {
  const left1 = React.useRef(null);
  const left2 = React.useRef(null);
  const right1 = React.useRef(null);
  const right2 = React.useRef(null);
  const stopButton = React.useRef(null);
  const regPopup = React.useRef(null);
  const overlayTextRef = React.useRef(null);

  function switchPlaces(block1, block2) {
    const blockWidth = block1.current.offsetWidth;
    const transform1 = block1.current.style.transform;
    const transform2 = block2.current.style.transform;

    block1.current.style.transform = transform2 === '' ? `translateX(${blockWidth}px)` : '';
    block2.current.style.transform = transform1 === '' ? `translateX(-${blockWidth}px)` : '';
  }

  function handleStopButtonClick() {
    stopButton.current.classList.toggle('active');
    switchPlaces(left1, left2);
    switchPlaces(right1, right2);
  }

  function handleRegisterClick() {
    document.body.classList.add('no-scroll');
    regPopup.current.style.visibility = 'visible';
    regPopup.current.style.opacity = '1';
  }

  function handleCloseClick() {
    document.body.classList.remove('no-scroll');
    regPopup.current.style.opacity = '0';
    setTimeout(() => {
      regPopup.current.style.visibility = 'hidden';
    }, 500);
  }
  useEffect(() => {
    if (overlayTextRef.current) {
      const circleType = new CircleType(overlayTextRef.current);
      circleType.radius(165).dir(-1);
    }
  }, []);
  return (
    <div className="containerDriver">
      <div className="block block-edge" id="left1" ref={left1}>
        <div className="text-wrapper">
          <img src={taxopark} alt='Таксопарк'/>
          <div className="overlay-taxopark scale-hover-effect">Таксопарк</div>
          <div className="below-taxopark">Сучасний автопарк - комфорт у кожній поїздці!</div>
        </div>
      </div>
      <div className="block" id="left2" ref={left2}>
        <div className="text-wrapper">
          <img src={grafick} alt='График' />
          <div className="overlay-schedule">Гнучкий графік</div>
          <div className="below-schedule">Долучайся до команди з гнучким графіком та рухайся в своєму ритмі.</div>
        </div>
      </div>
      <div className="block center">
        <div className="text-wrapper">
          <img src={beDriver} alt='Стати водієм' />
          <button className="reg-button" onClick={handleRegisterClick}>Таксувати</button>
          <div id="regPopup" className="popup" ref={regPopup}>
            <a href="#header" className="popup-area" onClick={handleCloseClick}></a>
            <div className="popup-body">
              <div className="popup-content">
                <a href="#header" className="popup-close" onClick={handleCloseClick}>X</a>
                <h1 className="reg-order-header">Реєстрація водія</h1>
                <div className="order-data">
                  <div className="label-box">
                    <input type="text" id="driverName" required />
                    <label htmlFor="driverName">Ім'я та прізвище</label>
                  </div>
                  <div className="label-box">
                    <input type="email" id="email" required />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="label-box">
                    <input type="tel" id="phone" required />
                    <label htmlFor="phone">Телефон</label>
                  </div>
                  <div className="label-box">
                    <input type="tel" id="password" required />
                    <label htmlFor="password">Пароль</label>
                  </div>
                  <div className="label-box">
                    <input type="tel" id="password" required />
                    <label htmlFor="password">Пароль</label>
                  </div>
                  <div>
                    <button id="regSubmit">Зареєструватися</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="stop-button" id="stopButton" data-front="Посунути" data-back="Повернути" ref={stopButton} onClick={handleStopButtonClick}></button>
        </div>
      </div>
      <div className="block" id="right1" ref={right1}>
        <img src={bonuses} alt='Бонуси' />
        <div className="text-wrapper">
          <div className="overlay-text scale-hover-effect" ref={overlayTextRef} data-text="Бонуси для водіїв">Бонуси для водіїв</div>
          <div className="below-image-text">Заробляйте більше з нашою системою заохочень та бонусів!</div>
        </div>
      </div>
      <div className="block block-edge" id="right2" ref={right2}>
        <img src={support} alt='Підтримка' />
        <div className="text-wrapper">
          <div className="overlay-support scale-hover-effect">Підтримка</div>
          <div className="below-image-support">Завжди на зв'язку. Цілодобова підтримка наших водіїв!</div>
        </div>
      </div>
    </div>
  );
}

export default DriverBlock;