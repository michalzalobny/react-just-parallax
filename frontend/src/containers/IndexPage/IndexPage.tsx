import React from 'react';
import { MouseParallax, ScrollParallax } from 'react-just-parallax';

import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';

export default function IndexPage() {
  return (
    <>
      <Head />
      <S.Wrapper style={{ fontSize: 16 }}>
        <S.Container>
          <MouseParallax>
            <S.Box />
          </MouseParallax>
        </S.Container>
        <S.Container>
          <MouseParallax strength={-0.1}>
            <S.Box $floating />
          </MouseParallax>
        </S.Container>
        <S.Container>
          <ScrollParallax>
            <S.Box />
          </ScrollParallax>
        </S.Container>
        <S.Container>
          <ScrollParallax>
            <S.Box $floating />
          </ScrollParallax>
        </S.Container>
      </S.Wrapper>
    </>
  );
}
