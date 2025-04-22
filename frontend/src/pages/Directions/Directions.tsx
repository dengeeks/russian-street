import React from 'react';
import './Directions.css';
import dirImage from './images/Rectangle53.png';
import frame from './images/Frame819.svg';
import group18 from './images/Group18.svg';
import music from './images/music.png';
import sport from './images/sport.png';
import dance from './images/dance.png';
import dancesvg from './images/dansesvg.svg';
import rectangle from './images/Rectangle60.png';
import art from './images/art.png';
import artsvg from './images/artsvg.svg';
import { Button } from '../../UI/Button/Button';
import { Link } from 'react-router-dom';

export function Directions() {


  return (<section className='directions'>
    <img src={dirImage} className='directions__image'/>

    <div className='directions__runtext'>
      <span className='directions__runtext-span'/>
      <p className='directions__runtext-text'>Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц Мир улиц </p>
      <span className='directions__runtext-span'/>
    </div>
    
    <div className='direction-card'>
    <h3 className='direction-card__title'>Спорт</h3>
    <p className='direction-card__subtitle'>Здесь нет жёстких правил и ограничений, здесь каждый может найти свой собственный путь и выразить свою индивидуальность. Это отличный способ не только поддерживать своё здоровье, но и обрести новых друзей, научиться преодолевать страхи и одерживать победы над самим собой.

Уличный спорт — это возможность выйти за пределы городских стен, исследовать новые места и ощутить себя живым и полным сил.</p>
    <img className='direction-card__slider' src={sport}/>

    <div className='direction-card__group'>
      <img src={group18} className='direction-card__animation'/>
      <p className='direction-card__text'>А так же: Бмх стрит, бмх флэт, скут, стритбол, лонгбордиг, джимбар, фрибар, дрифт, драг, стант, панна, МТВ, агрессив верт, агрессив стрит, стритбординг, слэклан, триклайн, хайлайн </p>
    </div>
    <Link to='/events'>
      <Button type='orangeBorder'>Мероприятия</Button>
    </Link>
    </div>

    <div className='direction-card'>
    <h3 className='direction-card__title'>Музыка</h3>
    <p className='direction-card__subtitle'>Уличная музыка — это свобода самовыражения, возможность для творческого самовыражения и создания уникальных музыкальных моментов прямо на улице. Она способна соединить людей разных культур и языков, объединить их вместе под звуки музыки и создать неповторимую атмосферу общения и взаимопонимания.</p>

    <div className='direction-card__group'>
      <img src={music} className='direction-card__animation'/>
      <p className='direction-card__text'>А так же: тёрнтеблизм, битмеёкинг, битбокс</p>
    </div>

    <img className='direction-card__slider' src={rectangle}/>
    <Link to='/events'>
      <Button type='orangeBorder'>Мероприятия</Button>
    </Link>
    </div>
    
    <div className='direction-card'>
    <img src={dance} className='direction-card__animation'/>
   
      <div className='direction-card__group'>
        <h3 className='direction-card__title' style={{marginBottom:'0'}}>Танцы</h3>
        <p className='direction-card__subtitle' style={{width:'100%'}}>это не просто движение тела под музыку, это целое искусство, которое зародилось на улицах больших городов. Этот вид танца сочетает в себе энергию, стиль, азарт и индивидуальность. Уличные танцы не имеют строгих правил и стандартов, они отражают культуру и характер города, из которого они вышли.</p>
        <img src={dancesvg} className='direction-card__animation'/>
        <p className='direction-card__text'>А так же: дабстеп, электро, локинг, поппинг, хаус, фанк, р'n'б</p>
      </div>
      <Link to='/events'>
        <Button type='orangeBorder'>Мероприятия</Button>
      </Link>
    </div>

    <div className='direction-card'>
    <h3 className='direction-card__title'>Искусство</h3>
    <p className='direction-card__subtitle'>Является важной частью городской культуры, которая не только украшает город, но и делает его более живым, разнообразным и запоминающимся для его жителей и гостей. Позволяет художникам выразить свои мысли, чувства и идеи на стенах зданий, железнодорожных вагонах, мостах и других поверхностях.</p>

      <img src={art} className='direction-card__animation'/>
    <div className='direction-card__group'>
      <img src={artsvg} className='direction-card__animation'/>
      <p className='direction-card__text'>А так же:трафареты, скульптурные инсталляции</p>
    </div>

    <Link to='/events'>
      <Button type='orangeBorder'>Мероприятия</Button>
    </Link>
    </div>
    
  </section>)
}
