import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { filterByCity, getEventsAsync } from "../../store/Events/EventsSlice";
import { filterByRegion } from "../../store/Events/EventsSlice";

export function UseFilter() {

    const dispatch = useAppDispatch();

    async function changeRegion(event:any, defaultOption:string) {
        if(event.target.value === defaultOption) {
          let res = await dispatch(getEventsAsync());
          return res;
        }
        dispatch(filterByRegion(event.target.value));
      }
    
      async function changeCity(event:any, defaultOption:string) {
        if(event.target.value === defaultOption) {
            let res = await dispatch(getEventsAsync());
            return res;
          }
          dispatch(filterByCity(event.target.value));
      }

      async function changeDirection(event:any, defaultOption:string) {
        if(event.target.value === defaultOption) {
            let res = await dispatch(getEventsAsync());
            return res;
          }
          dispatch(filterByCity(event.target.value));
      }



    return { changeRegion, changeCity }
}