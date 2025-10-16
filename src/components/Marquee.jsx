import React, { useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import "../components/Marquee.css";

export default function Marquee({ spotData, onImageClick }) {
  const { selected } = useAppContext();
  const spots = Array.isArray(spotData?.spots) ? spotData.spots : [];
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current && selected !== null && selected !== undefined) {
      const itemWidth = 80; // maxWidth from style
      const gap = 12; // gap-3 in Tailwind (approx 0.75rem)
      const scrollTo =
        selected * (itemWidth + gap) -
        containerRef.current.offsetWidth / 2 +
        itemWidth / 2;
      containerRef.current.scrollTo({
        left: Math.max(scrollTo, 0),
        behavior: "smooth",
      });
    }
  }, [selected, spots.length]);

  return (
    <div className="overflow-hidden p-2">
      <div
        ref={containerRef}
        className="marquee-content flex gap-3 items-center"
        style={{
          overflowX: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {spots.map((spot, idx) => (
          <div
            key={idx}
            className={`rounded-xl overflow-hidden shadow-lg bg-[#23284a] hover:scale-105 transition cursor-pointer ${
              selected === idx
                ? "border-4 border-blue-400 ring-2 ring-purple-400 shadow-xl"
                : ""
            }`}
            onClick={() => onImageClick && onImageClick(idx)}
            style={{ minWidth: 64, maxWidth: 80 }}
          >
            {spot.imageUrl ? (
              <img
                src={spot.imageUrl}
                alt={spot.name || `Spot ${idx}`}
                className="w-full h-12 object-cover"
                draggable={false}
              />
            ) : (
              <div className="flex items-center justify-center h-12 text-xl">
                {spot.avatar || spot.emoji || "🌙"}
              </div>
            )}
            <div className="p-1 text-center text-white text-xs font-bold truncate">
              {spot.name || `Spot ${idx}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
