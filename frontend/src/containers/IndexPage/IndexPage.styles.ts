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
  margin-top: -40vh;

  ${media.tablet} {
    margin-top: -50vh;
  }
`;

export const CaptionWrapper = styled.div`
  height: 300vh;

  ${media.tablet} {
    height: 340vh;
  }
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;

  ${media.tablet} {
    width: 100rem;
  }
`;
