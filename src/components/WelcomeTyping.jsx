import React, { useEffect, useState } from "react";

const MESSAGE =
  "Welcome to the Sphere Universe! Explore, collect, and connect with the stars. Your journey begins now...";

export default function WelcomeTyping({ onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(MESSAGE.slice(0, i + 1));
      i++;
      if (i === MESSAGE.length) {
        clearInterval(interval);
        setTimeout(() => {
          setHide(true);
          if (onDone) onDone();
        }, 900); // fade out after short delay
      }
    }, 45);
    return () => clearInterval(interval);
  }, [onDone]);

  if (hide) return null;

  return (
    <div className="w-full flex justify-center mb-2">
      <span
        className="text-xl font-bold text-[#ffe600] font-mono tracking-wide"
        style={{
          textShadow: "0 2px 8px #000, 0 0px 16px #ffe60044",
          letterSpacing: "0.04em",
          minHeight: "1.5em",
          whiteSpace: "pre",
          maxWidth: "480px",
          width: "100%",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        {displayed}
        <span className="animate-pulse text-white">|</span>
      </span>
    </div>
  );
}
