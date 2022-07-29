import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface WrapperProps {
  $elHeight: number;
  isHeightReady: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props =>
    props.isHeightReady
      ? props.$elHeight.toString() + 'px'
      : '100vh'}; //It's only used to fix height on mobile (normally 100vh would be enough)
  overflow: hidden;
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
  /* opacity: 0.3; */
  /* display: none; */
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
