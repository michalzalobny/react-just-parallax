import React, { useRef } from 'react';
import { MouseParallax, ScrollParallax } from 'react-just-parallax';

import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';

export default function IndexPage() {
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);

  return (
    <>
      <Head />
      <S.ScrollContainer ref={scrollContainerRef}>
        <S.Wrapper>
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
        </S.Wrapper>
      </S.ScrollContainer>
    </>
  );
}
