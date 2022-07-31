import { gsap } from 'gsap';

import { Bounds, UpdateInfo } from 'utils/sharedTypes';

import { App } from '../App';

interface Constructor {
  text: string;
  ctx: CanvasRenderingContext2D | null;
}

export class TextSketch {
  static defaultEase = 'expo.inOut';
  static edgeSize = 0.07;

  _rendererBounds: Bounds = { width: 1, height: 1 };
  _translateOffset = { x: 0, y: 0 };
  _textValue: string;
  _ctx: CanvasRenderingContext2D | null;
  _pixelRatio = 1;
  _textMeasures = { width: 0, height: 0, fontSize: 0 };
  _transitionTl: gsap.core.Timeline | null = null;
  _scrollRatio = 0;
  _scrollRatioQuicker = 0;
  _scrollRatioRest = 0;

  constructor({ text, ctx }: Constructor) {
    this._ctx = ctx;
    this._textValue = text;
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

    this._ctx.fillStyle = 'rgb(244,244,244)';
    this._ctx.fill();
  }

  _clipRect() {
    if (!this._ctx) return;
    const edgeRounded = Math.round(this._rendererBounds.width * TextSketch.edgeSize);
    const leftX = edgeRounded;

    this._ctx.beginPath();
    this._ctx.rect(leftX, 0, this._rendererBounds.width - 2 * leftX, this._rendererBounds.height);
    this._ctx.clip();
  }

  _scaleContext() {
    if (!this._ctx) return;

    const desiredScale = 1 - 0.51 * this._scrollRatioRest;
    const scale = desiredScale * this._pixelRatio;
    const sFactor = (scale - 1 * this._pixelRatio) * 0.5;
    const tX = -this._rendererBounds.width * sFactor;
    const tY = -this._rendererBounds.height * sFactor;
    this._ctx.setTransform(scale, 0, 0, scale, tX, tY);
  }

  _drawText() {
    if (!this._ctx) return;
    this._ctx.fillText(
      this._textValue,
      this._textMeasures.width * this._scrollRatioRest * 0.53 * 0.5 +
        this._rendererBounds.width * TextSketch.edgeSize +
        this._translateOffset.x -
        this._textMeasures.width * this._scrollRatioQuicker * 0.52 - //defines when to stop offseting
        this._textMeasures.width * 0.01, //extra letter offset due to font settings
      this._rendererBounds.height / 2 +
        this._textMeasures.height / 2 +
        this._translateOffset.y -
        this._textMeasures.width * -this._scrollRatioRest * 0.05 * 0
    );
  }

  update(updateInfo: UpdateInfo) {
    if (!this._ctx) return;

    this._ctx.font = `bold ${this._textMeasures.fontSize}px teko`;

    if (this._ctx) this._ctx.globalCompositeOperation = 'source-over';
    this._ctx.fillStyle = App.backgroundColor;
    this._ctx.fillRect(0, 0, this._rendererBounds.width, this._rendererBounds.height);

    if (this._ctx) this._ctx.globalCompositeOperation = 'source-over';
    this._drawBackground();
    if (this._ctx) this._ctx.globalCompositeOperation = 'xor';

    this._ctx.save();
    this._clipRect();
    this._scaleContext();

    this._drawText();
    this._ctx.restore();
  }

  _animateOffsetY(destination: number, duration: number) {
    return gsap.to(this._translateOffset, {
      y: destination,
      duration,
      ease: TextSketch.defaultEase,
    });
  }

  _animateOffsetX(destination: number, duration: number) {
    return gsap.to(this._translateOffset, {
      x: destination,
      duration,
      ease: TextSketch.defaultEase,
    });
  }

  _updateFontSize() {
    if (!this._ctx) return;
    this._ctx.font = `bold ${this._textMeasures.fontSize}px teko`;

    const metrics = this._ctx.measureText(this._textValue);
    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    this._textMeasures.height = actualHeight;
    this._textMeasures.width = metrics.width;
  }

  setRendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
    if (!this._ctx) return;

    this._textMeasures.fontSize = this._rendererBounds.width * 0.417;
    this._updateFontSize();
  }

  setPixelRatio(value: number) {
    this._pixelRatio = value;
  }

  setScrollRatio(value: number) {
    this._scrollRatio = value;
  }

  setScrollRatioQuicker(value: number) {
    this._scrollRatioQuicker = value;
  }

  setScrollRatioRest(value: number) {
    this._scrollRatioRest = value;
  }

  animateIn() {
    this._transitionTl = gsap.timeline();

    // this._transitionTl.add(this._animateOffsetY(0, 1.5));
    // .add(this._animateOffsetX(0, 1.2))
  }

  destroy() {
    this._transitionTl && this._transitionTl.kill();
  }
}
