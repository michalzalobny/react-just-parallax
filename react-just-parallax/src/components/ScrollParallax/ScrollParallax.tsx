import React, { useEffect, useRef } from "react";
import sync, { cancelSync, FrameData, Process } from "framesync";
import debounce from "lodash.debounce";

import { useWindowSize } from "../../hooks/useWindowSize";
import { lerp } from "../../utils/lerp";
import { isTouchDevice } from "../../utils/isTouchDevice";

export interface ScrollParallaxProps {
  strength?: number;
  children?: React.ReactNode;
  containerRef?: React.MutableRefObject<any>;
  enableOnTouchDevice?: boolean;
  lerpEase?: number;
}

const DEFAULT_FPS = 60;
const DT_FPS = 1000 / DEFAULT_FPS;

interface ContainerRefRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const defaultRect: ContainerRefRect = {
  height: 1,
  width: 1,
  x: 1,
  y: 1,
};

export const ScrollParallax = (props: ScrollParallaxProps) => {
  const {
    children,
    strength = 0.2,
    containerRef,
    enableOnTouchDevice = false,
    lerpEase = 0.06,
  } = props;
  const { windowSizeRef } = useWindowSize();
  const parallaxSpanRef = useRef<null | HTMLSpanElement>(null);
  const parentSpanRef = useRef<null | HTMLSpanElement>(null);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const syncRenderRef = useRef<null | Process>(null);
  const syncUpdateRef = useRef<null | Process>(null);
  const shouldUpdate = useRef(false);
  const containerRefRect = useRef<ContainerRefRect>(defaultRect);
  const observer = useRef<null | IntersectionObserver>(null);

  const resumeAppFrame = () => {
    if (!shouldUpdate.current) return;
    if (!parallaxSpanRef.current) return;
    parallaxSpanRef.current.style.willChange = "transform";

    syncRenderRef.current = sync.render(syncOnRender, true);
    syncUpdateRef.current = sync.update(syncOnUpdate, true);
  };

  const stopAppFrame = () => {
    if (!parallaxSpanRef.current) return;
    parallaxSpanRef.current.style.willChange = "auto"; //initial

    if (syncRenderRef.current) cancelSync.render(syncRenderRef.current);
    if (syncUpdateRef.current) cancelSync.update(syncUpdateRef.current);
  };

  const syncOnRender = () => {
    if (!parallaxSpanRef.current) return;
    let xMultiplier = windowSizeRef.current.windowWidth;
    let yMultiplier = windowSizeRef.current.windowHeight;

    if (containerRef && containerRef.current) {
      xMultiplier = containerRefRect.current.width;
      yMultiplier = containerRefRect.current.height;
    }

    //Maps movement to exact mouse position
    xMultiplier *= 0.5;
    yMultiplier *= 0.5;

    //Changes direction and strength
    xMultiplier *= -strength;
    yMultiplier *= -strength;

    parallaxSpanRef.current.style.transform = `translate(${
      currentX.current * xMultiplier
    }px, ${currentY.current * yMultiplier}px)`;
  };
  const syncOnUpdate = ({ delta }: FrameData) => {
    const diffX = Math.abs(targetX.current - currentX.current);
    const diffY = Math.abs(targetY.current - currentY.current);

    //Don't update if difference is too low
    if (diffX < 0.001 && diffY < 0.001) return;

    let slowDownFactor = delta / DT_FPS;

    // Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }

    const newX = lerp(
      currentX.current,
      targetX.current,
      lerpEase * slowDownFactor
    );
    currentX.current = newX;

    const newY = lerp(
      currentY.current,
      targetY.current,
      lerpEase * slowDownFactor
    );
    currentY.current = newY;
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

    if (containerRef && containerRef.current) {
      xComponent = containerRefRect.current.width;
      yComponent = containerRefRect.current.height;
      relativeX = x - containerRefRect.current.x;
      relativeY = y - containerRefRect.current.y;
    }

    return {
      x: (relativeX / xComponent) * 2 - 1, // -1 to 1, left to right,
      y: (relativeY / yComponent) * 2 - 1, // -1 to 1, from top to bottom
    };
  };

  const handleContainerRefRecalc = () => {
    if (!containerRef || !containerRef.current) return;

    const boundingBox = containerRef.current.getBoundingClientRect();
    containerRefRect.current = {
      x: boundingBox.x,
      y: boundingBox.y,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    };
  };

  const handleContainerRefRecalcDebounced = debounce(
    handleContainerRefRecalc,
    50
  );

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const isIntersecting = entries[0].isIntersecting;
    if (isIntersecting) {
      shouldUpdate.current = true;
      resumeAppFrame();
    } else {
      shouldUpdate.current = false;
      stopAppFrame();
    }
  };

  useEffect(() => {
    if (!enableOnTouchDevice && isTouchDevice()) return;

    resumeAppFrame();

    let eventTarget = window;

    if (containerRef && containerRef.current) {
      handleContainerRefRecalc();
      eventTarget = containerRef.current;
      window.addEventListener("scroll", handleContainerRefRecalcDebounced, {
        passive: true,
      });
      window.addEventListener("resize", handleContainerRefRecalcDebounced, {
        passive: true,
      });
    }

    window.addEventListener("visibilitychange", onVisibilityChange);

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });
    if (parentSpanRef.current) {
      observer.current.observe(parentSpanRef.current);
    }

    return () => {
      stopAppFrame();

      if (containerRef && containerRef.current) {
        window.removeEventListener("scroll", handleContainerRefRecalcDebounced);
        window.removeEventListener("resize", handleContainerRefRecalcDebounced);
      }

      window.removeEventListener("visibilitychange", onVisibilityChange);

      if (parentSpanRef.current && observer.current) {
        observer.current.unobserve(parentSpanRef.current);
      }
    };
  }, []);

  return (
    <>
      <span
        ref={parentSpanRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "inline-block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <span
          ref={parallaxSpanRef}
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "inline-block",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <span style={{ pointerEvents: "initial" }}>{children}</span>
        </span>
      </span>
    </>
  );
};
