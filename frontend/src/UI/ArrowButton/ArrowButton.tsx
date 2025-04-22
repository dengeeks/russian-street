import React from "react"
import arrowLeft from '../../images/chevronLeft.svg';
import arrowRigth from '../../images/chevronRight.svg';
import { ArrowButtonProps } from "./ArrowButtonProps";
import './ArrowButton.css';

export function ArrowButton ({ direction, changeDate } : ArrowButtonProps) {

  return (<button className='arrow-button' onClick={changeDate}>
    {direction === 'left' && <img src={arrowLeft}/>}
    {direction === 'right' && <img src={arrowRigth}/>}
  </button>)
}