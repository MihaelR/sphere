import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./Orb.css";

function Orb({
  selected,
  setSelected,
  searchValue,
  setSearchValue,
  totalImages = 30,
  totalItems = 100,
  baseWidth = 1.2, // slightly bigger
  baseHeight = 0.8, // slightly bigger
  sphereRadius = 7, // bigger sphere
  backgroundColor = "3b3b3b",
  showBorders = true,
  borderColor = "black",
  maxDistanceMultiplier = 6,
  fitMargin = 1.1, // added: extra space around sphere ( >1 )
  initialViewScale = 0.9, // was 1.2, now sphere appears bigger
  handleSearch,
  lastSearchIndex,
}) {
  const onRef = useRef();
  const meshes = useRef([]); // change to ref so it's accessible in both effects
  const camera = useRef(); // added
  const controls = useRef(); // added
  const [zoomedIn, setZoomedIn] = useState(false);

  useEffect(() => {
    const container = onRef.current;
    // Prevent multiple canvases (StrictMode or re-renders)
    const oldCanvases = container.querySelectorAll("canvas");
    oldCanvases.forEach((c) => container.removeChild(c));

    const scene = new THREE.Scene();
    // camera and controls as refs
    camera.current = new THREE.PerspectiveCamera(
      75,
      1, // temp aspect, will update
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    container.appendChild(renderer.domElement);

    const sizeFromContainer = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      camera.current.aspect = w / h;
      camera.current.updateProjectionMatrix();
      return { w, h };
    };

    controls.current = new OrbitControls(camera.current, renderer.domElement);
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.05;
    controls.current.rotateSpeed = 1.2;
    controls.current.enableZoom = true;
    controls.current.enablePan = false;
    controls.current.autoRotate = true; // enable auto-rotation
    controls.current.autoRotateSpeed = 0.5; // slow speed (default is 2.0)

    // --- Animation: Start zoomed out, then zoom in ---
    let normalDist = null;
    let zoomAnimFrame = null;

    const setCameraFit = () => {
      const { w, h } = sizeFromContainer();
      const fovRad = (camera.current.fov * Math.PI) / 180;
      const aspect = w / h;
      const distV = (sphereRadius * fitMargin) / Math.tan(fovRad / 2);
      const distH =
        (sphereRadius * fitMargin) / (Math.tan(fovRad / 2) * aspect);
      const baseDist = Math.max(distV, distH);
      normalDist = baseDist * initialViewScale;
      // Start zoomed out (much smaller)
      if (!zoomedIn) {
        camera.current.position.set(0, 0, normalDist * 5); // was 2.5
      } else {
        camera.current.position.set(0, 0, normalDist);
      }
      controls.current.minDistance = sphereRadius * 1.05;
      controls.current.maxDistance = normalDist * maxDistanceMultiplier;
    };

    // Apply background & color space
    const col = backgroundColor.startsWith("#")
      ? backgroundColor
      : `#${backgroundColor}`;
    renderer.setClearColor(new THREE.Color(col), 0);
    if ("outputColorSpace" in renderer)
      renderer.outputColorSpace = THREE.SRGBColorSpace;

    setCameraFit();

    // Animate zoom in on mount
    if (!zoomedIn) {
      let start = null;
      const duration = 6000; // ms
      const animateZoom = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const t = Math.min(elapsed / duration, 1);
        // Ease out
        const ease = 1 - Math.pow(1 - t, 2);
        if (normalDist) {
          camera.current.position.z = normalDist * 5 - normalDist * 4 * ease; // match initial zoom
        }
        if (t < 1) {
          zoomAnimFrame = requestAnimationFrame(animateZoom);
        } else {
          camera.current.position.z = normalDist;
          setZoomedIn(true);
        }
      };
      zoomAnimFrame = requestAnimationFrame(animateZoom);
    }

    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    let rafId;
    meshes.current = []; // reset before filling

    const getImagePath = (index) =>
      // Images are now in src/assets/img{n}.png
      `/src/assets/img${((index % totalImages) + 1).toString()}.png`;

    const createImagePlane = (texture) => {
      const imageAspect = texture.image.width / texture.image.height;
      let width = baseWidth;
      let height = baseHeight;
      if (imageAspect > 1) {
        height = width / imageAspect;
      } else {
        width = width * imageAspect;
      }
      return new THREE.PlaneGeometry(width, height);
    };

    const makeBorder = (geometry) => {
      if (!showBorders) return null;
      const eGeom = new THREE.EdgesGeometry(geometry);
      // Use transparent border by default; will be colored if selected
      const mat = new THREE.LineBasicMaterial({ color: "transparent" });
      return new THREE.LineSegments(eGeom, mat);
    };

    const addImageAt = (index, phi, theta) => {
      textureLoader.load(
        getImagePath(index),
        (texture) => {
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          if ("colorSpace" in texture)
            texture.colorSpace = THREE.SRGBColorSpace;

          const geometry = createImagePlane(texture);
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: false,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.userData = { index };

          mesh.position.x = sphereRadius * Math.cos(theta) * Math.sin(phi);
          mesh.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
          mesh.position.z = sphereRadius * Math.cos(phi);

          mesh.lookAt(0, 0, 0);
          mesh.rotateY(Math.PI);

          const border = makeBorder(geometry);
          if (border) mesh.add(border);

          scene.add(mesh);
          meshes.current.push(mesh);
          loadedCount++;
        },
        undefined,
        () => {
          const geometry = new THREE.PlaneGeometry(
            baseWidth * 0.8,
            baseHeight * 0.8
          );
          const material = new THREE.MeshBasicMaterial({
            color: 0x444444,
            side: THREE.DoubleSide,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.userData = { index };
          mesh.position.x = sphereRadius * Math.cos(theta) * Math.sin(phi);
          mesh.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
          mesh.position.z = sphereRadius * Math.cos(phi);
          mesh.lookAt(0, 0, 0);
          mesh.rotateY(Math.PI);
          const border = makeBorder(geometry);
          if (border) mesh.add(border);
          scene.add(mesh);
          meshes.current.push(mesh);
          loadedCount++;
        }
      );
    };

    const createSphere = () => {
      for (let i = 0; i < totalItems; i++) {
        const phi = Math.acos(-1 + (2 * i) / totalItems);
        const theta = Math.sqrt(totalItems * Math.PI) * phi;
        addImageAt(i, phi, theta);
      }
    };

    // Raycaster for click
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function getPointer(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function handleClick(event) {
      getPointer(event);
      raycaster.setFromCamera(pointer, camera.current);
      const intersects = raycaster.intersectObjects(meshes.current, false);
      if (intersects.length > 0) {
        const mesh = intersects[0].object;
        setSelected(mesh.userData.index);
      } else {
        setSelected(null);
      }
    }

    renderer.domElement.addEventListener("click", handleClick);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      controls.current.update();
      // Pulse effect for selected mesh
      if (selected !== null) {
        const mesh = meshes.current.find((m) => m.userData.index === selected);
        if (mesh) {
          const t = performance.now() * 0.003;
          const scale = 1 + 0.13 * Math.abs(Math.sin(t));
          mesh.scale.set(scale, scale, scale);
        }
      }
      // Reset scale for non-selected meshes
      meshes.current.forEach((mesh) => {
        if (selected === null || mesh.userData.index !== selected) {
          mesh.scale.set(1, 1, 1);
        }
      });
      renderer.render(scene, camera.current);
    };

    animate();
    createSphere();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.current.aspect = w / h;
      setCameraFit(); // recompute distance for new aspect
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      controls.current.dispose();
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
      renderer.domElement.removeEventListener("click", handleClick);
      onRef.current?.removeChild(renderer.domElement);
      if (zoomAnimFrame) cancelAnimationFrame(zoomAnimFrame);
    };
  }, [
    totalImages,
    totalItems,
    baseWidth,
    baseHeight,
    sphereRadius,
    backgroundColor,
    showBorders,
    borderColor,
    maxDistanceMultiplier,
    fitMargin, // added dependency
    initialViewScale, // added dependency
  ]);

  // Highlight selected mesh border only when selection changes
  useEffect(() => {
    meshes.current.forEach((mesh) => {
      mesh.children.forEach((child) => {
        if (child.isLineSegments) {
          if (selected !== null && mesh.userData.index === selected) {
            child.material.color.set("#ffe600"); // bright yellow
            child.material.linewidth = 6;
            child.material.needsUpdate = true;
            child.visible = true;
          } else {
            // Completely hide border for non-selected
            child.visible = false;
          }
        }
      });
    });
  }, [selected]);

  // Camera focus helper
  const focusOnMesh = (index) => {
    const mesh = meshes.current.find((m) => m.userData.index === index);
    if (!mesh || !camera.current || !controls.current) return;
    // Always keep target at sphere center
    const dir = mesh.position.clone().normalize();
    const camDist = camera.current.position.length();
    const newCamPos = dir.multiplyScalar(camDist);
    camera.current.position.copy(newCamPos);
    controls.current.target.set(0, 0, 0);
    controls.current.update();
  };

  // Only focus when selected comes from search (not click)
  useEffect(() => {
    if (
      selected !== null &&
      lastSearchIndex !== null &&
      selected === lastSearchIndex
    ) {
      setTimeout(() => focusOnMesh(selected), 100);
    }
    // eslint-disable-next-line
  }, [selected, lastSearchIndex]);

  return (
    <div className="c-orb orb-wrapper card bg-base-100 shadow-lg p-4 flex items-center justify-center">
      <div
        className="orb-canvas-container rounded-xl overflow-hidden"
        ref={onRef}
      />
    </div>
  );
}

export default Orb;
