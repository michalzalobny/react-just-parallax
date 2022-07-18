import React, { useEffect, useRef, useState } from 'react';

import { appState } from './Caption.state';
import { App } from './classes/App';
import * as S from './Caption.styles';

export const Caption = () => {
  const rendererEl = useRef<HTMLDivElement | null>(null);
  const [shouldReveal, setShouldReveal] = useState(false);

  useEffect(() => {
    if (!rendererEl.current) return;
    appState.app = new App({ rendererEl: rendererEl.current, setShouldReveal });

    return () => {
      if (appState.app) {
        appState.app.destroy();
        appState.app = null;
      }
    };
  }, []);

  return (
    <>
      <S.Wrapper>
        <S.ReadyWrapper shouldReveal={shouldReveal} />
        <S.CanvasWrapper ref={rendererEl} />
      </S.Wrapper>
    </>
  );
};
