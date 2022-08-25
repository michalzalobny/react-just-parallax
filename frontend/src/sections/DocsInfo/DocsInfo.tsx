import React, { useRef } from 'react';
import { MouseParallax, ScrollParallax } from 'react-just-parallax';

import { LinkHandler } from 'components/LinkHandler/LinkHandler';
import { CodeRenderer } from 'components/CodeRenderer/CodeRenderer';

import * as S from './DocsInfo.styles';

interface Props {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const mouseText = `<Wrapper>
  <MouseParallax strength={-0.12}>
    <Ring />
  </MouseParallax>
</Wrapper>
`;

export const DocsInfo = (props: Props) => {
  const { scrollContainerRef } = props;
  const mouseContainerRef = useRef(null);

  return (
    <>
      <S.Container>
        <S.Title>📜 Scroll Parallax</S.Title>
        <S.Paragraph>
          Check all the parameters and props for scroll parallax on{' '}
          <LinkHandler isExternal elHref="https://www.npmjs.com/package/react-just-parallax">
            <S.InlineLink>official npm page</S.InlineLink>
          </LinkHandler>
        </S.Paragraph>
        <S.ExampleWrapper $bgColor="#FFB66B">
          <S.Ring $dim />
          <ScrollParallax
            strength={-0.12}
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainerRef}
          >
            <S.Ring />
          </ScrollParallax>
        </S.ExampleWrapper>
        <S.Paragraph>Example code:</S.Paragraph>
        <CodeRenderer codeText={mouseText} />

        <S.SectionSeparator />

        <S.Title>🖱️ Mouse / Touch Parallax</S.Title>
        <S.Paragraph>
          Check all the parameters and props for mouse parallax on{' '}
          <LinkHandler isExternal elHref="https://www.npmjs.com/package/react-just-parallax">
            <S.InlineLink>official npm page</S.InlineLink>
          </LinkHandler>
        </S.Paragraph>
        <S.ExampleWrapper ref={mouseContainerRef} $bgColor="#6d66ff">
          <S.Ring $dim />
          <MouseParallax
            parallaxContainerRef={mouseContainerRef}
            enableOnTouchDevice
            strength={-0.12}
            isAbsolutelyPositioned
            scrollContainerRef={scrollContainerRef}
          >
            <S.Ring />
          </MouseParallax>
        </S.ExampleWrapper>
        <S.Paragraph>Example code:</S.Paragraph>
        <CodeRenderer codeText={mouseText} />
      </S.Container>
    </>
  );
};
