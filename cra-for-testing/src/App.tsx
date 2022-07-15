import { useRef, useState } from "react";

//@ts-ignore
import { ScrollParallax, MouseParallax } from "react-just-parallax";

import "./App.css";

function App() {
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  const [display, setDisplay] = useState(false);

  return (
    <div className="wrapper" style={{ fontSize: 16 }}>
      {display && (
        <div className="container">
          <ScrollParallax strength={0.4}>
            <button style={{ cursor: "pointer" }}>
              Mouseparallax content btn
            </button>
            <div className="box" />
          </ScrollParallax>
        </div>
      )}
      <div className="container">
        <div className="box" />
      </div>

      <button
        style={{ cursor: "pointer" }}
        onClick={() => setDisplay((prev) => !prev)}
      >
        UPDATE DISPLAY
      </button>
      <div ref={wrapperRef} className="container">
        <ScrollParallax>
          <div className="box" data-box="floating" />
        </ScrollParallax>
      </div>
      <div className="container">
        <MouseParallax>
          <div className="box" />
        </MouseParallax>
      </div>
      <div className="container">
        <MouseParallax>
          <div className="box" data-box="floating" />
        </MouseParallax>
      </div>
    </div>
  );
}

export default App;
