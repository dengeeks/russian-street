import React from "react";
import { ButtonProps } from "./ButtonProps";
import './Button.css';

export function Button({ children, type, onClick }: ButtonProps) {
    const orangeBorder = type === 'orangeBorder' ? 'button_type_orange-border' : '';

    return (
        <button className={`button ${orangeBorder}`} onClick={onClick}>
            {children}
        </button>
    );
}
