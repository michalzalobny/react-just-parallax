import React, { useEffect, useRef } from "react";
import sync, { cancelSync, FrameData, Process } from "framesync";

import { useWindowSize } from "../../hooks/useWindowSize";
import { lerp } from "../../utils/lerp";

export interface ParallaxProps {
  strength?: number;
  children?: React.ReactNode;
  refElement?: React.MutableRefObject<any | null>;
  shouldResetPosition?: boolean;
}

const LERP_EASE = 0.06;
const DEFAULT_FPS = 60;
const DT_FPS = 1000 / DEFAULT_FPS;

export const Parallax = (props: ParallaxProps) => {
  const { children, strength = 0.2, refElement, shouldResetPosition } = props;
  const { windowSizeRef } = useWindowSize();
  const spanRef = useRef<null | HTMLSpanElement>(null);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const syncRenderRef = useRef<null | Process>(null);
  const syncUpdateRef = useRef<null | Process>(null);

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

  const onMouseMove = (event: MouseEvent) => {
    let referenceElWidth = 0;
    let referenceElHeight = 0;
    let relativeMousePositionX = 0;
    let relativeMousePositionY = 0;

    if (refElement && refElement.current) {
      referenceElWidth = refElement.current.clientWidth;
      referenceElHeight = refElement.current.clientHeight;
      relativeMousePositionX =
        event.clientX - refElement.current.getBoundingClientRect().x;
      relativeMousePositionY =
        event.clientY - refElement.current.getBoundingClientRect().y;
    } else {
      referenceElWidth = windowSizeRef.current.windowWidth;
      referenceElHeight = windowSizeRef.current.windowHeight;
      relativeMousePositionX = event.clientX;
      relativeMousePositionY = event.clientY;
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

  useEffect(() => {
    resumeAppFrame();

    window.addEventListener("visibilitychange", onVisibilityChange);

    if (refElement && refElement.current) {
      refElement.current.addEventListener("mousemove", onMouseMove);
      refElement.current.addEventListener("mouseout", onMouseOut);
    } else {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      stopAppFrame();
      window.removeEventListener("visibilitychange", onVisibilityChange);
      if (refElement && refElement.current) {
        refElement.current.removeEventListener("mousemove", onMouseMove);
        refElement.current.removeEventListener("mouseout", onMouseOut);
      } else {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseout", onMouseOut);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
