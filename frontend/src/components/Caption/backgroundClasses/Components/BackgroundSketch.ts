import { Bounds, UpdateInfo } from 'utils/sharedTypes';

interface Constructor {
  ctx: CanvasRenderingContext2D | null;
}

export class BackgroundSketch {
  _rendererBounds: Bounds = { width: 100, height: 0 };
  _translateOffset = { x: 0, y: 0 };
  _opacity = 1;
  _ctx: CanvasRenderingContext2D | null;
  _pixelRatio = 1;
  _scrollRatioRest = 0;

  constructor({ ctx }: Constructor) {
    this._ctx = ctx;
  }

  update(updateInfo: UpdateInfo) {
    if (!this._ctx) return;
    this._drawBackground();
  }

  _drawBackground() {
    if (!this._ctx) return;

    this._ctx.beginPath();

    const segments = 20;

    const widthSegments = Math.ceil(this._rendererBounds.width / segments);
    this._ctx.moveTo(this._rendererBounds.width, this._rendererBounds.height);
    this._ctx.lineTo(0, this._rendererBounds.height);

    const t = (1 - this._scrollRatioRest) * this._rendererBounds.height;
    const amplitude = this._rendererBounds.width * 0.1 * Math.sin(this._scrollRatioRest * Math.PI);

    this._ctx.lineTo(0, t);

    for (let index = 0; index <= widthSegments; index++) {
      const n = segments * index;
      const r = t - Math.sin((n / this._rendererBounds.width) * Math.PI) * amplitude;

      this._ctx.lineTo(n, r);
    }

    this._ctx.fillStyle = '#9BDBD8';
    this._ctx.fill();
  }

  setRendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
    if (!this._ctx) return;
  }

  setPixelRatio(value: number) {
    this._pixelRatio = value;
  }

  setScrollRatioRest(value: number) {
    this._scrollRatioRest = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {}
}
