import React, { useEffect, useRef, useState } from 'react';

import { useWindowSize } from 'hooks/useWindowSize';

import { appState } from './Caption.state';
import { App } from './classes/App';
import * as S from './Caption.styles';

export const Caption = () => {
  const rendererEl = useRef<HTMLDivElement | null>(null);
  const [shouldReveal, setShouldReveal] = useState(false);
  const { windowSize } = useWindowSize();

  useEffect(() => {
    if (!rendererEl.current) return;

    appState.app = new App({ rendererEl: rendererEl.current, setShouldReveal });

    return () => {
      if (appState.app) {
        appState.app.destroy();
        appState.app = null;
      }
    };
  }, [windowSize]);

  return (
    <>
      <S.Wrapper>
        <S.ReadyWrapper shouldReveal={shouldReveal && windowSize.isReady} />
        <S.CanvasWrapper
          $elWidth={windowSize.windowWidth - windowSize.scrollbarWidth}
          ref={rendererEl}
        />
      </S.Wrapper>
    </>
  );
};
