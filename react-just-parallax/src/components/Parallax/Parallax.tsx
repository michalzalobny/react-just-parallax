import React, { useEffect, useRef } from "react";
import sync, { cancelSync, FrameData, Process } from "framesync";
import debounce from "lodash.debounce";

import { useWindowSize } from "../../hooks/useWindowSize";
import { lerp } from "../../utils/lerp";
import { MouseMove } from "../../utils/MouseMove";
import { Event as DispatchEvent } from "../../utils/EventDispatcher";

export interface ParallaxProps {
  strength?: number;
  children?: React.ReactNode;
  boundRef?: React.MutableRefObject<any>;
  shouldResetPosition?: boolean;
}

const LERP_EASE = 0.06;
const DEFAULT_FPS = 60;
const DT_FPS = 1000 / DEFAULT_FPS;

interface BoundRefRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const defaultRect: BoundRefRect = {
  height: 1,
  width: 1,
  x: 1,
  y: 1,
};

export const Parallax = (props: ParallaxProps) => {
  const { children, strength = 0.2, boundRef, shouldResetPosition } = props;
  const { windowSizeRef } = useWindowSize();
  const spanRef = useRef<null | HTMLSpanElement>(null);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const syncRenderRef = useRef<null | Process>(null);
  const syncUpdateRef = useRef<null | Process>(null);
  const boundRefRect = useRef<BoundRefRect>(defaultRect);
  const mouseMove = useRef(new MouseMove());

  const resumeAppFrame = () => {
    syncRenderRef.current = sync.render(syncOnRender, true);
    syncUpdateRef.current = sync.update(syncOnUpdate, true);
  };

  const syncOnRender = () => {
    if (!spanRef.current) return;
    spanRef.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;
  };
  const syncOnUpdate = ({ delta }: FrameData) => {
    let slowDownFactor = delta / DT_FPS;

    mouseMove.current.update();

    // Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }

    const newX = lerp(
      currentX.current,
      targetX.current,
      LERP_EASE * slowDownFactor
    );
    currentX.current = newX;

    const newY = lerp(
      currentY.current,
      targetY.current,
      LERP_EASE * slowDownFactor
    );
    currentY.current = newY;
  };

  const stopAppFrame = () => {
    if (syncRenderRef.current) cancelSync.render(syncRenderRef.current);
    if (syncUpdateRef.current) cancelSync.update(syncUpdateRef.current);
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      stopAppFrame();
    } else {
      resumeAppFrame();
    }
  };

  const onMouseMove = (event: DispatchEvent) => {
    let referenceElWidth = 0;
    let referenceElHeight = 0;
    let relativeMousePositionX = 0;
    let relativeMousePositionY = 0;

    if (boundRef && boundRef.current) {
      referenceElWidth = boundRefRect.current.width;
      referenceElHeight = boundRefRect.current.height;
      relativeMousePositionX = event.target.mouse.x - boundRefRect.current.x;
      relativeMousePositionY = event.target.mouse.y - boundRefRect.current.y;
    } else {
      referenceElWidth = windowSizeRef.current.windowWidth;
      referenceElHeight = windowSizeRef.current.windowHeight;
      relativeMousePositionX = event.target.mouse.x;
      relativeMousePositionY = event.target.mouse.y;
    }

    const offsetRatioX =
      -(relativeMousePositionX - referenceElWidth / 2) * strength;

    const offsetRatioY =
      -(relativeMousePositionY - referenceElHeight / 2) * strength;

    targetX.current = offsetRatioX;
    targetY.current = offsetRatioY;
  };

  const onMouseOut = () => {
    if (shouldResetPosition) {
      targetX.current = 0;
      targetY.current = 0;
    }
  };

  const handleBoundRefRecalc = () => {
    if (!boundRef || !boundRef.current) return;
    const boundingBox = boundRef.current.getBoundingClientRect();
    boundRefRect.current = {
      x: boundingBox.x,
      y: boundingBox.y,
      width: boundRef.current.clientWidth,
      height: boundRef.current.clientHeight,
    };
  };

  const handleBoundRefRecalcDebounced = debounce(handleBoundRefRecalc, 50);

  useEffect(() => {
    mouseMove.current.init(boundRef);
    resumeAppFrame();

    if (boundRef && boundRef.current) {
      window.addEventListener("scroll", handleBoundRefRecalcDebounced, {
        passive: true,
      });
      window.addEventListener("resize", handleBoundRefRecalcDebounced, {
        passive: true,
      });
    }

    window.addEventListener("visibilitychange", onVisibilityChange);
    mouseMove.current.addEventListener("mousemove", onMouseMove);
    mouseMove.current.addEventListener("left", onMouseOut);

    return () => {
      stopAppFrame();
      mouseMove.current.destroy();

      if (boundRef && boundRef.current) {
        window.removeEventListener("scroll", handleBoundRefRecalcDebounced);
        window.removeEventListener("resize", handleBoundRefRecalcDebounced);
      }

      window.removeEventListener("visibilitychange", onVisibilityChange);
      mouseMove.current.removeEventListener("mousemove", onMouseMove);
      mouseMove.current.removeEventListener("left", onMouseOut);
    };
  }, []);

  return (
    <span
      ref={spanRef}
      style={{
        backfaceVisibility: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        display: "inline-block",
        background: "rgba(255,255,0, 0.3)",
      }}
    >
      {children}
    </span>
  );
};
