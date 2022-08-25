import React from 'react';
import { MouseParallax } from 'react-just-parallax';

import { PreloadImage } from 'components/PreloadImage/PreloadImage';

import frameSrc from './images/frame.svg';
import shape1Src from './images/shape1.svg';
import shape2Src from './images/shape2.svg';
import shape3Src from './images/shape3.svg';
import shape4Src from './images/shape4.svg';
import shape5Src from './images/shape5.svg';
import shape6Src from './images/shape6.svg';
import shape7Src from './images/shape7.svg';
import shape8Src from './images/shape8.svg';
import shape9Src from './images/shape9.svg';
import * as S from './ShowOff.styles';

interface Props {
  scrollContainer: React.MutableRefObject<HTMLDivElement | null>;
}

const defStrength = 0.24;
const mulC = 0.3;
const mul1 = 0.84;
const mul2 = 0.82;
const mul3 = 0.7;
const mul4 = 0.32;
const mul5 = 0.21;
const mul6 = 0.56;
const mul7 = 0.46;
const mul8 = 0.91;
const mul9 = 0.91;

export const ShowOff = ({ scrollContainer }: Props) => {
  return (
    <>
      <S.Wrapper>
        <S.PicturesContainer>
          <MouseParallax
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainer}
            strength={defStrength * mulC}
            zIndex={5}
            shouldPause={false}
            enableOnTouchDevice={true}
          >
            <S.ContoursWrapper>
              <PreloadImage shouldContain imageSrc={frameSrc as string} alt="leafs contour" />
            </S.ContoursWrapper>
          </MouseParallax>
          <MouseParallax
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainer}
            strength={defStrength * mul1}
            shouldPause={false}
            enableOnTouchDevice={true}
          >
            <S.Shape1Wrapper>
              <PreloadImage shouldContain imageSrc={shape1Src as string} alt="flower shape" />
            </S.Shape1Wrapper>
          </MouseParallax>

          <MouseParallax
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainer}
            strength={defStrength * mul2}
            shouldPause={false}
            enableOnTouchDevice={true}
          >
            <S.Shape2Wrapper>
              <PreloadImage shouldContain imageSrc={shape2Src as string} alt="flower shape" />
            </S.Shape2Wrapper>
          </MouseParallax>

          <MouseParallax
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainer}
            strength={defStrength * mul3}
            shouldPause={false}
            enableOnTouchDevice={true}
          >
            <S.Shape3Wrapper>
              <PreloadImage shouldContain imageSrc={shape3Src as string} alt="flower shape" />
            </S.Shape3Wrapper>
          </MouseParallax>

          <MouseParallax
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainer}
            strength={defStrength * mul4}
            shouldPause={false}
            enableOnTouchDevice={true}
          >
            <S.Shape4Wrapper>
              <PreloadImage shouldContain imageSrc={shape4Src as string} alt="flower shape" />
            </S.Shape4Wrapper>
          </MouseParallax>

          <MouseParallax
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainer}
            strength={defStrength * mul5}
            shouldPause={false}
            enableOnTouchDevice={true}
            zIndex={1}
          >
            <S.Shape5Wrapper>
              <PreloadImage shouldContain imageSrc={shape5Src as string} alt="flower shape" />
            </S.Shape5Wrapper>
          </MouseParallax>

          <MouseParallax
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainer}
            strength={defStrength * mul6}
            shouldPause={false}
            enableOnTouchDevice={true}
          >
            <S.Shape6Wrapper>
              <PreloadImage shouldContain imageSrc={shape6Src as string} alt="flower shape" />
            </S.Shape6Wrapper>
          </MouseParallax>

          <MouseParallax
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainer}
            strength={defStrength * mul7}
            shouldPause={false}
            enableOnTouchDevice={true}
            zIndex={1}
          >
            <S.Shape7Wrapper>
              <PreloadImage shouldContain imageSrc={shape7Src as string} alt="flower shape" />
            </S.Shape7Wrapper>
          </MouseParallax>

          <MouseParallax
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainer}
            strength={defStrength * mul8}
            shouldPause={false}
            enableOnTouchDevice={true}
          >
            <S.Shape8Wrapper>
              <PreloadImage shouldContain imageSrc={shape8Src as string} alt="flower shape" />
            </S.Shape8Wrapper>
          </MouseParallax>

          <MouseParallax
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainer}
            strength={defStrength * mul9}
            shouldPause={false}
            enableOnTouchDevice={true}
          >
            <S.Shape9Wrapper>
              <PreloadImage shouldContain imageSrc={shape9Src as string} alt="flower shape" />
            </S.Shape9Wrapper>
          </MouseParallax>
        </S.PicturesContainer>
      </S.Wrapper>
    </>
  );
};
