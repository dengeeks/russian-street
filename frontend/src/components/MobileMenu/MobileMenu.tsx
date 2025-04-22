import React, { FC, useState } from 'react';
import { MobileMenuProps } from './MobileMenuProps';
import BurgerButton from '../../UI/BurgerButton/BurgerButton';
import './MobileMenu.css';
import { Menu } from '../Menu/Menu';

export const MobileMenu: FC<MobileMenuProps> = ({ isOpen, toggleOpenMenu }) => {

const openClass = isOpen ? 'mobile-menu__navigation_open' : '';

	return <>
		<BurgerButton openMenu = {isOpen} onClick={toggleOpenMenu} />
		<div className='mobile-menu'>
		{isOpen && <div className='mobile-menu__overlay' onClick={toggleOpenMenu}></div>}
		<div className={`mobile-menu__navigation ${openClass}`}>
			<Menu toggleOpenMenu={toggleOpenMenu}/>
		</div>
	</div>
	</>
};