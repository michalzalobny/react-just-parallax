import styled, { css } from 'styled-components';

import { media } from 'utils/media';
import { underline } from 'utils/sharedStyled';

export const Container = styled.div`
  width: 100%;
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.12);
  margin-bottom: 10rem;
  padding: 2.5rem;

  ${media.tablet} {
    padding: 7rem;
  }
`;

export const Title = styled.h2`
  text-align: left;
  font-weight: 800;
  font-size: 25px;

  ${media.tablet} {
    font-size: 30px;
  }
`;

export const Paragraph = styled.p`
  font-size: 15px;
  margin: 20px 0;
  line-height: 1.6;

  ${media.tablet} {
    margin: 30px 0;
  }
`;

export const InlineLink = styled.span`
  display: inline-block;
  font-weight: 800;
  position: relative;
  ${underline};
`;

interface ExampleWrapperProps {
  $bgColor: string;
}

export const ExampleWrapper = styled.div<ExampleWrapperProps>`
  width: 100%;
  background-color: ${props => props.$bgColor};
  border-radius: 10px;
  position: relative;
  display: flex;

  &:before {
    content: '';
    display: inline-block;
    padding-bottom: 50%;

    ${media.tablet} {
      padding-bottom: 35%;
    }
  }
`;

interface RingProps {
  $dim?: boolean;
}

export const Ring = styled.div<RingProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 17%;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;

  ${media.tablet} {
    border: 3px solid white;
    width: 10%;
  }

  &:before {
    content: '';
    display: inline-block;
    padding-bottom: 100%;
  }

  ${props =>
    props.$dim &&
    css`
      opacity: 0.5;
    `}
`;

export const SectionSeparator = styled.span`
  width: 100%;
  height: 80px;
  display: inline-block;

  ${media.tablet} {
    height: 120px;
  }
`;
