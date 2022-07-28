import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #b0a3e2; //A59BDD
`;

export const Container = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  bottom: 0;
  left: 30%;
  background-color: green;
  transform: translate(-50%, 0%);

  &:nth-child(2) {
    left: 60%;
    top: 0;
    bottom: initial;
    background-color: blue;
  }
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
