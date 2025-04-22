import React, { useState, useEffect } from 'react';
import './SliderEvent.css';
import image1 from '../../images/cat.jpeg';
import image2 from '../../images/taylor-swift-in-blue-wallpaper-1920x600_57.jpg';
import image3 from '../../images/Taylor.jpeg';
import { PopupParty } from '../../components/PopupForParty/PopupforParty';

const images = [
  image1,
  image2,
  image3
];

const SliderEvent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="slider__event">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slider__event-slide ${index === currentIndex ? 'slider__event-slide--active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="slider__event-overlay"></div>
          <div className="slider__event-content">
            <p className='slider__event-sity'>г. Кемерово</p>
            <h1 className='slider__event-title'>Соревнования по скейтбордингу</h1>
            <button className="slider__event-button" onClick={handleButtonClick}>Участвовать</button>
          </div>
        </div>
      ))}
      <PopupParty isOpen={popupOpen} closePopup={closePopup} />
    </div>
  );
};

export default SliderEvent;
