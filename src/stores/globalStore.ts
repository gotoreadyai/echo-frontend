// src/stores/globalStore.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { getEncodedToken, signOut } from '../services/authServices';
import { decodeJwt } from '../utils/auth';

interface User {
  id: string;
  email: string;
  role: string;
  exp: number;
}

interface GlobalState {
  user: User | null;
  filters: Record<string, any>;
  mainMessage: { message: string; type: string };
  scopeManager: {
    selectedRJSF_Id: string;
    selectedScope: string;
    selectedFilter: string;
    selectedFieldName: string;
  };
  globalScope: () => Record<string, any>;
  setUser: (user: User | null) => void;
  setFilters: (filters: Record<string, any>) => void;
  setMainMessage: (message: string, type: string) => void;
}

const unflatten = (data: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in data) {
    const keys = key.split('.');
    keys.reduce((acc, currentKey, index) => {
      if (index === keys.length - 1) {
        acc[currentKey] = data[key];
      } else {
        if (!acc[currentKey]) {
          acc[currentKey] = {};
        }
      }
      return acc[currentKey];
    }, result);
  }

  return result;
};

const deepMerge = (target: any, source: any): any => {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};

const deepEqual = (a: any, b: any): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const useGlobalStore = create<GlobalState>((set, get) => ({
  user: null,
  filters: {},
  scopeManager: {
    selectedRJSF_Id: '',
    selectedScope: '',
    selectedFilter: '',
    selectedFieldName: '',
  },
  mainMessage: {
    message: '',
    type: 'info',
  },
  globalScope: () => {
    const { user, mainMessage, filters } = get();
    return {
      user: user || {},
      mainMessage: mainMessage || {},
      filters: filters || {},
    };
  },
  setUser: (user) => set({ user }),
  setFilters: (newFilters) => {
    const nestedFilters = unflatten(newFilters);
    const currentFilters = get().filters;
    const mergedFilters = deepMerge(currentFilters, nestedFilters.filters || nestedFilters);
    if (!deepEqual(get().filters, mergedFilters)) {
      set({ filters: mergedFilters });
    } else {
      // console.log('Filters unchanged, not updating');
    }
  },
  setMainMessage: (message, type) => set({ mainMessage: { message, type } }),
}));

// Dodajemy logikę uwierzytelniania
import { useEffect, useRef } from 'react';

export const useInitializeAuth = () => {
  const setUser = useGlobalStore((state) => state.setUser);
  const user = useGlobalStore((state) => state.user);
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getEncodedToken();
      if (token) {
        const decodedUser = decodeJwt(token);

        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedUser.exp < currentTime) {
          // Token wygasł
          setUser(null);
          signOut();
        } else {
          setUser(decodedUser);
          // Ustaw timer
          const timeUntilExpiration = (decodedUser.exp - currentTime) * 1000;
          logoutTimerRef.current = setTimeout(() => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('rightbar', 'user');
            window.history.pushState({}, '', currentUrl);

            setUser(null);
            signOut();
          }, timeUntilExpiration);
        }
      } else {
        setUser(null);
      }
    };

    initializeAuth();

    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [setUser]);

  useEffect(() => {
    // Aktualizujemy timer wylogowania, gdy zmieni się użytkownik
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }

    if (user) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiration = (user.exp - currentTime) * 1000;
      logoutTimerRef.current = setTimeout(() => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('rightbar', 'user');
        window.history.pushState({}, '', currentUrl);

        setUser(null);
        signOut();
      }, timeUntilExpiration);
    }
  }, [user, setUser]);
};
