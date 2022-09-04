import React, { useRef } from 'react';

import { Head } from 'seo/Head/Head';
import { GameTile } from 'components/GameTile/GameTile';

import * as S from './ExamplePage.styles';
import { GameAsset, LogoAsset } from './ExamplePage.data';

interface Props {
  gameAssets: GameAsset[];
  logoAssets: LogoAsset[];
}

export default function ExamplePage(props: Props) {
  const { gameAssets, logoAssets } = props;

  const scrollContainerRef = useRef<null | HTMLDivElement>(null);

  return (
    <>
      <Head />
      <S.ScrollContainer ref={scrollContainerRef}>
        <S.Wrapper>
          {gameAssets.map((item, key) => (
            <GameTile
              itemKey={key}
              logoAssets={logoAssets}
              scrollContainer={scrollContainerRef}
              alt={item.name}
              title={item.name}
              imageSrc={item.src}
              key={item.src}
            />
          ))}
        </S.Wrapper>
      </S.ScrollContainer>
    </>
  );
}
