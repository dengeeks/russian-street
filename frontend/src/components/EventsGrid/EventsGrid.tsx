import React, { useEffect, useMemo, useState } from 'react';
import './EventsGrid.css';
import { Select } from '../../UI/Select/Select';
import { EventCard } from '../EventCard/EventCard';
import { createEvent, getEvents } from '../../utils/EventsApi/EventsApi';
import rectangle75 from './images/Rectangle75.svg';
import { EventType } from '../../types/EventType';
import { getCategory, getDescipline, getDesciplineById, getSubDescipline, getSubDesciplineById } from '../../utils/categoryApi/categoryApi';
import { CheckboxFieldset } from '../CheckboxFieldset/CheckboxFieldset';
import { getCity, getRegion } from '../../utils/RegionsApi/RegionsApi';
import { RegionType } from '../../types/RegionType';
import { UseFilter } from '../../app/hooks/UseFilter';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { filterByDirection, getEventsAsync } from '../../store/Events/EventsSlice';

export function EventsGrid() {

  const [ disciplineId, setDisciplineId ] = useState<number[] | null>(null);
  const [ subDiscipline, setSubDiscipline ] = useState(null);
  const [ regionList, setRegionList ] = useState<string[] | null>(null)
  const [ cityList, setCityList ] = useState<string[] | null>(null)
  const [directions, setDirections] = useState<string[] | null>(null);

  const events = useAppSelector(state => state.events.value);
  const dispatch = useAppDispatch();

  useMemo(async() => {
    // подгружаем события
    dispatch(getEventsAsync());

    let desciplineRes = await getDescipline();
    const descipline = desciplineRes !== undefined && desciplineRes.map((item:any) => item.name);
    setDirections(descipline);

    let subDiscipline = await getSubDescipline();
    setSubDiscipline(subDiscipline);
    let idArray = desciplineRes !== undefined && desciplineRes.map((item:{id:number}) => item.id);
    setDisciplineId(idArray);

    let regionsRes = await getRegion();
    const regions = regionsRes !== undefined && regionsRes.map((item:RegionType) => item.name);
    setRegionList(regions);
    
    let cityRes = await getCity();
    const cities = cityRes !== undefined && cityRes.map((item:RegionType) => item.name);
    setCityList(cities);

  }, [])

  const { changeRegion, changeCity } = UseFilter();
  
  return (
    <section className="events-grid">
      <div className="events-grid__menu">

        {/* Сортировка событий */}
        <Select defaultOption={'Выбрать регион'} options={regionList} type='region' onChange={changeRegion}/>
        <Select defaultOption={'Выбрать город'} options={cityList} type='city' onChange={changeCity}/>
        <Select defaultOption={'Направление'} options={directions} type='directions' onChange={() => {dispatch(filterByDirection())}}/>
        <Select defaultOption={'Сначала популярные'} options={['Сначала новые']} type='popular' onChange={() => {console.log('ff')}}/>

      </div>

      <div className="events-grid__flex-container">

        <div className="events-grid__sorting">

            <div className='region-representative'>
              <img src={rectangle75}/>
              <div className='region-representative__textarea'>
                <p className='region-representative__text'>Представитель Региона</p>
                <p className='region-representative__text'>Алена Васильева</p>
                <p className='region-representative__text'>mail: alyona@mail.ru</p>
                <p className='region-representative__text'>8-923-567-789</p>
                <p className='region-representative__text'>Офис: 16мкр, д.50, оф 216 пн-пт с 09.00-18.00</p>
              </div>
            </div>

            { disciplineId !== undefined && disciplineId?.map(id => <CheckboxFieldset disciplineId={id} subDiscipline={subDiscipline} key={id}/>)
            }
        </div>
        
              {/* Основная сетка с событиями */}
        <ul className="events-grid__list list-style">
    
          { events !== undefined && events?.map((event: EventType , index:number) => (
            <EventCard id={event.id} key={event.id} title={event.title} 
            files={event.files} start_datetime={event.start_datetime}
            location={event.location}
            />
          ))}
        </ul>

      </div>

    </section>
  )
}
