import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  user-select: none;
  pointer-events: none;
  background: black;
  mix-blend-mode: multiply;

  &:before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 10%;
    width: 300px;
    height: 300px;
    background-color: red;
  }
`;

export const Title = styled.p`
  font-family: 'roboto';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 400px;
  color: #fff;
  font-weight: 900;
`;
