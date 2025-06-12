import {ReactNode, ButtonHTMLAttributes} from "react";
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
}

const Button = ({ children, className='red', ...rest }: ButtonProps) => {

    return (
        <button className={`button ${className}`}  {...rest}>
            {children}
        </button>
    );
}

export default Button