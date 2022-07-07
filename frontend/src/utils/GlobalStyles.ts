import { createGlobalStyle } from 'styled-components';

import { media } from 'utils/media';

export const GlobalStyles = createGlobalStyle`
  html {
    font-size: calc(100vw / 375 * 10);

    ${media.tablet}{
      font-size: calc(100vw / 1920 * 10);
    }

    ${media.desktop}{
      font-size: 62.5%;
    }
  }
`;
