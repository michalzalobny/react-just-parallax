import React from 'react';
import { MouseParallax } from 'react-just-parallax';

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
          <S.Box />
        </S.Container>
        <S.Container>
          <S.Box $floating />
        </S.Container>
      </S.Wrapper>
    </>
  );
}
