import styled, { css } from 'styled-components';

interface WrapperProps {
  $elHeight: number;
}

export const Wrapper = styled.div<WrapperProps>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.$elHeight}px;
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
  opacity: 1;
  display: none;
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
