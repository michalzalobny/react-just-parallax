import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

import { useWindowSize } from 'hooks/useWindowSize';
import { ShowOff } from 'sections/ShowOff/ShowOff';

import { appState } from './Caption.state';
import { App } from './classes/App';
import * as S from './Caption.styles';

interface Props {
  scrollRatio: MotionValue<any>;
  scrollRatioQuicker: MotionValue<any>;
  scrollRatioRest: MotionValue<any>;
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const Caption = (props: Props) => {
  const { scrollRatioRest, scrollRatioQuicker, scrollRatio, scrollContainerRef } = props;
  const rendererEl = useRef<HTMLDivElement | null>(null);
  const [shouldReveal, setShouldReveal] = useState(false);
  const { windowSize, windowSizeRef } = useWindowSize();

  const scaleValue = useTransform(scrollRatioQuicker, v => v * 0.25 + 0.75);
  const translateXValue = useTransform(scrollRatioQuicker, v => {
    return v * windowSizeRef.current.windowWidth * -0.35;
  });

  const translateXValue2 = useTransform(
    scrollRatioRest,
    v => v * windowSizeRef.current.windowWidth * 0.35 + v * windowSizeRef.current.windowWidth * 0.5
  );

  const translateXValue3 = useTransform(
    scrollRatioRest,
    v => v * windowSizeRef.current.windowWidth * -0.6
  );

  useEffect(() => {
    if (!rendererEl.current) return;
    appState.app = new App({
      rendererEl: rendererEl.current,
      setShouldReveal,
      scrollRatio,
      scrollRatioQuicker,
      scrollRatioRest,
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
        <S.MotionWrapper
          style={{
            x: translateXValue2,
          }}
        >
          <S.MotionWrapper
            style={{
              scale: scaleValue,
              x: translateXValue,
            }}
          >
            <ShowOff scrollContainer={scrollContainerRef} />
          </S.MotionWrapper>
        </S.MotionWrapper>

        <S.MotionWrapper
          style={{
            x: translateXValue3,
            zIndex: 2,
          }}
        >
          <S.MotionWrapper
            style={{
              x: windowSizeRef.current.windowWidth * 0.7,
            }}
          >
            <ShowOff scrollContainer={scrollContainerRef} />
          </S.MotionWrapper>
        </S.MotionWrapper>

        <S.CanvasWrapper ref={rendererEl} />
      </S.Wrapper>
    </>
  );
};
