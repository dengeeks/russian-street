import { useState } from "react";
import "./SelectMenu.css";
import Icon from '@/shared/icon'

interface SelectMenuProps {
  options: string[];
  onChange?: (value: string) => void;
}

const SelectMenu = ({ options, onChange }: SelectMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(options[0]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="select-menu">
      <div className="select-menu__selected" onClick={toggleOpen}>
        {selected}
        <Icon icon="chevron" width={20} height={20} className={isOpen ? "bottom" : ""} />
      </div>
      {isOpen && (
        <ul className="select-menu__list">
          {options.map((option) => (
            <li
              key={option}
              className="select-menu__item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectMenu;
