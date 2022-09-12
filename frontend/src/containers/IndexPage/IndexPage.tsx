import React, { useRef } from 'react';
import { useSpring, useTransform, useScroll } from 'framer-motion';

import { LinkHandler } from 'components/LinkHandler/LinkHandler';
import { useElementSize } from 'hooks/useElementSize';
import { DocsInfo } from 'sections/DocsInfo/DocsInfo';
import { Caption } from 'components/Caption/Caption';
import { useWindowSize } from 'hooks/useWindowSize';
import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';

const quickerPoint = 0.2;

const sat = (x: number) => {
  return Math.min(Math.max(x, 0), 1);
};

//if t = a returns 0, if t = b returns 1, if t is half way then return 0.5 etc.
const remap01 = (a: number, b: number, t: number) => {
  return sat((t - a) / (b - a));
};

// if t = a returns c, if t = b returns d, if t half way through a and b returns half way between c and d etc.
const remap = (a: number, b: number, c: number, d: number, t: number) => {
  return sat(remap01(a, b, t) * (d - c) + c);
};

const springSettings = {
  stiffness: 350,
  damping: 80,
  mass: 5,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export default function IndexPage() {
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);
  const captionWrapperRef = useRef<null | HTMLDivElement>(null);
  const { windowSizeRef } = useWindowSize();
  const { sizeRef: captionWrapperSizeRef } = useElementSize(captionWrapperRef);
  const { scrollY } = useScroll({ container: scrollContainerRef });

  const scrollYPadded = useTransform(scrollY, v =>
    sat(v / (captionWrapperSizeRef.current.clientRect.height - windowSizeRef.current.windowHeight))
  );

  const scrollYPaddedQuicker = useTransform(scrollYPadded, v => remap(0, quickerPoint, 0, 1, v));
  const scrollYPaddedRest = useTransform(scrollYPadded, v =>
    remap(quickerPoint * 2, quickerPoint * 3, 0, 1, v)
  );
  const scrollYPaddedClose = useTransform(scrollYPadded, v => remap(quickerPoint * 4, 1, 0, 1, v));

  const scrollRatio = useSpring(scrollYPadded, springSettings);
  const scrollRatioQuicker = useSpring(scrollYPaddedQuicker, springSettings);
  const scrollRatioRest = useSpring(scrollYPaddedRest, springSettings);
  const scrollRatioClose = useSpring(scrollYPaddedClose, springSettings);

  return (
    <>
      <Head />
      <S.ScrollContainer ref={scrollContainerRef}>
        <S.CaptionWrapper ref={captionWrapperRef}>
          <Caption
            scrollContainerRef={scrollContainerRef}
            scrollRatioQuicker={scrollRatioQuicker}
            scrollRatioRest={scrollRatioRest}
            scrollRatioClose={scrollRatioClose}
            scrollRatio={scrollRatio}
          />
        </S.CaptionWrapper>

        <S.GithubWrapper>
          <LinkHandler elHref="/examples/1">
            <S.GithubLink>Demo 1</S.GithubLink>
          </LinkHandler>
        </S.GithubWrapper>

        <S.Wrapper>
          <S.DocsWrapper>
            <DocsInfo scrollContainerRef={scrollContainerRef} />
          </S.DocsWrapper>
        </S.Wrapper>
      </S.ScrollContainer>
    </>
  );
}
