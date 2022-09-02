import React from 'react';
import Link from 'next/link';

import { PreloadImage } from 'components/PreloadImage/PreloadImage';
import { LinkHandler } from 'components/LinkHandler/LinkHandler';

import * as S from './CopyInfo.styles';
import logoSrc from './images/logo.svg';

interface Props {
  repoHref?: string;
}

export const CopyInfo = (props: Props) => {
  const { repoHref = 'https://www.npmjs.com/package/react-just-parallax' } = props;

  return (
    <>
      <S.GithubWrapper>
        <LinkHandler isExternal elHref={repoHref}>
          <S.GithubLink>Official NPM page</S.GithubLink>
        </LinkHandler>
      </S.GithubWrapper>
      <S.AuthorWrapper>
        React Just Parallax - showcase by
        <LinkHandler isExternal elHref="https://twitter.com/michalzalobny">
          <S.AuthorLink>@michalzalobny</S.AuthorLink>
        </LinkHandler>
      </S.AuthorWrapper>
      <Link href="/" passHref>
        <S.LogoWrapper>
          <PreloadImage shouldContain imageSrc={logoSrc as string} alt="React Just Parallax" />
        </S.LogoWrapper>
      </Link>
    </>
  );
};
