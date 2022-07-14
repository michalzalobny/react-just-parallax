export interface ScrollValues {
  xOffset: number;
  yOffset: number;
  xMaxOffset: number;
  yMaxOffset: number;
}

export const defaultScrollValues: ScrollValues = {
  xMaxOffset: 1,
  xOffset: 1,
  yMaxOffset: 1,
  yOffset: 1,
};

export const getViewportScrollOffsets = () => {
  return {
    xOffset: window.pageXOffset,
    yOffset: window.pageYOffset,
    xMaxOffset: document.body.clientWidth - window.innerWidth,
    yMaxOffset: document.body.clientHeight - window.innerHeight,
  };
};

export const getElementScrollOffsets = (element: HTMLElement) => {
  return {
    xOffset: element.scrollLeft,
    yOffset: element.scrollTop,
    xMaxOffset: element.scrollWidth - element.offsetWidth,
    yMaxOffset: element.scrollHeight - element.offsetHeight,
  };
};
