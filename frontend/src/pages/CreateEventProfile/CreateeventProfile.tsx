import React from 'react';
import './CreateeventProfile.css';
import CardEvent from '../../images/cardevent.png';

export function CreateEventProfile() {
    return (
        <div className='create-event-profile'>
            <h1 className='create-event-profile__title'>СОЗДАТЬ МЕРОПРИЯТИЕ</h1>
            <form className='create-event-profile__form'>
                <section className='create-event-profile__section'>
                    <h2 className='create-event-profile__section-title'>Основная информация*</h2>
                    <div className='create-event-profile__form-group'>
                        <label>Название события</label>
                        <input type='text' placeholder='Мастер класс по паркуру' />
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Направление</label>
                        <select>
                            <option>Музыка</option>
                        </select>
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Вид направления</label>
                        <select>
                            <option>Все</option>
                        </select>
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Тип площадки</label>
                        <select>
                            <option>Крытая</option>
                        </select>
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Тип события</label>
                        <select>
                            <option>Мастер-класс</option>
                        </select>
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Описание</label>
                        <textarea placeholder='Здесь вы можете подробно рассказать о мероприятии'></textarea>
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Регион</label>
                        <select>
                            <option>ЦФО</option>
                        </select>
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Город</label>
                        <input type='text' placeholder='Москва' />
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Адрес площадки</label>
                        <input type='text' placeholder='Красная площадь' />
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Дата начала</label>
                        <input type='date' />
                        <label>Время начала</label>
                        <input type='time' />
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Дата окончания</label>
                        <input type='date' />
                        <label>Время окончания</label>
                        <input type='time' />
                    </div>
                </section>
                <section className='create-event-profile__section'>
                    <h2 className='create-event-profile__section-title'>Контактная информация*</h2>
                    <div className='create-event-profile__form-group'>
                        <label>Контактное лицо</label>
                        <input type='text' placeholder='Иванов Иван' />
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Номер телефона</label>
                        <input type='text' placeholder='+7 (923) 567-8990' />
                    </div>
                    <div className='create-event-profile__form-group'>
                        <label>Ссылка на соцсеть или сайт</label>
                        <input type='text' placeholder='t.me' />
                    </div>
                </section>
                <section className='create-event-profile__section'>
                    <h2 className='create-event-profile__section-title'>ДОБАВИТЬ МЕДИА</h2>
                    <div className='create-event-profile__media'>
                        <img src={CardEvent} alt="event" />
                        <img src={CardEvent} alt="event" />
                        <img src={CardEvent} alt="event" />
                        <img src={CardEvent} alt="event" />
                        <div className='create-event-profile__media-add'>
                            <span>+</span>
                        </div>
                    </div>
                </section>
                <button type='submit' className='create-event-profile__submit'>СОЗДАТЬ</button>
            </form>
        </div>
    );
}
