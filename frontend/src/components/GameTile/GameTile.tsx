import React, { useCallback, useMemo, useRef } from 'react';
import { ScrollParallax } from 'react-just-parallax';

import { PreloadImage } from 'components/PreloadImage/PreloadImage';
import { seedRandom } from 'utils/functions/seedRandom';

import * as S from './GameTile.styles';
import { LogoAsset } from 'containers/Examples/1/ExamplePage.data';

interface Props {
  imageSrc: string;
  alt: string;
  title: string;
  scrollContainer: React.MutableRefObject<HTMLDivElement | null>;
  logoAssets: LogoAsset[];
  itemKey: number;
}

export const GameTile = (props: Props) => {
  const { itemKey, logoAssets, scrollContainer, title, alt, imageSrc } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const seedRandom1 = useMemo(() => {
    const t = seedRandom(title.substring(0, itemKey + 2));
    return t[itemKey % 4];
  }, [itemKey, title]);

  const getSeed = useCallback(
    (offset: number) => {
      return (seedRandom1 + offset) % logoAssets.length;
    },
    [logoAssets.length, seedRandom1]
  );

  return (
    <>
      <S.TileContainer>
        <ScrollParallax
          shouldPause={false}
          zIndex={100}
          strength={-0.2}
          isAbsolutelyPositioned
          scrollContainerRef={scrollContainer}
        >
          <S.IconWrapper yTranslate={0} xTranslate={-50} style={{ width: 220 }}>
            <PreloadImage
              shouldContain
              alt={logoAssets[getSeed(0)].name}
              imageSrc={logoAssets[getSeed(0)].src}
            />
          </S.IconWrapper>

          <S.IconWrapper yTranslate={-40} xTranslate={-20} style={{ width: 110 }}>
            <PreloadImage
              shouldContain
              alt={logoAssets[getSeed(2)].name}
              imageSrc={logoAssets[getSeed(2)].src}
            />
          </S.IconWrapper>
        </ScrollParallax>

        <S.ImageContainer>
          <ScrollParallax lerpEase={0.08} strength={0.1} scrollContainerRef={scrollContainer}>
            <S.ImageWrapper ref={containerRef}>
              <PreloadImage imageSrc={imageSrc} alt={alt} />
            </S.ImageWrapper>
          </ScrollParallax>
          <S.TitleWrapper>
            <S.Title>{title}</S.Title>
          </S.TitleWrapper>
        </S.ImageContainer>
      </S.TileContainer>
    </>
  );
};
