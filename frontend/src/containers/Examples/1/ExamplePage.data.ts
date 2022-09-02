import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      test: '',
    },
  };
};
