import React from 'react';

import { useMediaPreload } from 'hooks/useMediaPreload';

import * as S from './PreloadImage.styles';

interface Props {
  imageSrc: string;
  alt: string;
}

export const PreloadImage = (props: Props) => {
  const { alt, imageSrc } = props;

  const { isLoaded } = useMediaPreload({ isImage: true, mediaSrc: imageSrc });

  return (
    <>
      <S.Image isLoaded={isLoaded} src={imageSrc} alt={alt} />
    </>
  );
};
