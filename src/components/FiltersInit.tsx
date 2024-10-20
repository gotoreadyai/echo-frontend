/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AppInitializer.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGlobalStore } from '../stores/globalStore';
import useNav from '../hooks/useNav';


const FiltersInit: React.FC = () => {
  const location = useLocation();
  const { setFilters } = useGlobalStore();
  const { getAll } = useNav();

  useEffect(() => {
    const allParams = getAll();
    const filterParams: Record<string, any> = {};
    for (const key in allParams) {
      if (key.startsWith('filters.')) {
        filterParams[key] = allParams[key];
      }
    }
    if (Object.keys(filterParams).length > 0) {
      setFilters(filterParams);
    } else {
      
      setFilters({});
    }
  }, [location.search, getAll, setFilters]);

  return null; // Ten komponent nie renderuje niczego
};

export default FiltersInit;
