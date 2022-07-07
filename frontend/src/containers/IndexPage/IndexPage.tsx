import React from 'react';
import { Greeter } from 'react-just-parallax';

import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';

export default function IndexPage() {
  React.useEffect(() => {
    console.log(Greeter('test4'));
  }, []);

  return (
    <>
      <Head />
      <S.Wrapper style={{ fontSize: 16 }}>test</S.Wrapper>
    </>
  );
}
