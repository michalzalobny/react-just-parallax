import React, { useRef } from 'react';
import { useSpring, useTransform, useScroll } from 'framer-motion';

import { useElementSize } from 'hooks/useElementSize';
import { DocsInfo } from 'sections/DocsInfo/DocsInfo';
import { Caption } from 'components/Caption/Caption';
import { useWindowSize } from 'hooks/useWindowSize';
import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';

export default function IndexPage() {
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);
  const captionWrapperRef = useRef<null | HTMLDivElement>(null);
  const { windowSizeRef } = useWindowSize();
  const { sizeRef: captionWrapperSizeRef } = useElementSize(captionWrapperRef);
  const { scrollY } = useScroll({ container: scrollContainerRef });

  const scrollYPadded = useTransform(scrollY, v =>
    Math.min(
      Math.max(
        v / (captionWrapperSizeRef.current.clientRect.height - windowSizeRef.current.windowHeight),
        0
      ),
      1
    )
  ); //[returns scroll value from [0 to 1]]

  const scrollYPaddedQuicker = useTransform(scrollY, v =>
    Math.min(
      Math.max(
        v /
          (captionWrapperSizeRef.current.clientRect.height * 0.75 - //it fills up quicker that normal ratio
            windowSizeRef.current.windowHeight),
        0
      ),
      1
    )
  ); //[returns scroll value from [0 to 1]]

  const scrollRatio = useSpring(scrollYPadded, {
    stiffness: 350,
    damping: 80,
    mass: 5,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const scrollRatioQuicker = useSpring(scrollYPaddedQuicker, {
    stiffness: 350,
    damping: 80,
    mass: 5,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  return (
    <>
      <Head />
      <S.ScrollContainer ref={scrollContainerRef}>
        <S.CaptionWrapper ref={captionWrapperRef}>
          <Caption
            scrollContainerRef={scrollContainerRef}
            scrollRatioQuicker={scrollRatioQuicker}
            scrollRatio={scrollRatio}
          />
        </S.CaptionWrapper>
        <S.Wrapper>
          <S.DocsWrapper>
            <DocsInfo scrollContainerRef={scrollContainerRef} />
          </S.DocsWrapper>
        </S.Wrapper>
      </S.ScrollContainer>
    </>
  );
}
