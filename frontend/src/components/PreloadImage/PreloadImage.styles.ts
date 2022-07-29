import styled, { css } from 'styled-components';

interface ImageProps {
  isLoaded: boolean;
  shouldContain: boolean;
}

export const Image = styled.img<ImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.45s;
  user-select: none;
  pointer-events: none;

  ${props =>
    props.shouldContain &&
    css`
      object-fit: contain;
    `}

  ${props =>
    props.isLoaded &&
    css`
      opacity: 1;
    `}
`;
