import React, { useRef } from 'react';

import { Head } from 'seo/Head/Head';

import * as S from './ExamplePage.styles';
import { GameAsset, LogoAsset } from './ExamplePage.data';

interface Props {
  gameAssets: GameAsset[];
  logoAssets: LogoAsset[];
}

export default function ExamplePage(props: Props) {
  const { gameAssets, logoAssets } = props;

  React.useEffect(() => {
    console.log(gameAssets, logoAssets);
  }, [gameAssets, logoAssets]);

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
