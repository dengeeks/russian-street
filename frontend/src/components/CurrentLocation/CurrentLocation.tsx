import React, { useEffect, useState } from 'react';
import './CurrentLocation.css';
import { useLocation } from 'react-router-dom';

export function CurrentLocation() {

    const location = useLocation();
    
    const [ locationName, setLocationName ] = useState('');

    useEffect(() => {
        location.pathname === ('/') && setLocationName('');
        location.pathname.includes('/about-us') && setLocationName('О нас');
        location.pathname.includes('/events') && setLocationName('Мероприятия');
        location.pathname.includes('/directions') && setLocationName('Направления');
        location.pathname.includes('/blog') && setLocationName('Блог');
        location.pathname.includes('/contacts') && setLocationName('Контакты');
        location.pathname.includes('/SkateboardEventPage') && setLocationName('Соревнования по скейтбордингу');
        location.pathname.includes('/personal') && setLocationName('Профиль');

    }, [location])


  if(location.pathname === '/') {
    return (
      <>
      </>
    )
  } else {
    return (
    <div className='current-location'>
      <p className='current-location__text'>{`Главная / ${locationName}`}</p>
    </div>)
  }
}
