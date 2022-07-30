import React, { useEffect, useRef, useState } from 'react';
import { MotionValue, useTransform, motion } from 'framer-motion';

import { useWindowSize } from 'hooks/useWindowSize';
import { ShowOff } from 'sections/ShowOff/ShowOff';

import { appState } from './Caption.state';
import { App } from './classes/App';
import * as Background from './backgroundClasses/App';
import * as CoverBackground from './coverBackgroundClasses/App';
import * as S from './Caption.styles';

interface Props {
  scrollRatio: MotionValue<any>;
  scrollRatioQuicker: MotionValue<any>;
  scrollRatioRest: MotionValue<any>;
  scrollRatioClose: MotionValue<any>;
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const Caption = (props: Props) => {
  const { scrollRatioClose, scrollRatioRest, scrollRatioQuicker, scrollRatio, scrollContainerRef } =
    props;
  const rendererEl = useRef<HTMLDivElement | null>(null);
  const backgroundRendererEl = useRef<HTMLDivElement | null>(null);
  const coverBackgroundRendererEl = useRef<HTMLDivElement | null>(null);
  const [shouldReveal, setShouldReveal] = useState(false);
  const { windowSizeRef } = useWindowSize();

  const scaleValue = useTransform(scrollRatioQuicker, v => v * 0.2 + 0.8);
  const translateXValue = useTransform(scrollRatioQuicker, v => {
    return v * windowSizeRef.current.windowWidth * -0.45;
  });

  const translateXValue2 = useTransform(
    scrollRatioRest,
    v => v * windowSizeRef.current.windowWidth * 0.45 + v * windowSizeRef.current.windowWidth * 0.5
  );

  const translateXValue3 = useTransform(
    scrollRatioRest,
    v => v * windowSizeRef.current.windowWidth * -0.5
  );

  const translateBadgeYValue = useTransform(scrollRatioRest, v => {
    return `${(1 - v) * -480}%`;
  });

  const translateBadgeXValue = useTransform(scrollRatioRest, v => {
    return `${(1 - v) * 101}%`;
  });

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

  useEffect(() => {
    if (!rendererEl.current) return;
    appState.background = new Background.App({
      rendererEl: backgroundRendererEl.current,
      scrollRatioRest,
    });

    return () => {
      if (appState.background) {
        appState.background.destroy();
        appState.background = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!rendererEl.current) return;
    appState.coverBackground = new CoverBackground.App({
      rendererEl: coverBackgroundRendererEl.current,
      scrollRatio: scrollRatioClose,
    });

    return () => {
      if (appState.coverBackground) {
        appState.coverBackground.destroy();
        appState.coverBackground = null;
      }
    };
  }, []);

  return (
    <>
      <S.Wrapper>
        <S.ReadyWrapper shouldReveal={shouldReveal} />
        {/* <S.TextContainer style={{ y: translateBadgeYValue }}>
          <S.TextWrapper>
            <S.Text style={{ x: translateBadgeXValue }}>react just</S.Text>
          </S.TextWrapper>
        </S.TextContainer> */}
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

        <S.BackgroundCanvasWrapper ref={backgroundRendererEl} />
        <S.CoverBackgroundCanvasWrapper ref={coverBackgroundRendererEl} />
        <S.CanvasWrapper ref={rendererEl} />
      </S.Wrapper>
    </>
  );
};
