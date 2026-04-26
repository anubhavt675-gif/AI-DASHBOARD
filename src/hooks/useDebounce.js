import { useState, useEffect, useRef } from 'react';

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedCallback(callback, delay = 300) {
  const timerRef = useRef(null);

  return (...args) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => callback(...args), delay);
  };
}
