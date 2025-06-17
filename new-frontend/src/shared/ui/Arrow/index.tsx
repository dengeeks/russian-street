import './Arrow.css';
import Icon from "@/shared/icon";
import { IconName } from '@/shared/icon/type'

interface ArrowProps {
  styleClass?: string;
  icon?: IconName;
}

export const Arrow = ({ styleClass = '', icon="arrow" }: ArrowProps) => {
  return (
    <div className={`arrow ${styleClass}`}>
        <Icon icon={icon} />
    </div>
  );
};
