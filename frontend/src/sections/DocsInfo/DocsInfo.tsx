import React from 'react';
import { MouseParallax, ScrollParallax } from 'react-just-parallax';

import { LinkHandler } from 'components/LinkHandler/LinkHandler';

import * as S from './DocsInfo.styles';

interface Props {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const DocsInfo = (props: Props) => {
  const { scrollContainerRef } = props;

  return (
    <>
      <S.Container>
        <S.Title>React Just Parallax</S.Title>

        <S.Paragraph>
          React Just Parallax is a React library for scroll and mousemove parallax effect ✨ Open
          source, production-ready
        </S.Paragraph>

        {/* <S.TitleSecondary>MouseParallax</S.TitleSecondary> */}

        <S.Paragraph>
          ⚒️🏗️ Showcase page is under construction, in the meantime, check our{' '}
          <LinkHandler isExternal elHref="https://github.com/michalzalobny/react-just-parallax">
            <S.InlineLink>documentation</S.InlineLink>
          </LinkHandler>{' '}
          on GitHub
        </S.Paragraph>

        {/* <MouseParallax scrollContainerRef={scrollContainerRef}>
          <S.Box />
        </MouseParallax>
      </S.Container>
      <S.Container>
        <MouseParallax scrollContainerRef={scrollContainerRef} strength={-0.1}>
          <S.Box $floating />
        </MouseParallax>
      </S.Container>
      <S.Container>
        <ScrollParallax scrollContainerRef={scrollContainerRef}>
          <S.Box $floating />
        </ScrollParallax>
      </S.Container>
      <S.Container>
        <ScrollParallax scrollContainerRef={scrollContainerRef}>
          <S.Box $floating />
        </ScrollParallax> */}
      </S.Container>
    </>
  );
};
