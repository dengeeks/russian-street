'use client';
import { useContext } from 'react';
import { MapRegionContext} from './MapRegionContext'

export const useMapRegionData = () => {
  const context = useContext(MapRegionContext);
  if (!context) throw new Error('use must be used within useMapRegion');
  return context;
};
