import { useEffect, useRef } from 'react';

const useInterval = (callback: Function, delay?: number | null) => {
  const intervalId = useRef(null);
  const savedCallback = useRef<Function>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalId.current = window.setInterval(tick, delay) as any;
      return () => window.clearInterval(intervalId.current as any);
    }
  }, [delay]);

  return intervalId.current;
};

export default useInterval;
