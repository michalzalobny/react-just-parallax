import { useRef } from "react";
import { Parallax } from "react-just-parallax";

import "./App.css";

function App() {
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  return (
    <div className="wrapper" style={{ fontSize: 16 }}>
      <div className="container">
        <Parallax>
          <div className="box" />
        </Parallax>
      </div>
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
