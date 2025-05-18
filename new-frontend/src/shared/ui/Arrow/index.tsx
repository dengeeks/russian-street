import './Arrow.css';
import Icon from "@/shared/icon";

interface ArrowProps {
  styleClass?: string;
}

export const Arrow = ({ styleClass = '' }: ArrowProps) => {
  return (
    <div className={`arrow ${styleClass}`}>
        <Icon icon="arrow"/>
    </div>
  );
};
