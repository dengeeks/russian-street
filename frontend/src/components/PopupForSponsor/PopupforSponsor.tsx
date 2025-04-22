import React, { useState, useEffect, useRef } from 'react';
import './PopupforSponsor.css';
import ClosePopupBtn from '../../images/closepopupbtn.svg';

interface PopupforSponsorProps {
  isOpen: boolean;
  closePopup: () => void;
}

export function PopupforSponsor({ isOpen, closePopup }: PopupforSponsorProps) {
  const [amount, setAmount] = useState<string>('');
  const popupRef = useRef<HTMLDivElement>(null);

  const handleAmountButtonClick = (value: string) => setAmount(value);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closePopup();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      closePopup();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`sponsor-popup ${isOpen ? 'popup-open' : ''}`}>
      <div className="sponsor-popup-content" ref={popupRef}>
        <div className="popup-container">
          <img src={ClosePopupBtn} className="close-button" onClick={closePopup} alt="Закрыть" />
          <div className="sponsor-amounts">
            <button className="sponsor-amount" onClick={() => handleAmountButtonClick('500₽')}>500₽</button>
            <button className="sponsor-amount" onClick={() => handleAmountButtonClick('1000₽')}>1000₽</button>
            <button className="sponsor-amount" onClick={() => handleAmountButtonClick('2000₽')}>2000₽</button>
            <button className="sponsor-amount other-amount" onClick={() => handleAmountButtonClick('')}>Другая сумма</button>
          </div>
          <input
            type="text"
            className="sponsor-input"
            placeholder="200₽"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="sponsor-payment-methods">
            <div className="sponsor-method">
              <div className="sponsor-method-telegram">TELEGRAM</div>
              <a href="#" className="sponsor-method-link">Перейти</a>
            </div>
            <div className="sponsor-method">
              <div className="sponsor-method-boosty">BOOSTY</div>
              <a href="#" className="sponsor-method-link">Перейти</a>
            </div>
            <div className="sponsor-method">
              <div className="sponsor-method-paypal">PAYPAL</div>
              <a href="#" className="sponsor-method-link">Перейти</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
