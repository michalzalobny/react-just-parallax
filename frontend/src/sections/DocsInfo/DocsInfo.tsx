import React from 'react';
import { MouseParallax, ScrollParallax } from 'react-just-parallax';

import * as S from './DocsInfo.styles';

interface Props {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const DocsInfo = (props: Props) => {
  const { scrollContainerRef } = props;

  return (
    <>
      <S.Container>
        <MouseParallax scrollContainerRef={scrollContainerRef}>
          <S.Box />
        </MouseParallax>
      </S.Container>
      <S.Container>
        <MouseParallax scrollContainerRef={scrollContainerRef} strength={-0.1}>
          <S.Box $floating />
        </MouseParallax>
      </S.Container>
      <S.Container>
        <ScrollParallax scrollContainerRef={scrollContainerRef}>
          <S.Box />
        </ScrollParallax>
      </S.Container>
      <S.Container>
        <ScrollParallax scrollContainerRef={scrollContainerRef}>
          <S.Box $floating />
        </ScrollParallax>
      </S.Container>
    </>
  );
};
