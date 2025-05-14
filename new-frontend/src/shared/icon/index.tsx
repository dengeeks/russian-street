import { IconName } from './type'
import {SVGProps } from 'react';
import "./Icon.css"

interface IconProps extends SVGProps<SVGSVGElement> {
    icon: IconName;
    width?: number;
    height?: number;
    color?: string;
    stroke?: string;
    className?: string;
}

const Icon = ({icon, width = 20, height = 20, color, stroke, className = '', ...props}: IconProps) => {
    return (
        <svg
            width={width}
            height={height}
            stroke={stroke}
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            className={`icon ${className}`}
            {...props}
        >
            <use href={`/svg/sprite.svg#${icon}`} />
        </svg>
    );
};

export default Icon