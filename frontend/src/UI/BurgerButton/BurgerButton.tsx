import React, { useState } from 'react';
import './BurgerButton.css';
import { BurgerButtonProps } from './BurgerButtonProps';

function BurgerButton({ openMenu, onClick } : BurgerButtonProps) {

  return (
    <button
    className={`burger-button ${openMenu ? 'burger-button_oppened' : ''}`}
    onClick={onClick}
    >
    </button>
  );
}

export default BurgerButton;