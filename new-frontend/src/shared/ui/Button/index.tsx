import React from "react";
import { ButtonProps } from "./ButtonProps";
import './Button.css';

const Button = ({ children, className='red', ...rest }: ButtonProps) => {

    return (
        <button className={`button ${className}`}  {...rest}>
            {children}
        </button>
    );
}

export default Button