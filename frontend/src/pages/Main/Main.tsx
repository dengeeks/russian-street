import React, { useEffect, useMemo, useState } from 'react';
import './Main.css';
import logo from './images/logo-08.png';
import { Button } from '../../UI/Button/Button';
import { Map } from '../../components/Map/Map';
import image394 from './images/image394.png';
import sponsor from './images/iconamoon_profile-circle-fill.svg';
import frame1200 from './images/Frame1200.png';
import one from './images/11.png';
import two from './images/12.png';
import three from './images/21.png';
import four from './images/22.png';
import ytlogo from './images/ytlogo.svg';
import { partner1, partner2, partner3, partner4, partner5, partner6, partner7 } from './partners';
import { Link, useNavigate } from 'react-router-dom';
import { CheckBox } from '../../UI/CheckBox/CheckBox';
import { getNews } from '../../utils/newsApi/newsApi';
import { Popuplogin } from '../../components/PopupLogin/Popuplogin';
import { isAuthenticated } from '../../utils/token';
import RussianSreetVideo from '../../video/RussianSreetVideo.mp4';
import right from '../../pages/Main/images/right.svg';
import soon from '../../pages/Main/images/soon.svg';

export function Main() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAuthenticated()) {
      navigate('/events', { replace: true });
      window.scrollTo(0, 0);
    } else {
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  function generateGrayText(repeatCount: number) {
    const text = 'Мир улиц '.repeat(repeatCount);
    return <span className="skate-event__text">{text}</span>;
  }

  function generateBlackText(repeatCount: number) {
    const text = 'у тебя всё получится '.repeat(repeatCount);
    return <span className="skate-event__text">{text}</span>;
  }

  useEffect(() => {
    const fetchNews = async () => {
      let res = await getNews();
      console.log(res);
    };
    fetchNews();
  }, []);

  return (
    <>
      <main className='main'>
        <div className='main__participate'>
        <video autoPlay muted loop className='main__participate-video'>
            <source src={RussianSreetVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className='main__participate-container'>
            <img src={logo} alt="logo"/>
            <p className='main__participate-text'>Общероссийская общественная организация уличной культуры и спорта</p>
            <Button onClick={handleButtonClick}>Вступить</Button>
          </div>
        </div>

        <div className='main__neyro'>
      <img src={soon} alt="Soon" className='neyro__image'/>
      <div className='neyro__search-container'>
        <p className='neyro__title'>ПОДБОР МЕРОПРИЯТИЙ НЕЙРОСЕТЬЮ</p>
        <div className='neyro__search-box'>
          <input type="text" className='neyro__search-input' placeholder='Расскажи, что тебе нравится'/>
          <button className='neyro__search-button'>
            <img src={right} alt="Search" className='neyro__search-icon'/>
          </button>
        </div>
        <p className='neyro__description'> Экстремальные состязания пройдут в обычном зачете для всех, а также выделена отдельно детская номинация;- Мастер-классы и показательные выступления от сборной России по скейтборду, Центра экстремального спорта «Спортэкс» г. Красноярск;- Крутые призы и подарки от партнеров</p>
      </div>
      <img src={soon} alt="Soon" className='neyro__image'/>
    </div>



        <div className="skate-event">
          <div className="skate-event__text-block skate-event__text-block--gray">{generateGrayText(20)}</div>
          <div className="skate-event__text-block skate-event__text-block--black">{generateBlackText(10)}</div>
        </div>

        <Map />

        <h3 className='main__title'>Мероприятия</h3>

        <div className='main__events'>
          <ul className='main__events-list list-style'>
            <li className='main__events-list-item'>
              <p>Москва</p>
              <div>
                <p className='main__event-text'>Соревнования по скейтбордингу</p>
                <p className='main__event-text'>Сб. 4 ноября 2024г., 12:00</p>
                <p className='main__event-text'>Скейтпарк "Дом на колесах", (ул. Тухачевского 48Б)</p>
              </div>
              <div className='main__events-sponsors'>
                <img src={sponsor} className='main__events-sponsors-logo' alt="sponsor"/>
                <img src={sponsor} className='main__events-sponsors-logo' alt="sponsor"/>
              </div>
            </li>
            <li className='main__events-list-item'>
              <p>Москва</p>
              <div>
                <p className='main__event-text'>Соревнования по скейтбордингу</p>
                <p className='main__event-text'>Сб. 4 ноября 2024г., 12:00</p>
                <p className='main__event-text'>Скейтпарк "Дом на колесах", (ул. Тухачевского 48Б)</p>
              </div>
              <div className='main__events-sponsors'>
                <img src={sponsor} className='main__events-sponsors-logo' alt="sponsor"/>
                <img src={sponsor} className='main__events-sponsors-logo' alt="sponsor"/>
              </div>
            </li>
            <li className='main__events-list-item'>
              <p>Москва</p>
              <div>
                <p className='main__event-text'>Соревнования по скейтбордингу</p>
                <p className='main__event-text'>Сб. 4 ноября 2024г., 12:00</p>
                <p className='main__event-text'>Скейтпарк "Дом на колесах", (ул. Тухачевского 48Б)</p>
              </div>
              <div className='main__events-sponsors'>
                <img src={sponsor} className='main__events-sponsors-logo' alt="sponsor"/>
                <img src={sponsor} className='main__events-sponsors-logo' alt="sponsor"/>
              </div>
            </li>
            <li className='main__events-list-item'>
              <p>Москва</p>
              <div>
                <p className='main__event-text'>Соревнования по скейтбордингу</p>
                <p className='main__event-text'>Сб. 4 ноября 2024г., 12:00</p>
                <p className='main__event-text'>Скейтпарк "Дом на колесах", (ул. Тухачевского 48Б)</p>
              </div>
              <div className='main__events-sponsors'>
                <img src={sponsor} className='main__events-sponsors-logo' alt="sponsor"/>
                <img src={sponsor} className='main__events-sponsors-logo' alt="sponsor"/>
              </div>
            </li>
            <li className='main__events-list-item'>
              <p>Москва</p>
              <div>
                <p className='main__event-text'>Соревнования по скейтбордингу</p>
                <p className='main__event-text'>Сб. 4 ноября 2024г., 12:00</p>
                <p className='main__event-text'>Скейтпарк "Дом на колесах", (ул. Тухачевского 48Б)</p>
              </div>
              <div className='main__events-sponsors'>
                <img src={sponsor} className='main__events-sponsors-logo' alt="sponsor"/>
                <img src={sponsor} className='main__events-sponsors-logo' alt="sponsor"/>
              </div>
            </li>
          </ul>
          <img src={image394} className='main__events-image' alt="event"/>
        </div>

        <Button onClick={handleButtonClick}>Участвовать</Button>

        <div className='main__gallery'/>

        <h3 className='main__title'>Направления</h3>

        <img src={frame1200} className='main__directions' alt="directions"/>

        <div className='main__about-us'>
          <div className='main__about-us-column'>
            <p className='main__about-us-title'>Кто мы</p>
            <p className='main__about-us-subtitle'>Миссия</p>
            <p className='main__about-us-text'>Создать условия для успешной реализации потенциала каждого ссвязанного с уличными дисциплинами и духовной профессиональный сфере</p>
            <p className='main__about-us-subtitle'>Цель</p>
            <p className='main__about-us-text'>Комплексное развитие уличной культуры и спорта. Популяризация уличных дисциплин. Создание положительного образа в информационном пространстве у дисциплин, которые считаются травмоопасными и агрессивными.</p>
            <Link to='/about-us' className='main__about-us-link'>Подробнее</Link>
          </div>

          <div className='main__about-us-galery'>
            <img src={one} className='main__about-us-galery-one' alt="gallery"/>
            <img src={two} className='main__about-us-galery-two' alt="gallery"/>
            <img src={three} className='main__about-us-galery-three' alt="gallery"/>
            <img src={four} className='main__about-us-galery-four' alt="gallery"/>
          </div>
        </div>

        <h3 className='main__title' style={{textAlign:'center', marginBottom:'0'}}>У нас понравится всем</h3>

        <div className='main__join'>
          <Button onClick={handleButtonClick}>Вступить</Button>
        </div>

        <h3 className='main__title'>Партнёры</h3>

        <div className='main__partners'>
          <img src={partner1} alt="partner"/>
          <img src={partner2} alt="partner"/>
          <img src={partner3} alt="partner"/>
          <img src={partner4} alt="partner"/>
          <img src={partner5} alt="partner"/>
          <img src={partner6} alt="partner"/>
          <img src={partner7} alt="partner"/>
        </div>

        <h3 className='main__title'>Блог</h3>

        <ul className='main__news list-style'>
          {/* <EventCard id={1}/>
          <EventCard id={2}/>
          <EventCard id={3}/>
          <EventCard id={4}/> */}
        </ul>

        <h3 className='main__title'>Возникли вопросы?</h3>

        <div className='main__application'>
          <div>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Aba31cfe28fe4a1d9077cb197a0dabea6ad54e5cc9ea6b9c9484e23d10e21346c&amp;source=constructor"
              width="490px"
              height="500"
              frameBorder="0"
              style={{ border: 0 }} // добавляем стиль без рамки, чтобы убрать рамку вокруг iframe
              allowFullScreen // если хотите разрешить полноэкранный режим
              aria-hidden="false"
              tabIndex={0}
              title="office location"
            ></iframe>
            <p>Офис в Москве: Малая Московская,11, д 5/4</p>
            <p>ПН-ПТ с 09:00-18:00</p>
            <p>8-800-550-5050</p>
            <p>info@streetrussia.ru</p>
            <Link to="#"><img src={ytlogo} alt="ytlogo"/></Link>
            <Link to="#"><img src={ytlogo} alt="ytlogo"/></Link>
          </div>
          <div className='main__application-form'>
            <p className='main__application-form-title'>Оставьте заявку</p>
            <p className='main__application-form-input-name'>Имя*</p>
            <input placeholder='Имя' className='main__application-form-input'></input>
            <div className='main__application-form-container'>
              <label>
                <p className='main__application-form-input-name'>Телефон*</p>
                <input placeholder='Телефон' type='tel' id="phoneMain" name="phone" className='main__application-form-input' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required></input>
              </label>
              <label>
                <p className='main__application-form-input-name'>Почта</p>
                <input placeholder='Почта' type='email' className='main__application-form-input'></input>
              </label>
            </div>
            <p className='main__application-form-input-name'>Сообщение</p>
            <textarea placeholder='Напишите сообщение' className='main__application-form-input'></textarea>
            <div className='main__application-form-checkboxes'>
              <CheckBox id={'agreement-with-rights'}>Я согласен с правами о обязанностями ОООУКС "Улицы России"</CheckBox>
              <CheckBox id={'agreement-with-personal-info'}>Я согласен на обработку персональных данных</CheckBox>
            </div>
            <Button>Отправить</Button>
          </div>
        </div>
      </main>
      <Popuplogin isOpen={isPopupOpen} closePopup={closePopup} />
    </>
  );
}
