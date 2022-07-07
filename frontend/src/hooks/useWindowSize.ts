import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

interface WindowSize {
  windowWidth: number;
  windowHeight: number;
  scrollbarWidth: number;
  isReady: boolean;
}

const windowSizeSSR: WindowSize = {
  isReady: false,
  scrollbarWidth: 0,
  windowHeight: 0,
  windowWidth: 0,
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>(windowSizeSSR);
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  const onResize = useCallback(() => {
    const newWindowSize: WindowSize = {
      isReady: true,
      scrollbarWidth: getScrollbarWidth(),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };

    setWindowSize(newWindowSize);
  }, []);

  useEffect(() => {
    const onResizeDebounced = debounce(onResize, 200);
    window.addEventListener('resize', onResizeDebounced);
    onResize();
    return () => {
      window.removeEventListener('resize', onResizeDebounced);
    };
  }, [onResize]);

  return { windowSize };
};
