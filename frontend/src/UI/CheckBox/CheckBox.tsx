import React from "react";
import { CheckBoxProps } from "./CheckBoxProps";
import './CheckBox.css';

export function CheckBox({ id, children, theme }: CheckBoxProps) {

    const checkBoxLabelBlack = theme === 'black' ? 'checkBoxLabel_type_black' : '';
    const inputIsBlack = theme === 'black' ? 'form__pseudo-item_type_black' : '';
    const spanIsBlack = theme === 'black' ? 'form__pseudo-item_type_checkbox_type_black' : '';

    return (
      <label htmlFor={id} className={`checkBoxLabel ${checkBoxLabelBlack}`}>
        {children}
        <input className={`form__item form__item_el_extra-options`} type='checkbox' name='extra-option' id={id} value='bold-heading'/>
        <span className={`form__pseudo-item ${inputIsBlack} form__pseudo-item_type_checkbox ${spanIsBlack}`}></span>
      </label>
    );
}