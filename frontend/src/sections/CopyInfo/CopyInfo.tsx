import React from 'react';

import { LinkHandler } from 'components/LinkHandler/LinkHandler';

import * as S from './CopyInfo.styles';

interface Props {
  repoHref?: string;
}

export const CopyInfo = (props: Props) => {
  const { repoHref = 'https://github.com/michalzalobny/react-just-parallax' } = props;

  return (
    <>
      <S.GithubWrapper>
        <LinkHandler isExternal elHref={repoHref}>
          <S.GithubLink>GitHub repo</S.GithubLink>
        </LinkHandler>
      </S.GithubWrapper>
      <S.AuthorWrapper>
        React Just Parallax by
        <LinkHandler isExternal elHref="https://twitter.com/michalzalobny">
          <S.AuthorLink>@michalzalobny</S.AuthorLink>
        </LinkHandler>
      </S.AuthorWrapper>
    </>
  );
};
