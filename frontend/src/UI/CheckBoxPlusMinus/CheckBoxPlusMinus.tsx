import React from "react";
import { CheckBoxPlusMinusProps } from "./CheckBoxPlusMinusProps";
import './CheckBoxPlusMinus.css';

export function CheckBoxPlusMinus({ id, children, onClick }: CheckBoxPlusMinusProps) {


    return (
      <label htmlFor={id} className="checkBoxLabel" >
        {children}
        <input onClick={onClick} type='checkbox' name='extra-option' id={id} className='form__item form__item_el_extra-options'value='bold-heading'/>
        <span className='form__pseudo-item_type_plus-minus form__pseudo-item_type_plus-minus'></span>
      </label>
    );
}