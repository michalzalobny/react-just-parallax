import { css } from 'styled-components';

import { media } from 'utils/media';
import { sharedValues } from 'utils/sharedValues';

export const s1 = css`
  font-size: 13px;
  line-height: 1.6;

  ${media.tablet} {
    font-size: 15px;
  }
`;

export const s2 = css`
  font-size: 12px;
  line-height: 1.6;
`;

export const m1 = css`
  font-size: 2.5rem;
  line-height: 1.4;
`;

export const m2 = css`
  font-size: 4.5rem;
`;

export const underline = css`
  &:before {
    content: '';
    position: absolute;
    top: 85%;
    width: 100%;
    height: 1px;
    background-color: currentColor;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.7s ${sharedValues.timings.t1};
  }

  &:hover {
    &:before {
      transform: scaleX(1);
    }
  }
`;
