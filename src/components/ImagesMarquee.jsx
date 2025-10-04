import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import "./ImagesMarquee.css";

// Helper to check if an image is "empty" (mostly grey)
function isImageGrey(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);

  // Sample a few pixels (corners and center)
  const samplePoints = [
    [1, 1],
    [img.width - 2, 1],
    [1, img.height - 2],
    [img.width - 2, img.height - 2],
    [Math.floor(img.width / 2), Math.floor(img.height / 2)],
  ];
  let greyCount = 0;
  samplePoints.forEach(([x, y]) => {
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    if (
      (r === 68 && g === 68 && b === 68) ||
      (r === 34 && g === 34 && b === 34)
    ) {
      greyCount++;
    }
  });
  return greyCount === samplePoints.length;
}

export default function ImagesMarquee({ totalImages, onImageClick }) {
  const { getSpotData } = useAppContext();
  const [validImages, setValidImages] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const checkImages = async () => {
      const checks = await Promise.all(
        Array.from({ length: totalImages }, (_, i) => {
          return new Promise((resolve) => {
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.src = `/src/assets/img${i + 1}.png`;
            img.onload = () => {
              if (!isImageGrey(img)) resolve(i + 1);
              else resolve(null);
            };
            img.onerror = () => resolve(null);
          });
        })
      );
      if (isMounted) {
        setValidImages(checks.filter(Boolean));
      }
    };
    checkImages();
    return () => {
      isMounted = false;
    };
  }, [totalImages]);

  // Get spot name for display
  const getSpotName = (spotNumber) => {
    const spotData = getSpotData(spotNumber);
    return spotData?.name || `Spot #${spotNumber}`;
  };

  // Duplicate for seamless infinite scroll
  const allImages = [...validImages, ...validImages];

  return (
    <div className="c-images-marquee-container">
      <div className="c-images-marquee">
        <div className="c-images-marquee-track">
          {allImages.map((imgNum, idx) => (
            <span
              key={idx}
              className="c-images-marquee-item group"
              tabIndex={0}
              onClick={() => {
                if (onImageClick) onImageClick(imgNum - 1);
              }}
            >
              <span className="c-images-marquee-img-wrapper">
                <img
                  src={`/src/assets/img${imgNum}.png`}
                  alt={`img${imgNum}`}
                  className="c-images-marquee-img group-hover:scale-125"
                  draggable={false}
                />
                {/* Field number overlay on hover */}
                <span className="c-images-marquee-number-overlay">
                  #{imgNum}
                </span>
              </span>
              <span className="c-images-marquee-label group-hover:scale-150">
                {getSpotName(imgNum)}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
