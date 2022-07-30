import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #b0a3e2;
`;

export const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  user-select: none;
  pointer-events: none;
`;

export const BackgroundCanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  user-select: none;
  pointer-events: none;
`;

export const CoverBackgroundCanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  user-select: none;
  pointer-events: none;
`;

interface ReadyWrapperProps {
  shouldReveal: boolean;
}

export const ReadyWrapper = styled.div<ReadyWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 25;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  background-color: white;

  ${props =>
    props.shouldReveal &&
    css`
      opacity: 0;
      user-select: none;
      pointer-events: none;
    `}
`;

export const MotionWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Text = styled(motion.p)`
  font-family: 'teko';
  font-weight: 800;
  font-size: 1.6vw;
  text-transform: uppercase;
  color: black; //#E2C4A3 #b0a3e2 #9BDBD8
  transition: 0;
  letter-spacing: 0.05vw;
`;

export const TextWrapper = styled.div`
  overflow: hidden;

  transform: translateY(-540%);
`;

export const TextContainer = styled(motion.div)`
  position: absolute;
  z-index: 3;
  left: 7%;
  top: 50%;
`;
