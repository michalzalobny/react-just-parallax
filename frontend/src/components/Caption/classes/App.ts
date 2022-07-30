import debounce from 'lodash.debounce';
import FontFaceObserver from 'fontfaceobserver';
import { MotionValue } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';
import { Bounds } from 'utils/sharedTypes';

import { TextSketch } from './Components/TextSketch';

interface Constructor {
  rendererEl: HTMLDivElement;
  setShouldReveal: React.Dispatch<React.SetStateAction<boolean>>;
  scrollRatio: MotionValue<any>;
  scrollRatioQuicker: MotionValue<any>;
  scrollRatioRest: MotionValue<any>;
}

export class App {
  static backgroundColor = 'rgba(255,255,255,1)';

  _rendererEl: HTMLDivElement;
  _rafId: number | null = null;
  _isResumed = true;
  _lastFrameTime: number | null = null;
  _canvas: HTMLCanvasElement;
  _pixelRatio = 1;
  _ctx: CanvasRenderingContext2D | null;
  _setShouldRevealReact;
  _rendererBounds: Bounds = { width: 100, height: 100 };
  _textSketch: TextSketch;
  _scrollRatioRest = 0;

  constructor({
    scrollRatioRest,
    rendererEl,
    setShouldReveal,
    scrollRatio,
    scrollRatioQuicker,
  }: Constructor) {
    this._rendererEl = rendererEl;
    this._setShouldRevealReact = setShouldReveal;
    this._canvas = document.createElement('canvas');
    this._rendererEl.appendChild(this._canvas);
    this._ctx = this._canvas.getContext('2d');
    this._textSketch = new TextSketch({
      ctx: this._ctx,
      text: 'PARA LLAX',
    });

    this._preloadFont();
    this._onResize();
    this._addListeners();
    this._resumeAppFrame();

    scrollRatio.onChange(v => {
      this._textSketch.setScrollRatio(v as number);
    });

    scrollRatioQuicker.onChange(v => {
      this._textSketch.setScrollRatioQuicker(v as number);
    });

    scrollRatioRest.onChange(v => {
      this._textSketch.setScrollRatioRest(v as number);
      this._scrollRatioRest = v as number;
    });
  }

  _onResizeDebounced = debounce(() => this._onResize(), 300);

  _onResize() {
    const clientRect = this._rendererEl.getBoundingClientRect();
    this._rendererBounds.width = clientRect.width;
    this._rendererBounds.height = clientRect.height;
    this._pixelRatio = Math.min(window.devicePixelRatio, 2);
    this._setSizes();
    this._textSketch.setRendererBounds(this._rendererBounds);
    this._textSketch.setPixelRatio(this._pixelRatio);
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

  _preloadFont() {
    const fontA = new FontFaceObserver('opensans');
    const fontB = new FontFaceObserver('teko');

    Promise.all([fontA.load(null, 2500), fontB.load(null, 2500)])
      .then(
        () => {
          this._onLoaded();
        },
        () => {
          this._onLoaded();
          console.warn('Fonts were loading too long (over 1500ms)');
        }
      )
      .catch(err => {
        this._onLoaded();
        console.warn('Some critical font are not available:', err);
      });
  }

  _onLoaded() {
    this._textSketch.setRendererBounds(this._rendererBounds);
    this._setShouldRevealReact(true);
    this._textSketch.animateIn();
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
    this._textSketch.update({ delta, slowDownFactor, time });
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

    this._textSketch.destroy();
  }
}
