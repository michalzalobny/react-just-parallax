import React from 'react';
// import { Greeter } from '../../../../react-just-parallax/lib'; //temp solution instead of npm link
import { Parallax } from 'react-just-parallax';

import { Head } from 'seo/Head/Head';

import * as S from './IndexPage.styles';

export default function IndexPage() {
  // React.useEffect(() => {
  //   console.log(Greeter('test4'));
  // }, []);

  return (
    <>
      <Head />
      <S.Wrapper style={{ fontSize: 16 }}>
        <S.Container>
          <S.Box />
        </S.Container>
        <S.Container>
          <Parallax>
            <S.Box $floating />
          </Parallax>
        </S.Container>
        <S.Container>
          <S.Box />
        </S.Container>
        <S.Container>
          <S.Box $floating />
        </S.Container>
      </S.Wrapper>
    </>
  );
}
