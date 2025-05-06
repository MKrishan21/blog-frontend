// hooks/useDebounce.ts
import { useState, useEffect, useMemo } from "react";

export function useDebounce(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export const useRandomItem = (array: any) => {
  return useMemo(() => {
    if (!Array.isArray(array) || array.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }, [array]);
};
