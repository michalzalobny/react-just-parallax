import { Bounds, UpdateInfo } from 'utils/sharedTypes';

interface Constructor {
  text: string;
  ctx: CanvasRenderingContext2D | null;
}

export class TextSketch {
  _rendererBounds: Bounds = { width: 100, height: 100 };
  _translateOffset = { x: 0, y: 0 };
  _textValue: string;
  _opacity = 1;
  _ctx: CanvasRenderingContext2D | null;
  _pixelRatio = 1;
  _textMeasures = { width: 0, height: 0, fontSize: 0 };

  constructor({ text, ctx }: Constructor) {
    this._ctx = ctx;
    this._textValue = text;
  }

  update(updateInfo: UpdateInfo) {
    if (!this._ctx) return;
    this._ctx.font = `bold ${this._textMeasures.fontSize}px opensans`;

    this._ctx.fillStyle = `rgba(0,0,0,${this._opacity})`;

    this._ctx.fillText(
      this._textValue,
      this._rendererBounds.width / 2 - this._textMeasures.width / 2 + this._translateOffset.x,
      this._rendererBounds.height / 2 + this._textMeasures.height / 2 + this._translateOffset.y
    );
  }

  setRendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
    if (!this._ctx) return;
    const metrics = this._ctx.measureText(this._textValue);
    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    this._textMeasures.height = actualHeight;
    this._textMeasures.width = metrics.width;
    this._textMeasures.fontSize = this._rendererBounds.height * 0.4;
  }

  setPixelRatio(value: number) {
    this._pixelRatio = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {}
}
