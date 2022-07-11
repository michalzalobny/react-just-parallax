import { useRef, useState } from "react";

//@ts-ignore
import { Parallax } from "react-just-parallax";

import "./App.css";

function App() {
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  const [display, setDisplay] = useState(false);

  return (
    <div className="wrapper" style={{ fontSize: 16 }}>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => setDisplay((prev) => !prev)}
      >
        UPDATE DISPLAY
      </button>
      {display && (
        <div className="container">
          <Parallax>
            <h1>weoijfsjf</h1>
            <div className="box" />
          </Parallax>
        </div>
      )}

      <div ref={wrapperRef} className="container">
        <Parallax boundRef={wrapperRef}>
          <div className="box" data-box="floating" />
        </Parallax>
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
