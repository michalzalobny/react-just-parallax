import { useEffect, useRef, useState } from "react";

//@ts-ignore
import {
  ScrollParallax,
  MouseParallax,
  ScrollParallaxHandle,
} from "react-just-parallax";

import "./App.css";

function App() {
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  const [display, setDisplay] = useState(false);

  const scrollParallaxRef = useRef<ScrollParallaxHandle | null>(null);

  useEffect(() => {
    scrollParallaxRef.current?.updateValues();
  }, [display]);

  return (
    <div className="wrapper" style={{ fontSize: 16 }}>
      {display && (
        <div data-container="1" className="container">
          <h1>1</h1>

          <ScrollParallax strength={0.4}>
            <div>
              <button style={{ cursor: "pointer" }}>
                Mouseparallax content btn
              </button>
              <div className="box" />
            </div>
          </ScrollParallax>
          <h1>1123</h1>
        </div>
      )}

      <button
        style={{ cursor: "pointer" }}
        onClick={() => setDisplay((prev) => !prev)}
      >
        UPDATE DISPLAY
      </button>
      <div data-container="3" className="container">
        <h1 style={{ background: "green" }}>3</h1>

        <ScrollParallax strength={0.4} ref={scrollParallaxRef}>
          <h3 style={{ background: "yellow" }}>odasd</h3>
          <div className="box" data-box="floating" />
        </ScrollParallax>

        <h2 style={{ background: "pink", color: "white", padding: "20px 0" }}>
          3213
        </h2>
      </div>

      <div data-container="4" className="container">
        <h1 style={{ background: "red", margin: 0 }}>4</h1>
        <h1 style={{ background: "red", margin: 0 }}>4</h1>
        <h1 style={{ background: "red", margin: 0 }}>4</h1>
        <h1 style={{ background: "red", margin: 0 }}>4</h1>
        <h1 style={{ background: "red", margin: 0 }}>4</h1>
        <MouseParallax strength={0.3}>
          <div className="box" />
        </MouseParallax>
      </div>
      <div ref={wrapperRef} data-container="5" className="container">
        <h1>5</h1>
        {/* If you need parallax to absolutely positioned element, wrap it in div*/}
        {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        > */}
        <MouseParallax parallaxContainerRef={wrapperRef}>
          <h1>tres</h1>
          <div className="box" data-box="floating" />
        </MouseParallax>
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
