import { HeadProps } from 'seo/Head/Head';

export interface DomRectSSR {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface Bounds {
  width: number;
  height: number;
}

interface Coords {
  x: number;
  y: number;
}

export interface Mouse {
  current: Coords;
  target: Coords;
}

export interface PageProps {
  head: HeadProps;
  repoHref?: string;
}

export interface UpdateInfo {
  slowDownFactor: number;
  delta: number;
  time: number;
}

export interface Bounds {
  width: number;
  height: number;
}
