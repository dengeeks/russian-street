'use client';
import { useContext } from 'react';
import { EventsDataContext} from './EventsDataContext'

export const useEventsData = () => {
  const context = useContext(EventsDataContext);
  if (!context) throw new Error('useAuth must be used within useEventsData');
  return context;
};
