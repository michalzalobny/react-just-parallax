import React, { useEffect, useRef } from 'react';

import { useElementSize } from 'hooks/useElementSize';
import { DocsInfo } from 'sections/DocsInfo/DocsInfo';

import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';

export default function IndexPage() {
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  const { size: wrapperSize } = useElementSize(wrapperRef);

  useEffect(() => {
    console.log(wrapperSize);
  }, [wrapperSize]);

  return (
    <>
      <Head />
      <S.ScrollContainer ref={scrollContainerRef}>
        <S.Wrapper ref={wrapperRef}>
          <S.DocsWrapper>
            <DocsInfo scrollContainerRef={scrollContainerRef} />
          </S.DocsWrapper>
        </S.Wrapper>
      </S.ScrollContainer>
    </>
  );
}
