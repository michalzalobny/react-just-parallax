import styled, { css } from 'styled-components';

export const SyntaxWrapper = styled.div`
  overflow: hidden;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 15px;
  line-height: 1.6;
  background: #2b2b2b;
  padding: 16px;

  pre {
    background: transparent !important;
    padding: 0 !important;
    font-family: 'opensans' !important;
    letter-spacing: 0.3px;
  }
`;

export const SyntaxTop = styled.div`
  position: relative;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #2b2b2b;
  height: 32px;
  transform: translateY(1px);
`;

interface SyntaxDotProps {
  $bgColor: string;
  $offsetX: number;
}

export const SyntaxDot = styled.div<SyntaxDotProps>`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor};
  ${props => css`
    transform: translateY(0) ${`translateX(${props.$offsetX}%)`};
  `}
`;
