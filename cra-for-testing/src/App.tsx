import { useRef, useState } from "react";

//@ts-ignore
import { MouseParallax } from "react-just-parallax";

import "./App.css";

function App() {
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  const [display, setDisplay] = useState(false);

  return (
    <div className="wrapper" style={{ fontSize: 16 }}>
      {display && (
        <div className="container">
          <MouseParallax>
            <h1>weoijfsjf</h1>
            <button style={{ cursor: "pointer" }}>
              Mouseparallax content btn
            </button>
            <div className="box" />
          </MouseParallax>
        </div>
      )}

      <button
        style={{ cursor: "pointer" }}
        onClick={() => setDisplay((prev) => !prev)}
      >
        UPDATE DISPLAY
      </button>
      <div ref={wrapperRef} className="container">
        <MouseParallax boundRef={wrapperRef}>
          <div className="box" data-box="floating" />
        </MouseParallax>
      </div>
      <div className="container">
        <div className="box" />
      </div>
      <div className="container">
        <div className="box" data-box="floating" />
      </div>
    </div>
  );
}

export default App;
