import { useState, useEffect, useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';

import { getScrollbarWidth } from 'utils/functions/getScrollbarWidth';

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
  const windowSizeRef = useRef<WindowSize>(windowSizeSSR);

  const onResize = useCallback(() => {
    const newWindowSize: WindowSize = {
      isReady: true,
      scrollbarWidth: getScrollbarWidth(),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };

    setWindowSize(newWindowSize);
    windowSizeRef.current = newWindowSize;
  }, []);

  useEffect(() => {
    const onResizeDebounced = debounce(onResize, 100);
    window.addEventListener('resize', onResizeDebounced);
    onResize();
    return () => {
      window.removeEventListener('resize', onResizeDebounced);
    };
  }, [onResize]);

  return { windowSize, windowSizeRef };
};
