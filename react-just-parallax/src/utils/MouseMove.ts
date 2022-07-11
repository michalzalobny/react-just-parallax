import React from "react";

import { EventDispatcher } from "./EventDispatcher";

interface Mouse {
  x: number;
  y: number;
}

export class MouseMove extends EventDispatcher {
  _mouseLast: Mouse = { x: 0, y: 0 };
  _isTouching = false;
  mouse: Mouse = { x: 0, y: 0 };
  _targetEl: any | Window;

  constructor() {
    super();
  }

  _onTouchDown = (event: TouchEvent | MouseEvent) => {
    this._isTouching = true;
    this._mouseLast.x =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    this._mouseLast.y =
      "touches" in event ? event.touches[0].clientY : event.clientY;

    this.mouse.x = this._mouseLast.x;
    this.mouse.y = this._mouseLast.y;

    this.dispatchEvent({ type: "down" });
    this.dispatchEvent({ type: "mousemove" });
  };

  _onTouchMove = (event: TouchEvent | MouseEvent) => {
    const touchX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const touchY =
      "touches" in event ? event.touches[0].clientY : event.clientY;

    const deltaX = touchX - this._mouseLast.x;
    const deltaY = touchY - this._mouseLast.y;

    this._mouseLast.x = touchX;
    this._mouseLast.y = touchY;

    this.mouse.x += deltaX;
    this.mouse.y += deltaY;
    this.dispatchEvent({ type: "mousemove" });
  };

  _onTouchUp = () => {
    this._isTouching = false;
    this.dispatchEvent({ type: "up" });
    this.dispatchEvent({ type: "mousemove" });
  };

  _onMouseLeave = () => {
    this.dispatchEvent({ type: "left" });
  };

  _addEvents() {
    this._targetEl.addEventListener("mousedown", this._onTouchDown);
    this._targetEl.addEventListener("mousemove", this._onTouchMove, {
      passive: true,
    });
    this._targetEl.addEventListener("mouseup", this._onTouchUp);

    this._targetEl.addEventListener("touchstart", this._onTouchDown);
    this._targetEl.addEventListener("touchmove", this._onTouchMove, {
      passive: true,
    });
    this._targetEl.addEventListener("touchend", this._onTouchUp);

    this._targetEl.addEventListener("mouseout", this._onMouseLeave);
  }

  _removeEvents() {
    this._targetEl.removeEventListener("mousedown", this._onTouchDown);
    this._targetEl.removeEventListener("mousemove", this._onTouchMove);
    this._targetEl.removeEventListener("mouseup", this._onTouchUp);

    this._targetEl.removeEventListener("touchstart", this._onTouchDown);
    this._targetEl.removeEventListener("touchmove", this._onTouchMove);
    this._targetEl.removeEventListener("touchend", this._onTouchUp);

    this._targetEl.removeEventListener("mouseout", this._onMouseLeave);
  }

  init(targetEl?: React.MutableRefObject<any>) {
    this._targetEl = window;
    if (targetEl && targetEl.current) {
      this._targetEl = targetEl.current;
    }

    this._addEvents();
  }

  destroy() {
    this._removeEvents();
  }

  update() {
    const { mouse, _mouseLast } = this;

    _mouseLast.x = mouse.x;
    _mouseLast.y = mouse.y;
  }
}
