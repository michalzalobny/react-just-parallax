import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Container = styled.div`
  width: 100%;
  height: 30rem;
  position: absolute;
  top: 30%;
  left: 0%;

  &:not(:first-child) {
    margin-top: 15rem;
  }

  &:last-child {
    margin-bottom: 15rem;
  }

  &:nth-child(1) {
    background-color: red;
  }
  &:nth-child(2) {
    background-color: purple;
  }
  &:nth-child(3) {
    background-color: green;
  }
  &:nth-child(4) {
    background-color: violet;
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
