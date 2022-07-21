import React, { useEffect, useRef, useState } from 'react';
import { MotionValue } from 'framer-motion';

import { useWindowSize } from 'hooks/useWindowSize';
import { ShowOff } from 'sections/ShowOff/ShowOff';

import { appState } from './Caption.state';
import { App } from './classes/App';
import * as S from './Caption.styles';

interface Props {
  scrollRatio: MotionValue<any>;
  scrollRatioQuicker: MotionValue<any>;
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const Caption = (props: Props) => {
  const { scrollRatioQuicker, scrollRatio, scrollContainerRef } = props;
  const rendererEl = useRef<HTMLDivElement | null>(null);
  const [shouldReveal, setShouldReveal] = useState(false);
  const { windowSize } = useWindowSize();

  useEffect(() => {
    if (!rendererEl.current) return;
    appState.app = new App({
      rendererEl: rendererEl.current,
      setShouldReveal,
      scrollRatio,
      scrollRatioQuicker,
    });

    return () => {
      if (appState.app) {
        appState.app.destroy();
        appState.app = null;
      }
    };
  }, []);

  return (
    <>
      <S.Wrapper isHeightReady={windowSize.isReady} $elHeight={windowSize.windowHeight}>
        <S.ReadyWrapper shouldReveal={shouldReveal} />
        <ShowOff scrollContainer={scrollContainerRef} />
        <S.CanvasWrapper ref={rendererEl} />
      </S.Wrapper>
    </>
  );
};
