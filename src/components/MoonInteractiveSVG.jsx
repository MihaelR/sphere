import React from "react";
import {
  MiniMap,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

export default function MoonInteractiveSVG(args) {
  const moonSVG = (
    <svg
      viewBox="0 0 300 300"
      height="100%"
      width="auto"
      style={{ display: "block" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="moon-gradient" cx="50%" cy="50%" r="100%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="60%" stopColor="#d1d5db" />
          <stop offset="100%" stopColor="#23284a" />
        </radialGradient>
      </defs>
      <circle
        cx={150}
        cy={150}
        r={120}
        fill="url(#moon-gradient)"
        stroke="#bcbcbc"
        strokeWidth={2}
      />
      {Array.from({ length: 100 }).map((_, idx) => {
        const t = 2 * Math.PI * Math.random();
        const u = Math.random() + Math.random();
        const r = 110 * (u > 1 ? 2 - u : u);
        const x = 150 + Math.cos(t) * r;
        const y = 150 + Math.sin(t) * r;
        const craterR = 3 + Math.random() * 3;
        return (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r={craterR}
            fill="#bcbcbc"
            stroke="#888"
            strokeWidth={1}
            opacity={0.85}
            style={{ cursor: "pointer" }}
            onClick={() => alert(`Crater ID: ${idx}`)}
          />
        );
      })}
    </svg>
  );

  return (
    <div
      style={{
        position: "relative",
        width: "auto",
        margin: "0 auto",
        aspectRatio: "1 / 1",
      }}
    >
      <TransformWrapper {...args}>
        {() => (
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "100%",
              }}
            >
              {moonSVG}
            </TransformComponent>
            <div
              style={{
                position: "absolute",
                left: 16,
                bottom: 16,
                zIndex: 10,
                borderRadius: 12,
                boxShadow: "0 2px 8px #0006",
                border: "1px solid #a78bfa",
                background: "#181825",
                width: 64,
                height: 64,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MiniMap width={64} height={64}>
                {moonSVG}
              </MiniMap>
            </div>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
}
