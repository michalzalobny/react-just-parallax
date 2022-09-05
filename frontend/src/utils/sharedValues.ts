const DEFAULT_FPS = 60;

export const sharedValues = {
  colors: {
    trueBlack: '#000000',
    trueWhite: '#ffffff',
    black: '#161616',
    lightGray: '#f5f5f5',
    lightPurple: '#F0F0FF',
    purple: '#755DB5',
    blue: '#3087ff',
  },
  spacing: {
    s1: '15px',
    s2: '30px',
    s3: '8px',
  },
  timings: {
    t1: 'cubic-bezier(0.64, 0.02, 0.16, 0.97)',
  },
  motion: {
    DEFAULT_FPS: DEFAULT_FPS,
    DT_FPS: 1000 / DEFAULT_FPS,
    LERP_EASE: 0.07,
    MOMENTUM_DAMPING: 0.8,
    MOMENTUM_CARRY: 0.6,
    tween2: {
      type: 'tween',
      ease: [0.64, 0.02, 0.16, 0.97],
      duration: 0.8,
    },
    springSlow: {
      type: 'spring',
      stiffness: 350,
      damping: 80,
      mass: 5,
      restDelta: 0.001,
      restSpeed: 0.001,
    },
  },
  ISR_TIMEOUT: 5,
};
