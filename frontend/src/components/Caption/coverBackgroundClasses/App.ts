import debounce from 'lodash.debounce';
import { MotionValue } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';
import { Bounds } from 'utils/sharedTypes';

import { BackgroundSketch } from './Components/BackgroundSketch';

interface Constructor {
  rendererEl: HTMLDivElement | null;
  scrollRatio: MotionValue<any>;
}

export class App {
  _rendererEl: HTMLDivElement;
  _rafId: number | null = null;
  _isResumed = true;
  _lastFrameTime: number | null = null;
  _canvas: HTMLCanvasElement;
  _pixelRatio = 1;
  _ctx: CanvasRenderingContext2D | null;
  _rendererBounds: Bounds = { width: 100, height: 100 };
  _backgroundSketch: BackgroundSketch;

  constructor({ scrollRatio, rendererEl }: Constructor) {
    this._rendererEl = rendererEl as HTMLDivElement;
    this._canvas = document.createElement('canvas');
    this._rendererEl.appendChild(this._canvas);
    this._ctx = this._canvas.getContext('2d');
    this._backgroundSketch = new BackgroundSketch({
      ctx: this._ctx,
    });

    this._onResize();
    this._addListeners();
    this._resumeAppFrame();

    scrollRatio.onChange(v => {
      this._backgroundSketch.setScrollRatio(v as number);
    });
  }

  _onResizeDebounced = debounce(() => this._onResize(), 300);

  _onResize() {
    const clientRect = this._rendererEl.getBoundingClientRect();
    this._rendererBounds.width = clientRect.width;
    this._rendererBounds.height = clientRect.height;
    this._pixelRatio = Math.min(window.devicePixelRatio, 2);
    this._setSizes();
    this._backgroundSketch.setRendererBounds(this._rendererBounds);
    this._backgroundSketch.setPixelRatio(this._pixelRatio);
  }

  _setSizes() {
    if (this._canvas && this._ctx) {
      //The render stays sharp on devices with higher devicePixelRatio (retina)
      const w = this._rendererBounds.width;
      const h = this._rendererBounds.height;
      const ratio = this._pixelRatio;

      this._canvas.width = w * ratio;
      this._canvas.height = h * ratio;
      this._canvas.style.width = w.toString() + 'px';
      this._canvas.style.height = h.toString() + 'px';
      this._ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  }

  _onLoaded() {
    this._backgroundSketch.setRendererBounds(this._rendererBounds);
  }

  _onVisibilityChange = () => {
    if (document.hidden) {
      this._stopAppFrame();
    } else {
      this._resumeAppFrame();
    }
  };

  _addListeners() {
    window.addEventListener('resize', this._onResizeDebounced);
    window.addEventListener('visibilitychange', this._onVisibilityChange);
  }

  _removeListeners() {
    window.removeEventListener('resize', this._onResizeDebounced);
    window.removeEventListener('visibilitychange', this._onVisibilityChange);
  }

  _clear() {
    if (!this._ctx) return;
    this._ctx.save();
    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.restore();
  }

  _resumeAppFrame() {
    this._isResumed = true;
    if (!this._rafId) {
      this._rafId = window.requestAnimationFrame(this._renderOnFrame);
    }
  }

  _renderOnFrame = (time: number) => {
    this._rafId = window.requestAnimationFrame(this._renderOnFrame);

    if (this._isResumed || !this._lastFrameTime) {
      this._lastFrameTime = window.performance.now();
      this._isResumed = false;
      return;
    }

    const delta = time - this._lastFrameTime;
    let slowDownFactor = delta / sharedValues.motion.DT_FPS;

    //Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    this._lastFrameTime = time;

    this._clear();
    this._backgroundSketch.update({ delta, slowDownFactor, time });
  };

  _stopAppFrame() {
    if (this._rafId) {
      window.cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  destroy() {
    if (this._canvas.parentNode) {
      this._canvas.parentNode.removeChild(this._canvas);
    }
    this._stopAppFrame();
    this._removeListeners();

    this._backgroundSketch.destroy();
  }
}
