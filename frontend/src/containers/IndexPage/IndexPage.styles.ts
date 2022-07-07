import styled from 'styled-components';

import { media } from 'utils/media';

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  margin-top: 8rem;

  ${media.tablet} {
    width: 100rem;
    margin-top: 15rem;
  }
`;
