import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Popuplogin.css';
import ClosePopupBtn from '../../images/closepopupbtn.svg';
import ShowPasswordIcon from '../../images/show_password.svg';
import HidePasswordIcon from '../../images/hide_password.svg';
import { postLogin } from '../../utils/LogRegApi/LogRegapi';
import { Regpopup } from '../PopupReg/Popupreg';

interface PopuploginProps {
  closePopup: () => void;
  isOpen: boolean;
}

export function Popuplogin({ closePopup, isOpen }: PopuploginProps) {
  const [passwordType, setPasswordType] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('Escape key pressed, closing popup');
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closePopup]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log('Overlay clicked, closing popup');
      closePopup();
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (e.target.value === '') {
      setUsernameError(false);
    }
    setIsButtonActive(e.target.value !== '' && password !== '');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === '') {
      setPasswordError(false);
    }
    setIsButtonActive(username !== '' && e.target.value !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting login form');
    try {
      const result = await postLogin(username, password);
      console.log('Login result:', result);

      if (result.token) {
        console.log('Login successful, token:', result.token);
        closePopup(); // Закрываем попап
        navigate('/personal'); // Перенаправляем на страницу профиля
      } else {
        setUsernameError(true);
        setPasswordError(true);
        setErrorMessage(result.message || result.non_field_errors?.join(', ') || 'Login or password is incorrect');
      }
    } catch (err) {
      setUsernameError(true);
      setPasswordError(true);
      setErrorMessage(err instanceof Error ? err.message : 'Login or password is incorrect');
    }
  };

  const openRegPopup = () => {
    setIsRegPopupOpen(true);
    closePopup();
  };

  const closeRegPopup = () => {
    setIsRegPopupOpen(false);
  };

  useEffect(() => {
    // console.log('Popuplogin rendered, isOpen:', isOpen);
  }, [isOpen]);

  return (
    <>
      <div className={`PopuploginOverlay ${isOpen ? 'active' : ''}`} onClick={handleOverlayClick}>
        <div className='PopuploginContainer'>
          <div className='PopuploginPopup'>
            <button className='PopuploginClose' onClick={closePopup}>
              <img src={ClosePopupBtn} alt='Close' />
            </button>
            <form className='PopuploginForm' onSubmit={handleSubmit}>
              <p className='PopuploginTitle'>Введите логин и пароль</p>
              <label htmlFor='username' className='PopuploginLabel'>Логин</label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='user123'
                className={`PopuploginInput ${usernameError ? 'input-error' : ''}`}
                value={username}
                onChange={handleUsernameChange}
              />
              <small className={`PopuploginSmall ${usernameError ? 'error-message' : ''}`}>
                {usernameError ? errorMessage : 'Можно изменить в личном кабинете'}
              </small>
              <label htmlFor='password' className='PopuploginLabel'>Пароль</label>
              <div className='PopuploginPasswordWrapper'>
                <input
                  type={passwordType}
                  id='password'
                  name='password'
                  className={`PopuploginInput ${passwordError ? 'input-error' : ''}`}
                  placeholder='******'
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button type='button' className='PopuploginTogglePassword' onClick={togglePasswordVisibility}>
                  <img src={passwordType === 'password' ? ShowPasswordIcon : HidePasswordIcon} alt='Toggle Password Visibility' />
                </button>
              </div>
              <small className={`PopuploginSmall ${passwordError ? 'error-message' : ''}`}>
                {passwordError ? errorMessage : 'Можно изменить в личном кабинете'}
              </small>
              <div className='PopuploginButtons'>
                <button type='submit' className='PopuploginLoginButton' disabled={!isButtonActive}>ВОЙТИ</button>
                <button type='button' className='PopuploginRegisterButton' onClick={openRegPopup}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
              </div>
              <a href='#' className='PopuploginForgotPassword'>Забыли пароль?</a>
            </form>
          </div>
        </div>
      </div>
      <Regpopup isOpen={isRegPopupOpen} closePopup={closeRegPopup} openLoginPopup={() => setIsRegPopupOpen(false)} />
    </>
  );
}
