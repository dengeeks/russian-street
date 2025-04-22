import React, { useState, useEffect } from 'react';
import './Header.css';
import { Menu } from '../Menu/Menu';
import logo from './images/logo-07.svg';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { Popuplogin } from '../PopupLogin/Popuplogin';

export function Header() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [openMenu, setOpenMenu] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleOpenMenu = () => {
    if (screenWidth <= 768) {
      setOpenMenu(!openMenu);
      if (!openMenu) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    }
  };

  const openLoginPopup = () => {
    setIsPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const handleResize = (event: any) => {
      setScreenWidth(event.target.innerWidth);
      if (screenWidth > 768) {
        setOpenMenu(false);
        document.body.classList.remove('no-scroll');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  return (
    <>
      <header className='header'>
        <div className='header__content'>
        <a href="https://streetsrussia.sytes.net/">
            <img className='header__logo' src={logo} alt="Logo"/>
          </a>
          {screenWidth > 768 ? (
            <Menu openLoginPopup={openLoginPopup} />
          ) : (
            <MobileMenu isOpen={openMenu} toggleOpenMenu={toggleOpenMenu} />
          )}
        </div>
      </header>
      <Popuplogin isOpen={isPopupOpen} closePopup={closeLoginPopup} />
    </>
  );
}
