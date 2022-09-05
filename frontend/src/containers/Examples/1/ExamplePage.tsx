import React, { useRef } from 'react';

import { Head } from 'seo/Head/Head';
import { GameTile } from 'components/GameTile/GameTile';
import { LinkHandler } from 'components/LinkHandler/LinkHandler';

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
      <S.GithubWrapper>
        <LinkHandler
          isExternal
          elHref={
            'https://github.com/michalzalobny/react-just-parallax/tree/main/frontend/src/containers/Examples/1'
          }
        >
          <S.GithubLink>This page&#8216;s code</S.GithubLink>
        </LinkHandler>
      </S.GithubWrapper>
      <Head />
      <S.ScrollContainer ref={scrollContainerRef}>
        <S.Wrapper initial="initial" animate="animate">
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
