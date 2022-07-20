import React, { useRef } from 'react';
import { useSpring, useTransform, useElementScroll } from 'framer-motion';

import { useElementSize } from 'hooks/useElementSize';
import { DocsInfo } from 'sections/DocsInfo/DocsInfo';
import { Caption } from 'components/Caption/Caption';
import { useWindowSize } from 'hooks/useWindowSize';
// import { Caption } from 'components/CaptionText/Caption';

import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';

export default function IndexPage() {
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);
  const captionWrapperRef = useRef<null | HTMLDivElement>(null);
  const { windowSizeRef } = useWindowSize();
  const { sizeRef: captionWrapperSizeRef } = useElementSize(captionWrapperRef);
  const { scrollY } = useElementScroll(scrollContainerRef);

  const scrollYPadded = useTransform(scrollY, v =>
    Math.min(
      Math.max(
        v / (captionWrapperSizeRef.current.clientRect.height - windowSizeRef.current.windowHeight),
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

  return (
    <>
      <Head />
      <S.ScrollContainer ref={scrollContainerRef}>
        <S.Wrapper>
          <S.CaptionWrapper ref={captionWrapperRef}>
            <Caption scrollRatio={scrollRatio} />
          </S.CaptionWrapper>
          <S.DocsWrapper>
            <DocsInfo scrollContainerRef={scrollContainerRef} />
          </S.DocsWrapper>
        </S.Wrapper>
      </S.ScrollContainer>
    </>
  );
}
