import React, { useState } from "react";

export const Button = () => {
  const [isDone, setIsDone] = useState(false);
  return (
    <button type="button" onClick={() => setIsDone((prev) => !prev)}>
      {`isDone?: ${isDone}`}
    </button>
  );
};
