import React from 'react';
import { MouseParallax } from 'react-just-parallax';

import { PreloadImage } from 'components/PreloadImage/PreloadImage';

import frameSrc from './images/frame.svg';
import * as S from './ShowOff.styles';

interface Props {
  scrollContainer: React.MutableRefObject<HTMLDivElement | null>;
}

export const ShowOff = ({ scrollContainer }: Props) => {
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <PreloadImage imageSrc={frameSrc} alt="leafs contour" />
          <MouseParallax scrollContainerRef={scrollContainer}>
            <S.Box />
          </MouseParallax>
        </S.Container>
        <S.Container>
          <MouseParallax scrollContainerRef={scrollContainer} strength={-0.1}>
            <S.Box $floating />
          </MouseParallax>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
