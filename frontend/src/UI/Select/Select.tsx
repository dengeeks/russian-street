import React, { useEffect } from 'react';
import './Select.css';
import testImage from '../../images/TestPhoto.svg';
import { SelectProps } from './SelectProps';
import { useAppDispatch } from '../../store/hooks';
import { filterByRegion, getEventsAsync } from '../../store/Events/EventsSlice';
import { getRegionById } from '../../utils/RegionsApi/RegionsApi';
import { getEvents } from '../../utils/EventsApi/EventsApi';

export function Select({ defaultOption, options, whiteTheme, type, onChange }: SelectProps) {

  const dispatch = useAppDispatch();

  // async function changeRegion(event:any) {
  //   if(event.target.value === defaultOption) {
  //     let res = await dispatch(getEventsAsync());
  //     console.log(res);
  //     return res;
  //   }
  //   dispatch(filterByRegion(event.target.value));
  // }

  // async function changeCity(event:any) {
  //   console.log('сменил город')
  // }

  return (
    <select className={`select ${whiteTheme && 'select_type_white'}`} onChange={(event) => onChange(event, defaultOption)}>
       <option >{defaultOption}</option>
        { options && options.map((option, index) => <option key={index} value={index + 1}>{option}</option>) }
    </select>
  )
}