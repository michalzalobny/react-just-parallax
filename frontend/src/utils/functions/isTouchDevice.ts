export const isBrowser = () => typeof window !== 'undefined';
export const isTouchDevice = () =>
  isBrowser() &&
  ('ontouchstart' in window ||
    'ontouchstart' in document.documentElement ||
    navigator.maxTouchPoints > 0);
