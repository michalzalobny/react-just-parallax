import { Button } from "react-just-parallax";

import "./App.css";

function App() {
  return (
    <div className="wrapper" style={{ fontSize: 16 }}>
      <div className="container">
        <div className="box" />
      </div>
      <div className="container">
        <div className="box" data-box="floating" />
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
