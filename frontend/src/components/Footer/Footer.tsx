import React from 'react';
import './Footer.css';
import logo from '../../images/Logo.png';
import { Menu } from '../Menu/Menu';
import { Button } from '../../UI/Button/Button';
import { Link } from 'react-router-dom';
import ytlogo from './images/ytlogo.svg';
import telegramLogo from './images/telegram.svg';
import whatsAppLogo from './images/whatsapp.svg';
import boostyLogo from './images/simple-icons_boosty.svg';
import payPalLogo from './images/fontisto_paypal.svg';

export function Footer() {
  return (<footer className='footer'>
    <div className='footer__container'>
      <img src={logo} className='footer__logo'/>
      <div className='footer__container-column'>
          <p className='footer__container-column-title'>Общероссийская общественная организация уличной культуры и спорта «Улицы России»</p>
          <p className='footer__container-column-subtitle'>ОГРН: 1217700519101 ИНН: 2636219592</p>
      </div>
    </div>

    <div className='footer__menu'>

        <Menu type='footer'/>

        <div className='footer__menu-donation'>
          <Button>Поддержать нас</Button>
          <div className='footer__menu-donation-links'>
            <Link to='#'><img src={telegramLogo}/></Link>
            <Link to='#'><img src={boostyLogo}/></Link>
            <Link to='#'><img src={payPalLogo}/></Link>
          </div>
          <p className='footer__menu-support'>Служба поддержки support@mail.ru</p>
          <p className='footer__menu-copyright'>© 2021 - 2024 «Улицы России»</p>
        </div>

        <div className='footer__menu-social-links'>
          <p>Мы в социальных сетях</p>
          <Link to='#'><img src={ytlogo}/></Link>
          <Link to='#'><img src={telegramLogo}/></Link>
          <Link to='#'><img src={whatsAppLogo}/></Link>
        </div>

    </div>
  </footer>)
}
