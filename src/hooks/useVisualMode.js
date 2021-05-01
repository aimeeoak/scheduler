import { useState } from "react";

const useVisualMode = (modeIterable) => {
  const [mode, setMode] = useState(modeIterable);
  const [history, setHistory] = useState([modeIterable]);

  const transition = (mode, replace = false) => {
    if (!replace) {
      setMode(mode);
      setHistory([...history, mode]);
    }
    setMode(mode);
  };

  const back = (mode) => {
    if (history.length === 1) {
      setMode(modeIterable);
    } else {
      setMode(history[history.length - 2]);
      setHistory(prevHistory => [...prevHistory, mode], [history.slice(0, -1)]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;