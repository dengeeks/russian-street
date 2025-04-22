import React, { useEffect, useMemo, useState } from "react";
import testImage from '../../images/TestPhoto.svg';
import { EventCardProps } from "./EventCardProps";
import './EventCard.css';
import { Link } from "react-router-dom";
import { EventType } from "../../types/EventType";
import { getRegion, getRegionById, getCityById } from "../../utils/RegionsApi/RegionsApi";


export function EventCard({ id, title, files, start_datetime, location } : EventType) {
    
    const [ region, setRegion ] = useState('');

    useMemo(async() => {
      if(location?.region !== undefined) {
        let res = await getCityById(location?.city);
        setRegion(res.name);
      }
    }, [])

    return (
          <li className="event-card__event">
            <Link to={`/events/${id}`} className='link'>
            { files !== undefined && files.length > 0 && <img src={files[0].file} className="event-card__image" />}
            <p className="event-card__title">{title}</p>
            <p className="event-card__subtitle">{start_datetime?.replace(/[TZ]/gi, ' ')}. {region}</p>
            </Link>
          </li>
    )
}
