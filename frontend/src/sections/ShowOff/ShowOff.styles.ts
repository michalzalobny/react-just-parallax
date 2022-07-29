import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

export const PicturesContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(-20%, -50%);
  width: 45%;
  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const ContoursWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Shape1Wrapper = styled.div`
  position: absolute;
  bottom: 0%;
  left: 0%;
  transform: translate(-25%, -62%);
  width: 33%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const Shape2Wrapper = styled.div`
  position: absolute;
  bottom: 33%;
  left: 17%;
  width: 9%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const Shape3Wrapper = styled.div`
  position: absolute;
  top: 17%;
  left: 34%;
  width: 30%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const Shape4Wrapper = styled.div`
  position: absolute;
  top: 23%;
  left: 47%;
  width: 9.5%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const Shape5Wrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 81.5%;
  width: 9.5%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const Shape6Wrapper = styled.div`
  position: absolute;
  top: 28.5%;
  left: 60%;
  width: 32%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const Shape7Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 53.5%;
  width: 9.5%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const Shape8Wrapper = styled.div`
  position: absolute;
  top: 48.5%;
  left: 42%;
  width: 37%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const Shape9Wrapper = styled.div`
  position: absolute;
  top: 48.5%;
  left: 31.5%;
  width: 37%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
