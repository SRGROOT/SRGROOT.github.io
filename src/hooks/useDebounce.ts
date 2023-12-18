import { useCallback, useRef } from "react";

const useDebounce = (callback: (args: any) => void, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...value: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay]
  );
};

export { useDebounce };
