import React, { useEffect, useState, useRef } from 'react';
import '../style/driver-block.css';
import taxopark from '../assets/taxopark.png';
import beDriver from '../assets/beDriver.png';
import bonuses from '../assets/bonuses.png';
import grafick from '../assets/grafick.png';
import support from '../assets/support.png';
import taxist from '../assets/taxist.png';
import CircleType from 'circletype';
import { registration } from '../http/driverApi';

const DriverBlock = () => {
  const [isExtended, setIsExtended] = useState(false);
  const [file, setFile] = useState({ name: '', preview: null });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [formData, setFormData] = useState({
    driverName: '',
    email: '',
    phone: '',
    password: '',
    numberCar: '',
    nameCar: '',
    classCar: ''
  });

  const blocksRef = useRef([useRef(null), useRef(null), useRef(null), useRef(null)]);
  const stopButton = useRef(null);
  const regPopup = useRef(null);
  const overlayTextRef = useRef(null);

  const switchPlaces = (block1, block2) => {
    const blockWidth = block1.current.offsetWidth;
    const transform1 = block1.current.style.transform;
    const transform2 = block2.current.style.transform;

    block1.current.style.transform = transform2 === '' ? `translateX(${blockWidth}px)` : '';
    block2.current.style.transform = transform1 === '' ? `translateX(-${blockWidth}px)` : '';
  };

  const handleToggleExtend = () => {
    setIsExtended(!isExtended);
  };

  const handleStopButtonClick = () => {
    stopButton.current.classList.toggle('active');
    switchPlaces(blocksRef.current[0], blocksRef.current[1]);
    switchPlaces(blocksRef.current[2], blocksRef.current[3]);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile({ name: file.name, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileNameClick = () => {
    setIsFullscreen(true);
  };

  const handleOverlayClick = () => {
    setIsFullscreen(false);
  };

  const handleRegisterClick = () => {
    document.body.classList.add('no-scroll');
    regPopup.current.style.visibility = 'visible';
    regPopup.current.style.opacity = '1';
  };

  const handleCloseClick = () => {
    document.body.classList.remove('no-scroll');
    regPopup.current.style.opacity = '0';
    setTimeout(() => {
      regPopup.current.style.visibility = 'hidden';
    }, 500);
  };
const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleRegisterSubmit = async () => {
    try {
        const { email, phone, password, driverName, numberCar, nameCar, classCar } = formData;
        const [firstName, lastName] = driverName.split(' ');
        const img = file.name; // Изображение автомобиля
        console.log(formData); // Логируем данные формы
        await registration(email, phone, password, firstName, lastName, numberCar, nameCar, classCar, img);
        handleCloseClick();
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
    }
};

  useEffect(() => {
    if (overlayTextRef.current) {
      const circleType = new CircleType(overlayTextRef.current);
      circleType.radius(165).dir(-1);
    }
  }, []);

  const handleButtonClick = (event) => {
    event.currentTarget.classList.toggle('clicked');
    handleToggleExtend();
  };

  return (
    <div className="containerDriver">
      <div className="block block-edge" id="left1" ref={blocksRef.current[0]}>
        <div className="text-wrapper">
          <img src={taxopark} alt='Таксопарк'/>
          <div className="overlay-taxopark scale-hover-effect">Таксопарк</div>
          <div className="below-taxopark">Сучасний автопарк - комфорт у кожній поїздці!</div>
        </div>
      </div>
      <div className="block" id="left2" ref={blocksRef.current[1]}>
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
          <a href="#header" className="popup-area" onClick={handleCloseClick} aria-label="Close popup"></a>
            <div className="popup-body">
              <div className="popup-content">
                <a href="#header" className="close" onClick={handleCloseClick}>X</a>
                <h1 className="reg-order-header"><span>Стати</span><img src={taxist} alt='Таксист' /><span>водієм</span></h1>
                <div className="order-data">
                  <div className="label-box reg-label-box">
                    <input type="text" id="driverName" onChange={handleInputChange} required />
                    <label htmlFor="driverName">Ім'я та прізвище</label>
                  </div>
                  <div className="label-box reg-label-box">
                    <input type="text" id="email" onChange={handleInputChange} required />
                    <label htmlFor="email">Пошта</label>
                  </div>
                  <div className="label-box reg-label-box">
                    <input type="tel" id="phone" onChange={handleInputChange} required />
                    <label htmlFor="phone">Телефон</label>
                  </div>
                  <div className="label-box reg-label-box">
                    <input type="tel" id="password" onChange={handleInputChange} required />
                    <label htmlFor="password">Пароль</label>
                  </div>
                  <button className="extend-button" onClick={handleButtonClick}>
                    <span>{isExtended ? 'Згорнути' : 'Автомобіль'}</span>
                  </button>
                  {isExtended && (
                    <>
                      <div className="label-box reg-label-box">
                        <input type="text" id="numberCar" onChange={handleInputChange} required />
                        <label htmlFor="numberCar">Номер автомобіля</label>
                      </div>
                      <div className="label-box reg-label-box">
                        <input type="text" id="nameCar" onChange={handleInputChange} required />
                        <label htmlFor="nameCar">Назва автомобіля</label>
                      </div>
                      <div className="label-box reg-label-box">
                        <input type="text" id="classCar" onChange={handleInputChange} required />
                        <label htmlFor="classCar">Класс автомобіля</label>
                      </div>
                      <div className="label-box reg-label-box">
                        <input
                          type="file"
                          id="photoCarInput"
                          className="photo-upload-input"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <input
                          type="text"
                          id="photoCar"
                          value={file.name}
                          onClick={() => document.getElementById('photoCarInput').click()}
                          placeholder="Оберіть фото автомобіля"
                          readOnly
                          required
                        />
                        <button 
                          type="button" 
                          className="file-input-button" 
                          onClick={handleFileNameClick}
                        >
                          👁️
                        </button>
                      </div>
                      {file.preview && (
                        <div
                          className={`fullscreen-overlay ${isFullscreen ? 'visible' : ''}`}
                          onClick={handleOverlayClick}
                        >
                          <img
                            src={file.preview}
                            alt="Превью фото"
                            className="fullscreen-img"
                          />
                        </div>
                      )}
                    </>
                  )}
                  <div>
                    <button id="regSubmit" className='popup-button' onClick={handleRegisterSubmit}>Зареєструватися</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="stop-button" id="stopButton" data-front="Посунути" data-back="Повернути" ref={stopButton} onClick={handleStopButtonClick}></button>
        </div>
      </div>
      <div className="block" id="right1" ref={blocksRef.current[2]}>
        <img src={bonuses} alt='Бонуси' />
        <div className="text-wrapper">
          <div className="overlay-text scale-hover-effect" ref={overlayTextRef} data-text="Бонуси для водіїв">Бонуси для водіїв</div>
          <div className="below-image-text">Заробляйте більше з нашою системою заохочень та бонусів!</div>
        </div>
      </div>
      <div className="block block-edge" id="right2" ref={blocksRef.current[3]}>
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