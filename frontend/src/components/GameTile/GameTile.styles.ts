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

  &:before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 75%,
      rgba(0, 0, 0, 1) 100%
    );
    opacity: 0.35;
  }
`;

interface IconWrapperProps {
  yTranslate: number;
  positionRight?: boolean;
  positionBottom?: boolean;
  isSmaller?: boolean;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;

  transform: ${props =>
    `translateX(${props.positionRight ? '50' : '-50'}%) translateY(${props.yTranslate}%)`};

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  ${props =>
    props.positionRight &&
    css`
      left: initial;
      right: 0;
    `}

  ${props =>
    props.positionBottom &&
    css`
      top: initial;
      bottom: 0;
    `}

  width:15rem;

  ${props =>
    props.isSmaller &&
    css`
      width: 8rem;
    `}
  ${media.tablet} {
    width: 24rem;
    ${props =>
      props.isSmaller &&
      css`
        width: 13rem;
      `}
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

export const TitleWrapper = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export const Title = styled.p`
  font-size: 20px;
  color: white;

  width: 100%;
  line-height: 1.2;
  padding: 8%;
  padding-bottom: 5%;
`;
