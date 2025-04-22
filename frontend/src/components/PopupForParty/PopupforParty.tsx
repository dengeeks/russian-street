import React, { useState, useEffect, useCallback } from 'react';
import './PopupforParty.css';
import img from '../../images/Rectangle21.png';
import ClosePopupBtn from '../../images/closepopupbtn.svg';
import { Link, useNavigate } from 'react-router-dom';

interface PopupPartyProps {
  isOpen: boolean;
  closePopup: () => void;
}

export function PopupParty({ isOpen, closePopup }: PopupPartyProps) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  useEffect(() => {
    if (name !== '') {
      setNameError(!/^[а-яА-ЯЁё\s]+$/.test(name));
    } else {
      setNameError(false);
    }
  }, [name]);

  useEffect(() => {
    let numberToCheck = phoneNumber.replace("+7", "");
    if (phoneNumber !== '') {
      setPhoneNumberError(!/^\d{10}$/.test(numberToCheck));
    } else {
      setPhoneNumberError(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    setIsFormValid(!nameError && !phoneNumberError && name !== '' && phoneNumber !== '');
  }, [name, phoneNumber, nameError, phoneNumberError]);

  const handlePhoneNumberFocus = () => {
    if (!phoneNumber.startsWith("+7")) {
      setPhoneNumber("+7" + phoneNumber);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName('');
    setPhoneNumber('');
    setRegistrationSuccess(true);
    setShowSuccessMessage(true);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closePopup();
    }
    if (event.key === 'Enter') {
      if (showSuccessMessage) {
        navigate('/');
      } else if (isFormValid) {
        handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  }, [isFormValid, showSuccessMessage, navigate, closePopup]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <div className={`popup-overlay ${isOpen ? 'active' : ''}`} onClick={closePopup}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <img src={ClosePopupBtn} className="popup__close-btn" alt="Close" onClick={closePopup} />
        <div className="popup__content">
          <div className="popup__image-wrapper">
            <img src={img} alt="Event" className="popup__image" />
          </div>
          {showSuccessMessage ? (
            <div className="success-message-block">
              <p className="success-message">Регистрация прошла успешно!</p>
              <Link to="/" className="home-button">На главную</Link>
            </div>
          ) : (
            <div className="popup__form-wrapper">
              <p>Представьтесь, пожалуйста</p>
              <form className="popup__form" onSubmit={handleSubmit}>
                <label>
                  <input
                    type="text"
                    placeholder="Иванов Иван Иванович"
                    value={name}
                    onChange={handleNameChange}
                    required
                    className={nameError ? 'input-error' : ''}
                  />
                  <small className={nameError ? 'error-message' : ''}>
                    {nameError ? 'Допущена ошибка в ФИО' : 'Только на кириллице'}
                  </small>
                </label>
                <label>
                  <p>Номер телефона</p>
                  <input
                    type="tel"
                    placeholder="+7 923 567-89-90"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    onFocus={handlePhoneNumberFocus}
                    required
                    className={phoneNumberError ? 'input-error' : ''}
                  />
                  <small className={phoneNumberError ? 'error-message' : ''}>
                    {phoneNumberError ? 'Неправильный формат номера' : 'Только номера РФ'}
                  </small>
                </label>
                <button type="submit" className="popup__submit-btn" disabled={!isFormValid}>Участвовать</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
