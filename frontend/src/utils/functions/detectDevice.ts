export const isIosMobile = () => {
  const userAgent = window.navigator.userAgent;
  return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
};
