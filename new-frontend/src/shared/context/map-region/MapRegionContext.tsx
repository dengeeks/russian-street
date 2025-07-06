'use client'
import { createContext, ReactNode, useState, useMemo } from 'react'

type MapRegionContextType = {
  selectedRegionId: string | undefined;
  setSelectedRegionId: (id: string | undefined) => void;
  selectedType: 'event' | 'area';
  setSelectedType: (type: 'event' | 'area') => void;
};

export const MapRegionContext = createContext<MapRegionContextType | undefined>(undefined);

type MapRegionProviderProps = {
  children: ReactNode;
};

export const MapRegionProvider = ({ children }: MapRegionProviderProps) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string | undefined>()
  const [selectedType, setSelectedType] = useState<'event' | 'area'>('event')

  const value = useMemo(() => ({
    selectedRegionId,
    setSelectedRegionId,
    selectedType,
    setSelectedType,
  }), [selectedRegionId, selectedType])

  return (
    <MapRegionContext.Provider value={value}>
      {children}
    </MapRegionContext.Provider>
  );
};
