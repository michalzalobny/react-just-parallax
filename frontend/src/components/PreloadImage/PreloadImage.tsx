import React from 'react';

import { useMediaPreload } from 'hooks/useMediaPreload';

import * as S from './PreloadImage.styles';

interface Props {
  imageSrc: string;
  alt: string;
  shouldContain?: boolean;
}

export const PreloadImage = (props: Props) => {
  const { shouldContain = false, alt, imageSrc } = props;

  const { isLoaded } = useMediaPreload({ isImage: true, mediaSrc: imageSrc });

  return (
    <>
      <S.Image shouldContain={shouldContain} isLoaded={isLoaded} src={imageSrc} alt={alt} />
    </>
  );
};
