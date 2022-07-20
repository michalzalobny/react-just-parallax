import styled from 'styled-components';

import { media } from 'utils/media';

export const ScrollContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const DocsWrapper = styled.div`
  background-color: green;
`;

export const CaptionWrapper = styled.div`
  height: 250vh;
  background-color: blue;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 90%;

  ${media.tablet} {
    width: 130rem;
  }
`;
