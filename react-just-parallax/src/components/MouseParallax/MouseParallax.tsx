import React, { useEffect, useRef } from "react";
import sync, { cancelSync, FrameData, Process } from "framesync";
import debounce from "lodash.debounce";

import { useWindowSize } from "../../hooks/useWindowSize";
import { lerp } from "../../utils/lerp";
import { MouseMove } from "../../utils/MouseMove";
import { Event as DispatchEvent } from "../../utils/EventDispatcher";
import { isTouchDevice } from "../../utils/isTouchDevice";

export interface MouseParallaxProps {
  strength?: number;
  children?: React.ReactNode;
  parallaxContainerRef?: React.MutableRefObject<any>;
  scrollContainerRef?: React.MutableRefObject<any>; //Should be passed if parallaxed element is situated in other scrollable HTML element
  shouldResetPosition?: boolean;
  enableOnTouchDevice?: boolean;
  lerpEase?: number;
  isAbsolutelyPositioned?: boolean;
  zIndex?: number;
  shouldPause?: boolean;
}

const DEFAULT_FPS = 60;
const DT_FPS = 1000 / DEFAULT_FPS;

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const defaultRect: Rect = {
  height: 1,
  width: 1,
  x: 1,
  y: 1,
};

export const MouseParallax = (props: MouseParallaxProps) => {
  const {
    children,
    strength = 0.2,
    parallaxContainerRef,
    scrollContainerRef,
    shouldResetPosition = false,
    enableOnTouchDevice = false,
    isAbsolutelyPositioned = false,
    lerpEase = 0.06,
    zIndex = null,
    shouldPause = true,
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
  const shouldUpdate = useRef(true);
  const parallaxContainerRefRect = useRef<Rect>(defaultRect);
  const mouseMove = useRef(new MouseMove());
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

    if (parallaxContainerRef && parallaxContainerRef.current) {
      xMultiplier = parallaxContainerRefRect.current.width;
      yMultiplier = parallaxContainerRefRect.current.height;
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

    mouseMove.current.update();

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
    //might need to substract scrollbar width for perfect alignment (same for yComponent if scrolling horizontally)
    let xComponent = windowSizeRef.current.windowWidth;
    let yComponent = windowSizeRef.current.windowHeight;
    let relativeX = x;
    let relativeY = y;

    if (parallaxContainerRef && parallaxContainerRef.current) {
      xComponent = parallaxContainerRefRect.current.width;
      yComponent = parallaxContainerRefRect.current.height;
      relativeX = x - parallaxContainerRefRect.current.x;
      relativeY = y - parallaxContainerRefRect.current.y;
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

  const updateValues = () => {
    if (!parallaxContainerRef || !parallaxContainerRef.current) return;
    const boundingBox = parallaxContainerRef.current.getBoundingClientRect();
    parallaxContainerRefRect.current = {
      x: boundingBox.x,
      y: boundingBox.y,
      width: parallaxContainerRef.current.clientWidth,
      height: parallaxContainerRef.current.clientHeight,
    };
  };

  const updateValuesDebounced = debounce(updateValues, 150);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const isIntersecting = entries[0].isIntersecting;
    if (isIntersecting) {
      shouldUpdate.current = true;
      resumeAppFrame();
      mouseMove.current.setShouldUpdate(true);
    } else {
      //dont check if is intersecting etc.
      if (!shouldPause) return;
      shouldUpdate.current = false;
      stopAppFrame();
      mouseMove.current.setShouldUpdate(false);
    }
  };

  useEffect(() => {
    if (!enableOnTouchDevice && isTouchDevice()) return;
    mouseMove.current.init(parallaxContainerRef);
    resumeAppFrame();

    let eventTarget = window;
    let scrollTarget = window;

    if (scrollContainerRef && scrollContainerRef.current) {
      scrollTarget = scrollContainerRef.current;
    }

    if (parallaxContainerRef && parallaxContainerRef.current) {
      updateValues();
      eventTarget = parallaxContainerRef.current;
      scrollTarget.addEventListener("scroll", updateValuesDebounced, {
        passive: true,
      });
      window.addEventListener("resize", updateValuesDebounced, {
        passive: true,
      });
    }

    mouseMove.current.addEventListener("mousemove", onMouseMove);
    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    eventTarget.addEventListener("mouseout", handleMouseLeave);

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });
    if (parentSpanRef.current) {
      observer.current.observe(parentSpanRef.current);
    }

    return () => {
      stopAppFrame();

      if (parallaxContainerRef && parallaxContainerRef.current) {
        scrollTarget.removeEventListener("scroll", updateValuesDebounced);
        window.removeEventListener("resize", updateValuesDebounced);
      }

      mouseMove.current.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("touchstart", onTouchStart);
      eventTarget.removeEventListener("mouseout", handleMouseLeave);

      if (parentSpanRef.current && observer.current) {
        observer.current.unobserve(parentSpanRef.current);
      }
      mouseMove.current.destroy();
    };
  }, []);

  return (
    <>
      <span
        ref={parentSpanRef}
        style={{
          width: "100%",
          height: "100%",
          display: "inline-block",
          userSelect: "none",
          pointerEvents: "none",
          position: isAbsolutelyPositioned ? "absolute" : "relative",
          top: 0,
          left: 0,
          zIndex: zIndex ? zIndex : "initial",
        }}
      >
        <span
          ref={parallaxSpanRef}
          style={{
            backfaceVisibility: "hidden",
            position: "relative",
            width: "100%",
            height: "100%",
            display: "inline-block",
            userSelect: "initial",
            pointerEvents: "initial",
          }}
        >
          {children}
        </span>
      </span>
    </>
  );
};
