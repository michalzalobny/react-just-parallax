import styled, { css } from 'styled-components';

import { media } from 'utils/media';

export const ScrollContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  background: white;
`;

export const Wrapper = styled.div`
  margin: 120px auto;

  width: 85%;
  position: relative;

  ${media.tablet} {
    width: 60rem;
    margin: 100px auto;
  }
`;
