import React from 'react';
import './Menu.css';
import { Link, useNavigate } from 'react-router-dom';
import { menuProps } from './MenuProps';

export function Menu({ toggleOpenMenu, openLoginPopup, type }: menuProps) {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/personal'); // Перенаправляем в личный кабинет
    } else {
      if (openLoginPopup) {
        openLoginPopup(); // Открываем попап с логином
      }
    }
  };

  if (type === 'footer') {
    return (
      <nav className={`menu menu_type_footer`}>
        <Link to='/' className='menu__link menu__link_type_footer'>Главная</Link>
        <Link to='/about-us' className='menu__link menu__link_type_footer'>О нас</Link>
        <Link to='/events' className='menu__link menu__link_type_footer'>Мероприятия</Link>
        <Link to='/directions' className='menu__link menu__link_type_footer'>Направления</Link>
        <Link to='/blog' className='menu__link menu__link_type_footer'>Блог</Link>
        <Link to='/contacts' className='menu__link menu__link_type_footer'>Контакты</Link>
      </nav>
    );
  } else {
    return (
      <>
        <nav className={`menu`}>
          <Link to='/' className='menu__link' onClick={toggleOpenMenu}>Главная</Link>
          <Link to='/about-us' className='menu__link' onClick={toggleOpenMenu}>О нас</Link>
          <Link to='/events' className='menu__link' onClick={toggleOpenMenu}>Мероприятия</Link>
          <Link to='/directions' className='menu__link' onClick={toggleOpenMenu}>Направления</Link>
          <Link to='/blog' className='menu__link' onClick={toggleOpenMenu}>Блог</Link>
          <Link to='/contacts' className='menu__link' onClick={toggleOpenMenu}>Контакты</Link>
          <div className='menu__link menu__link_acc-logo' onClick={handleAvatarClick}></div>
        </nav>
      </>
    );
  }
}
