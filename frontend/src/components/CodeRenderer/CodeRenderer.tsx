import SyntaxHighlighter from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import * as S from './CodeRenderer.styles';

interface Props {
  codeText: string;
}

export const CodeRenderer = (props: Props) => {
  const { codeText } = props;

  return (
    <>
      <S.SyntaxTop>
        <S.SyntaxDot $offsetX={0} $bgColor={'#FF5F56'} />
        <S.SyntaxDot $offsetX={150} $bgColor={'#FFBD2E'} />
        <S.SyntaxDot $offsetX={300} $bgColor={'#27C93F'} />
      </S.SyntaxTop>
      <S.SyntaxWrapper>
        <SyntaxHighlighter showLineNumbers={false} language="jsx" style={nord}>
          {codeText}
        </SyntaxHighlighter>
      </S.SyntaxWrapper>
    </>
  );
};
