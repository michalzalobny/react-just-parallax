export const breakpoints = {
  tablet: 767,
  tabletLand: 992,
  desktop: 1920,
};

const customMediaQuery = (minWidth: number) =>
  `@media only screen and (min-width: ${minWidth / 16}em)`;

export const media = {
  custom: customMediaQuery,
  tablet: customMediaQuery(breakpoints.tablet),
  tabletLand: customMediaQuery(breakpoints.tabletLand),
  desktop: customMediaQuery(breakpoints.desktop),
};
