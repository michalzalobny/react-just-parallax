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

  _rendererBounds: Bounds = { width: 100, height: 0 };
  _translateOffset = { x: 0, y: 0 };
  _textValue: string;
  _opacity = 1;
  _ctx: CanvasRenderingContext2D | null;
  _pixelRatio = 1;
  _textMeasures = { width: 0, height: 0, fontSize: 0 };
  _transitionTl: gsap.core.Timeline | null = null;
  _scrollRatio = 0;
  _scrollRatioQuicker = 0;

  constructor({ text, ctx }: Constructor) {
    this._ctx = ctx;
    this._textValue = text;
  }

  update(updateInfo: UpdateInfo) {
    if (!this._ctx) return;
    this._ctx.font = `bold ${this._textMeasures.fontSize}px teko`;

    this._ctx.fillStyle = `rgba(0,0,0,${this._opacity})`;

    this._ctx.fillText(
      this._textValue,
      this._rendererBounds.width * TextSketch.edgeSize +
        this._translateOffset.x -
        this._textMeasures.width * this._scrollRatioQuicker * 0.52 - //defines when to stop offseting
        this._textMeasures.width * 0.01, //extra letter offset due to font settings
      this._rendererBounds.height / 2 + this._textMeasures.height / 2 + this._translateOffset.y
    );

    this._drawRects();
  }

  _drawRects() {
    if (!this._ctx) return;
    this._ctx.fillStyle = App.backgroundColor;
    const edgeRounded = Math.round(this._rendererBounds.width * TextSketch.edgeSize);

    const leftX = edgeRounded;
    const leftY = this._rendererBounds.height;

    this._ctx.clearRect(0, 0, leftX, leftY);
    this._ctx.fillRect(0, 0, leftX, leftY);

    const rightXStart = this._rendererBounds.width - edgeRounded;
    const rightYStart = 0;
    const rightXEnd = this._rendererBounds.width;
    const rightYEnd = this._rendererBounds.height;

    this._ctx.clearRect(rightXStart, rightYStart, rightXEnd, rightYEnd);
    this._ctx.fillRect(rightXStart, rightYStart, rightXEnd, rightYEnd);
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

  _animateFontSize(destination: number, duration: number) {
    return gsap.to(this._textMeasures, {
      fontSize: destination,
      duration,
      ease: TextSketch.defaultEase,
      onUpdate: () => {
        this._updateFontSize();
      },
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

  animateIn() {
    this._transitionTl = gsap.timeline();

    this._transitionTl;
    // .add(this._animateOffsetX(-300, 1.2))
    // .add(this._animateFontSize(900, 2.5));
    // .add(this._animateOffsetX(0, 1.2))
    // .add(this._animateFontSize(100, 0.8));
  }

  destroy() {
    this._transitionTl && this._transitionTl.kill();
  }
}
