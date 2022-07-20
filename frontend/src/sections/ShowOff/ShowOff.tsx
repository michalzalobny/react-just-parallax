import React from 'react';
import { MouseParallax } from 'react-just-parallax';

import * as S from './ShowOff.styles';

export const ShowOff = () => {
  return (
    <>
      <S.Wrapper>
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
      </S.Wrapper>
    </>
  );
};
