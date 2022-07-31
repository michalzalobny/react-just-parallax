import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import sync, { cancelSync, FrameData, Process } from "framesync";
import debounce from "lodash.debounce";

import { lerp } from "../../utils/lerp";
import { isTouchDevice } from "../../utils/isTouchDevice";
import {
  defaultScrollValues,
  ScrollValues,
  getElementScrollOffsets,
  getViewportScrollOffsets,
} from "../../utils/getScrollOffsets";
import { useWindowSize } from "../../hooks/useWindowSize";

export interface ScrollParallaxProps {
  strength?: number;
  children?: React.ReactNode;
  scrollContainerRef?: React.MutableRefObject<any>;
  enableOnTouchDevice?: boolean;
  lerpEase?: number;
  isHorizontal?: boolean;
  isAbsolutelyPositioned?: boolean;
  zIndex?: number;
  shouldPause?: boolean;
}

export type ScrollParallaxHandle = {
  updateValues: () => void;
};

const DEFAULT_FPS = 60;
const DT_FPS = 1000 / DEFAULT_FPS;
const SHOULD_UPDATE_OFFSET = 1.5; // 1 means, that after element is out of 1 screen size (height or width) it stops updating,

export const ScrollParallax = forwardRef<
  ScrollParallaxHandle,
  ScrollParallaxProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    updateValues,
  }));
  const {
    children,
    strength = 0.2,
    scrollContainerRef,
    enableOnTouchDevice = true,
    lerpEase = 0.06,
    isHorizontal = false,
    isAbsolutelyPositioned = false,
    zIndex = null,
    shouldPause = true,
  } = props;
  const parallaxSpanRef = useRef<null | HTMLSpanElement>(null);
  const parentSpanRef = useRef<null | HTMLSpanElement>(null);
  const currentX = useRef(1);
  const currentY = useRef(1);
  const targetX = useRef(1);
  const targetY = useRef(1);
  const syncRenderRef = useRef<null | Process>(null);
  const syncUpdateRef = useRef<null | Process>(null);
  const shouldUpdate = useRef(true);
  const scrollValues = useRef<ScrollValues>(defaultScrollValues);
  const parentOffsetX = useRef(1);
  const parentOffsetY = useRef(1);
  const { windowSizeRef } = useWindowSize();

  const resumeAppFrame = () => {
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
    if (!shouldUpdate.current) return;
    if (!parallaxSpanRef.current) return;

    let isHorizontalValue = isHorizontal ? 1 : 0;

    parallaxSpanRef.current.style.transform = `translate(${
      currentX.current * -strength * isHorizontalValue
    }px, ${currentY.current * -strength * (1 - isHorizontalValue)}px)`;
  };
  const syncOnUpdate = ({ delta }: FrameData) => {
    if (!shouldUpdate.current) return;
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

  const calculateParentSpanOffset = () => {
    if (!parentSpanRef || !parentSpanRef.current) return;
    updateScrollValues();
    const boundingBox = parentSpanRef.current.getBoundingClientRect();
    parentOffsetX.current =
      scrollValues.current.xOffset + boundingBox.x + boundingBox.width * 0.5;
    parentOffsetY.current =
      scrollValues.current.yOffset + boundingBox.y + boundingBox.height * 0.5;
  };

  const updateValues = () => {
    calculateParentSpanOffset();
    handleScroll();
  };
  const updateValuesDebounced = debounce(updateValues, 150);

  const updateScrollValues = () => {
    if (scrollContainerRef && scrollContainerRef.current) {
      scrollValues.current = getElementScrollOffsets(
        scrollContainerRef.current
      );
    } else {
      scrollValues.current = getViewportScrollOffsets();
    }
  };

  const handleScroll = () => {
    updateScrollValues();
    let offsetX = scrollValues.current.xOffset - parentOffsetX.current;
    let offsetY = scrollValues.current.yOffset - parentOffsetY.current;

    //Normalize offset to be 0 if element is in the middle of the screen
    offsetX = offsetX + 0.5 * windowSizeRef.current.windowWidth;
    offsetY = offsetY + 0.5 * windowSizeRef.current.windowHeight;

    targetX.current = offsetX;
    targetY.current = offsetY;

    if (
      Math.abs(targetY.current) >
        windowSizeRef.current.windowHeight * SHOULD_UPDATE_OFFSET ||
      Math.abs(targetX.current) >
        windowSizeRef.current.windowWidth * SHOULD_UPDATE_OFFSET
    ) {
      //dont check if is intersecting etc.
      if (!shouldPause) return;
      shouldUpdate.current = false;
    } else {
      shouldUpdate.current = true;
    }
  };

  useEffect(() => {
    if (!enableOnTouchDevice && isTouchDevice()) return;

    resumeAppFrame();
    let eventTarget = window;
    if (scrollContainerRef && scrollContainerRef.current) {
      eventTarget = scrollContainerRef.current;
    }

    eventTarget.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", updateValuesDebounced);

    updateValues();

    return () => {
      stopAppFrame();

      eventTarget.removeEventListener("scroll", handleScroll);
      window.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", updateValuesDebounced);
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
});
