import { useState } from "react";

//handles state transitions and moving between modes
// gifted to me by Best Mentor Sarah Nicholson

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace = false) {
    setHistory(prev =>
      replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
    );
  }
  function back() {
    if (history.length < 2) return;
    setHistory(prev => [...prev.slice(0, history.length - 1)]);
  }
  return { mode: history[history.length - 1], transition, back };
}