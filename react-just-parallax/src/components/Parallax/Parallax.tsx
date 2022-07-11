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
  const {
    children,
    strength = 0.2,
    boundRef,
    shouldResetPosition = false,
  } = props;
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
    let xMultiplier = windowSizeRef.current.windowWidth;
    let yMultiplier = windowSizeRef.current.windowHeight;

    if (boundRef && boundRef.current) {
      xMultiplier = boundRefRect.current.width;
      yMultiplier = boundRefRect.current.height;
    }

    //Maps movement to exact mouse position
    xMultiplier *= 0.5;
    yMultiplier *= 0.5;

    //Changes direction and strength
    xMultiplier *= -strength;
    yMultiplier *= -strength;

    spanRef.current.style.transform = `translate(${
      currentX.current * xMultiplier
    }px, ${currentY.current * yMultiplier}px)`;
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

  const normalizeXY = (x: number, y: number) => {
    let xComponent = windowSizeRef.current.windowWidth;
    let yComponent = windowSizeRef.current.windowHeight;
    let relativeX = x;
    let relativeY = y;

    if (boundRef && boundRef.current) {
      xComponent = boundRefRect.current.width;
      yComponent = boundRefRect.current.height;
      relativeX = x - boundRefRect.current.x;
      relativeY = y - boundRefRect.current.y;
    }

    return {
      x: (relativeX / xComponent) * 2 - 1, // -1 to 1, left to right,
      y: (relativeY / yComponent) * 2 - 1, // -1 to 1, from top to bottom
    };
  };

  const onMouseMove = (e: DispatchEvent) => {
    const mouseX = (e.target as MouseMove).mouse.x;
    const mouseY = (e.target as MouseMove).mouse.y;

    const { x, y } = normalizeXY(mouseX, mouseY);

    targetX.current = x;
    targetY.current = y;
  };

  const handleMouseLeave = () => {
    if (shouldResetPosition) {
      targetX.current = 0;
      targetY.current = 0;
    }
  };

  const onTouchStart = (event: TouchEvent | MouseEvent) => {
    const mouseX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const mouseY =
      "touches" in event ? event.touches[0].clientY : event.clientY;

    const { x, y } = normalizeXY(mouseX, mouseY);

    if (x <= -1 || x >= 1 || y >= 1 || y <= -1) {
      handleMouseLeave();
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

    let eventTarget = window;

    if (boundRef && boundRef.current) {
      handleBoundRefRecalc();
      eventTarget = boundRef.current;
      window.addEventListener("scroll", handleBoundRefRecalcDebounced, {
        passive: true,
      });
      window.addEventListener("resize", handleBoundRefRecalcDebounced, {
        passive: true,
      });
    }

    mouseMove.current.addEventListener("mousemove", onMouseMove);
    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("touchstart", onTouchStart);
    eventTarget.addEventListener("mouseout", handleMouseLeave);

    return () => {
      stopAppFrame();
      mouseMove.current.destroy();

      if (boundRef && boundRef.current) {
        window.removeEventListener("scroll", handleBoundRefRecalcDebounced);
        window.removeEventListener("resize", handleBoundRefRecalcDebounced);
      }

      mouseMove.current.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("touchstart", onTouchStart);
      eventTarget.removeEventListener("mouseout", handleMouseLeave);
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
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {children}
    </span>
  );
};
