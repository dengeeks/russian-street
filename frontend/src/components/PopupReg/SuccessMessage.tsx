import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessMessage.css';
import ClosePopupBtn from '../../images/closepopupbtn.svg';
import { Popuplogin } from '../PopupLogin/Popuplogin';

interface SuccessMessageProps {
  onLoginClick: () => void;
  onHomeClick: () => void;
  isOpen: boolean;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onLoginClick, onHomeClick, isOpen }) => {
  const navigate = useNavigate();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  if (!isOpen) return null;

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
    onLoginClick();
  };

  const handleHomeClick = () => {
    onHomeClick();
    navigate('/');
  };

  return (
    <>
      <div className={`SuccessMessage__overlay ${isOpen ? 'SuccessMessage__overlay_active' : ''}`}>
        <div className="SuccessMessage">
          <h2>Спасибо! Мы получили ваши данные и уже начали обработку :)</h2>
          <p>После модерации вашей заявки на вашу почту придёт письмо с логином и паролем</p>
          <div className="SuccessMessage__buttons">
            <button onClick={handleLoginClick} className="SuccessMessage__button">ВОЙТИ</button>
            <button onClick={handleHomeClick} className="SuccessMessage__button">НА ГЛАВНУЮ</button>
          </div>
          <p className="SuccessMessage__support">Если вы не получили письмо свяжитесь со службой поддержки support@mail.ru.</p>
          <button onClick={onHomeClick} className="SuccessMessage__close-button">
            <img src={ClosePopupBtn} alt='Close' />
          </button>
        </div>
      </div>
      <Popuplogin isOpen={isLoginPopupOpen} closePopup={() => setIsLoginPopupOpen(false)} />
    </>
  );
};
