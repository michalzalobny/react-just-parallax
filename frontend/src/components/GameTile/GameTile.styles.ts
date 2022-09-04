import styled, { css } from 'styled-components';

import { media } from 'utils/media';

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  transform: scale(1.1);

  &:before {
    content: '';
    padding-bottom: 115%;
    display: block;
  }
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  clip-path: inset(0% round 15px);
`;

interface IconWrapperProps {
  xTranslate: number;
  yTranslate: number;
  positionRight?: boolean;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;

  transform: ${props => `translateX(${props.xTranslate}%) translateY(${props.yTranslate}%)`};

  ${props =>
    props.positionRight &&
    css`
      left: initial;
      right: 0;
    `}

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const TileContainer = styled.div`
  position: relative;
  filter: drop-shadow(0 15px 12px rgba(0, 0, 0, 0.45));

  &:not(:last-child) {
    margin-bottom: 50px;
    ${media.tablet} {
      margin-bottom: 80px;
    }
  }
`;
