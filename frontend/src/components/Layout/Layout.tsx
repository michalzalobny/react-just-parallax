import React, { useEffect } from 'react';

import { CopyInfo } from 'sections/CopyInfo/CopyInfo';

import * as S from './Layout.styles';

interface Props {
  isReady: boolean;
  children: React.ReactChild;
  repoHref?: string;
}

export const Layout = (props: Props) => {
  const { repoHref, children, isReady } = props;

  useEffect(() => {
    if (isReady && !document.body.classList.contains('isReady')) {
      document.body.classList.add('isReady');
    }
    return () => {
      document.body.classList.remove('isReady');
    };
  }, [isReady]);

  return (
    <>
      <S.ReadyWrapper isReady={isReady}></S.ReadyWrapper>

      <CopyInfo repoHref={repoHref} />
      {children}
    </>
  );
};
