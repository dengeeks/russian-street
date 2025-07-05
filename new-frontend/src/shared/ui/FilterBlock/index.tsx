import { useState } from 'react';
import styles from './FilterBlock.module.css';
import Icon from '@/shared/icon';

type FilterItem = {
  label: string;
  checked: boolean;
};

interface FilterBlockProps {
  title: string;
  items: FilterItem[];
  onChange: (updatedItems: FilterItem[]) => void;
  showToggleAll?: boolean;
}

const FilterBlock = ({ title, items, onChange, showToggleAll = false, }: FilterBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = (index: number) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    onChange(newItems);
  };

  return (
    <div className={styles.FilterBlock}>
      <div
        className={styles.FilterBlockCheckboxRow}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
      >
        <div className={styles.FilterBlockCustomBox}>
          <Icon icon={isOpen ? 'plus' : 'minus'} width={14} height={14}/>
        </div>
        <span className={styles.FilterBlockLabel}>{title}</span>
      </div>

      {isOpen && (
        <div className={styles.FilterBlockItems}>
          {items.map((item, index) => (
            <label key={index} className={styles.FilterBlockCheckboxRow}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(index)}
                className={styles.FilterBlockCheckbox}
              />
              <div className={styles.FilterBlockCustomBox}>
                {item.checked && <Icon icon="check" width={16} height={12} />}
              </div>
              <span className={styles.FilterBlockLabel}>{item.label}</span>
            </label>
          ))}
        </div>
      )}

      {showToggleAll && (
        <div className={styles.FilterBlockToggleAll}>смотреть все</div>
      )}
    </div>
  );
};

export default FilterBlock;
