import React, { useState } from 'react';
import styles from './FilterBlock.module.css';

type FilterItem = {
  label: string;
  checked: boolean;
}

interface FilterBlockProps {
  title: string;
  items: FilterItem[];
  onChange: (updatedItems: FilterItem[]) => void;
  showToggleAll?: boolean;
}

const FilterBlock: React.FC<FilterBlockProps> = ({
                                                          title,
                                                          items,
                                                          onChange,
                                                          showToggleAll = false,
                                                        }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleItem = (index: number) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    onChange(newItems);
  };

  return (
    <div className={styles.block}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.toggleSymbol}>{isOpen ? '−' : '+'}</span>
        <span className={styles.title}>{title}</span>
      </div>

      {isOpen && (
        <div className={styles.items}>
          {items.map((item, index) => (
            <label key={index} className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(index)}
                className={styles.checkbox}
              />
              <span className={styles.label}>{item.label}</span>
            </label>
          ))}
        </div>
      )}

      {showToggleAll && (
        <div className={styles.toggleAll}>смотреть все</div>
      )}
    </div>
  );
};

export default FilterBlock;