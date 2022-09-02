import React, { useRef } from 'react';

import { Head } from 'seo/Head/Head';

import * as S from './ExamplePage.styles';

export default function ExamplePage() {
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);

  return (
    <>
      <Head />
      <S.ScrollContainer ref={scrollContainerRef}>
        <S.Wrapper>
          <h1>test</h1>
        </S.Wrapper>
      </S.ScrollContainer>
    </>
  );
}
