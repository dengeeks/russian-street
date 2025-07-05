import { IconName } from './type'
import {SVGProps } from 'react';
import "./Icon.css"

interface IconProps extends SVGProps<SVGSVGElement> {
    icon: IconName;
    width?: number;
    height?: number;
    className?: string;
}

const Icon = ({icon, width = 20, height = 20, className = '', ...props}: IconProps) => {
    return (
        <svg
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            className={`icon ${className}`}
            {...props}
        >
            <use xlinkHref={`/assets/svg/sprites.svg#${icon}`} />
        </svg>
    );
};

export default Icon