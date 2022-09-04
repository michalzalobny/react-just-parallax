import { GetStaticProps } from 'next';

export interface GameAsset {
  src: string;
  name: string;
}

export interface LogoAsset {
  src: string;
  name: string;
}

export const getStaticProps: GetStaticProps = () => {
  const gameAssets: GameAsset[] = [
    {
      src: 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1662114954/Horizon_Forbidden_West_nvvpvs.jpg',
      name: 'Horizon Forbidden West',
    },
    {
      src: 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1662114954/cyberpunk_lsevxo.jpg',
      name: 'Cyberpunk 2077',
    },
    {
      src: 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1662114954/God-of-War-Ragnarok-Featured-image_wubfns.jpg',
      name: 'God of War Ragnarok',
    },

    {
      src: 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1662114954/spider_man_miles_morales_kx1klv.jpg',
      name: 'Spider-Man: Miles Morales',
    },
    {
      src: 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1662114956/fifa23_kkme4i.jpg',
      name: 'Fifa 23',
    },
    // {
    //   src: 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1662114954/ghost-of-tsushima_tsjwzk.jpg',
    //   name: 'Ghost of Tsushima',
    // },
  ];

  const logoAssets: LogoAsset[] = [
    {
      name: 'circle',
      src: 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1662115291/circle-nobg-min_rfxukx.png',
    },
    {
      name: 'square',
      src: 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1662115289/square-nobg-min_mfzkuk.png',
    },
    {
      name: 'cross',
      src: 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1662115289/cross-nobg-min_uxroih.png',
    },
    {
      name: 'triangle',
      src: 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1662115289/triangle-nobg-min_mrwsbp.png',
    },
  ];

  return {
    props: {
      gameAssets,
      logoAssets,
    },
  };
};
