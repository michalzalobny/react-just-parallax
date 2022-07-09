import React from 'react';

import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';

export default function IndexPage() {
  return (
    <>
      <Head />
      <S.Wrapper style={{ fontSize: 16 }}>
        <S.Container>
          <S.Box />
        </S.Container>
        <S.Container>
          <S.Box $floating />
        </S.Container>
        <S.Container>
          <S.Box />
        </S.Container>
        <S.Container>
          <S.Box $floating />
        </S.Container>
      </S.Wrapper>
    </>
  );
}
