import { useEffect } from "react";

export function useDebounce(setter, value, delay) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      setter(value);
    }, delay);

    
    return () => clearTimeout(timerId);
  }, [value, setter, delay]);
}
 