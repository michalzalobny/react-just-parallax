import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  width: 30rem;
  height: 40rem;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: green;
`;

interface BoxProps {
  $floating?: boolean;
}

export const Box = styled.div<BoxProps>`
  width: 100px;
  position: relative;
  background: black;

  ${props =>
    props.$floating &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }
`;
