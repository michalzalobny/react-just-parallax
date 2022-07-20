import React, { useEffect, useRef, useState } from 'react';
import { MotionValue } from 'framer-motion';

import { appState } from './Caption.state';
import { App } from './classes/App';
import * as S from './Caption.styles';

interface Props {
  scrollRatio: MotionValue<any>;
}

export const Caption = (props: Props) => {
  const { scrollRatio } = props;
  const rendererEl = useRef<HTMLDivElement | null>(null);
  const [shouldReveal, setShouldReveal] = useState(false);

  useEffect(() => {
    if (!rendererEl.current) return;
    appState.app = new App({ rendererEl: rendererEl.current, setShouldReveal, scrollRatio });

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
