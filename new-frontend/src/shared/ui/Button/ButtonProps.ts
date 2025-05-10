// src/UI/Button/ButtonProps.ts
export interface ButtonProps {
    children: string;
    type?: string;
    onClick?: () => void; // Добавьте onClick как опциональное свойство
}
