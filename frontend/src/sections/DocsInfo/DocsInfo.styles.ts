import styled from 'styled-components';

import { media } from 'utils/media';

export const Container = styled.div`
  width: 100%;
  height: 120rem;
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.12);
  margin-bottom: 10rem;
  padding: 3.5rem;

  ${media.tablet} {
    padding: 7rem;
  }
`;

export const Title = styled.h2`
  font-size: 2.5rem;

  text-align: left;
  font-weight: 800;

  ${media.tablet} {
    font-size: 3rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 15px;
  margin: 35px 0;
  line-height: 1.6;
`;
