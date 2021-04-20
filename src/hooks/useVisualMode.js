import React, { useState } from "react";

const useVisualMode = (x) => {
  const [mode, setMode] = useState(x);
  const [history, setHistory] = useState([x]);

  const transition = (mode, replace = false) => {
    if (!replace) {
      setMode(mode);
      setHistory([...history, mode]);
    }
    setMode(mode);
  };

  const back = (mode) => {
    if (history.length === 1) {
      setMode(x);
    } else {
      setMode(history[history.length - 2]);
      setHistory([history.slice(0, -1)]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;