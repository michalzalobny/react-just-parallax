import styled, { css } from 'styled-components';

import { sharedValues } from 'utils/sharedValues';
import { underline, s1 } from 'utils/sharedStyled';
import { media } from 'utils/media';

interface ReadyWrapperProps {
  isReady: boolean;
}

export const ReadyWrapper = styled.div<ReadyWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  background-color: ${sharedValues.colors.trueWhite};

  ${props =>
    props.isReady &&
    css`
      opacity: 0;
      user-select: none;
      pointer-events: none;
    `}
`;

export const AppBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: white;
`;

export const BackWrapper = styled.h1`
  position: fixed;
  z-index: 20;
  top: 10px;
  left: 20px;
  mix-blend-mode: difference;
  color: white;

  ${media.tablet} {
    top: 20px;
    left: 30px;
  }
`;

export const BackBtn = styled.button`
  display: inline-block;
  cursor: pointer;
  position: relative;
  width: 66px;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid white;
    transform: translate(-50%, -50%);
    transition: transform 0.7s ${sharedValues.timings.t1};
  }

  &:hover {
    &:before {
      transform: translate(-50%, -50%) scale(1.1);
    }
    span {
      &:before {
        transform: scaleX(1);
      }
    }
  }
`;

export const BackBtnLabel = styled.span`
  ${s1};
  ${underline};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
