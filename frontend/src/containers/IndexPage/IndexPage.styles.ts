import styled from 'styled-components';

import { media } from 'utils/media';
import { underline, s1 } from 'utils/sharedStyled';

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

export const GithubWrapper = styled.div`
  display: initial;
  position: fixed;
  z-index: 20;
  top: 16px;
  right: 20px;
  mix-blend-mode: difference;
  color: white;
  display: none;

  ${media.tablet} {
    display: initial;
    transform: none;
    top: 30px;
    right: 50px;
  }
`;

export const GithubLink = styled.span`
  display: inline-block;
  position: relative;
  ${s1};
  ${underline};
`;
