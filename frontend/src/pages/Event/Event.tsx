import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PopupParty } from '../../components/PopupForParty/PopupforParty';
import { PopupforSponsor } from '../../components/PopupForSponsor/PopupforSponsor';
import './Event.css';
import img from '../../images/woman.png';
import { EventCard } from '../../components/EventCard/EventCard';
import SliderEvent from '../../components/SliderEvent/SliderEvent';

export function Event() {
  let { id } = useParams();

  const [isPopupPartyOpen, setIsPopupPartyOpen] = useState(false);
  const [isPopupSponsorOpen, setIsPopupSponsorOpen] = useState(false);

  useEffect(() => {
    const descriptionElements = document.querySelectorAll('.template__text .template__description');
    const lastDescriptionElement = descriptionElements[descriptionElements.length - 1];
    if (lastDescriptionElement) {
      lastDescriptionElement.classList.add('last-description');
    }
  }, []);

  const test = [1, 2, 3, 4];

  const openPopupParty = () => setIsPopupPartyOpen(true);
  const closePopupParty = () => setIsPopupPartyOpen(false);

  const openPopupSponsor = () => setIsPopupSponsorOpen(true);
  const closePopupSponsor = () => setIsPopupSponsorOpen(false);

  return (
    <>
      <SliderEvent />
      <section className="skate-event">
        <div className="skate-event__text-block skate-event__text-block--gray">{generateGrayText(20)}</div>
        <div className="skate-event__text-block skate-event__text-block--black">{generateBlackText(10)}</div>
      </section>

      <section className="template">
        <div className="template__text">
          <p className="template__title">Описание</p>
          <p className="template__description">
            - Экстремальные состязания пройдут в обычном зачете для всех, а также выделена отдельно детская номинация;
          </p>
          <p className="template__description">
            - Мастер-классы и показательные выступления от сборной России по скейтборду, Центра экстремального спорта «Спортэкс» г. Красноярск;
          </p>
          <p className="template__description">- Крутые призы и подарки от партнеров.</p>
          <p className="template__time">И так, встречаемся:</p>
          <p className="template__time">4 ноября 2023 года;</p>
          <p className="template__time">12:00 часов;</p>
          <p className="template__time">Скейт-парк «Дом на колесах», (ул. Тухачевского 48Б).</p>
          <p className="template__org">Организаторы: Федерация скейтбординга Кузбасса и скейт-парк «Дом на колесах».</p>
          <p className="template__meet">С собой берем свое транспортное средство, заряд энергии и хорошее настроение</p>
          <div className="template__question">
            <span>Задать вопрос организаторам:</span>
            <div className="icon-container">
              <a href="#" target="_blank">
                <div className="telegram-circle"></div>
              </a>
              <a href="#" target="_blank">
                <div className="whats-circle"></div>
              </a>
            </div>
          </div>
        </div>
        <div className="template__card">
          <img src={img} className="template__image" alt="Description of the image" />
          <p className="template__card-subtitle">Представитель Региона</p>
          <p className="template__card-description">Алена Васильева</p>
          <p className="template__card-description">mail: alyona@mail.ru</p>
          <p className="template__card-description">8-923-567-789</p>
          <p className="template__card-office">Офис: 16мкр, д.50, оф 216 пн-пт с 09.00-18.00</p>
        </div>
      </section>

      <section className="buttons">
        <button className="button__white" onClick={openPopupSponsor}>Стать спонсором</button>
        <PopupforSponsor isOpen={isPopupSponsorOpen} closePopup={closePopupSponsor} />
        
        <button className="button__red" onClick={openPopupParty}>Участвовать</button>
        <PopupParty isOpen={isPopupPartyOpen} closePopup={closePopupParty} />
      </section>

      <section className='map_event'>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Aba31cfe28fe4a1d9077cb197a0dabea6ad54e5cc9ea6b9c9484e23d10e21346c&amp;source=constructor"
          width="100%"
          height="500"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        ></iframe>
      </section>

      <section className='likeit'>
        <h3 className='likeit__title'>Вам понравится</h3>
        <div className='likeit__list'>
          {test.map(card => <EventCard id={card} key={card} />)}
        </div>
      </section>
    </>
  );
}

function generateGrayText(repeatCount: number) {
  const text = 'Мир улиц '.repeat(repeatCount);
  return <span className="skate-event__text">{text}</span>;
}

function generateBlackText(repeatCount: number) {
  const text = 'у тебя всё получится '.repeat(repeatCount);
  return <span className="skate-event__text">{text}</span>;
}
