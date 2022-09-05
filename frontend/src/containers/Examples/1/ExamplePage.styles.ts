import styled from 'styled-components';
import { motion } from 'framer-motion';

import { underline, s1 } from 'utils/sharedStyled';
import { media } from 'utils/media';
import { sharedValues } from 'utils/sharedValues';

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

export const Wrapper = styled(motion.div)`
  margin: 120px auto;

  width: 85%;
  position: relative;
  user-select: none;
  pointer-events: none;

  ${media.tablet} {
    width: 60rem;
    margin: 100px auto;
  }
`;

Wrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
      y: '5vh',
    },
    animate: {
      opacity: 1,
      y: '0vh',
      transition: {
        delay: 0.3,
        ...sharedValues.motion.springSlow,
      },
    },
  },
};

export const GithubWrapper = styled.div`
  display: initial;
  position: fixed;
  z-index: 20;
  top: 0px;
  right: 0px;
  mix-blend-mode: difference;
  color: white;
  transform-origin: bottom left;
  transform: rotate(-90deg) translateY(calc(100% + 16px)) translateX(15px);
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
