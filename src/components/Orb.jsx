import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./Orb.css";

function Orb({
  selected,
  setSelected,
  totalImages,
  totalItems,
  baseWidth = 1.2,
  baseHeight = 0.8,
  sphereRadius = 7,
  backgroundColor = "3b3b3b",
  showBorders = true,
  borderColor = "black",
  maxDistanceMultiplier = 6,
  fitMargin = 1.1,
  initialViewScale = 0.9,
}) {
  const onRef = useRef();
  const meshes = useRef([]);
  const camera = useRef();
  const controls = useRef();
  const [zoomedIn, setZoomedIn] = useState(false);

  useEffect(() => {
    const container = onRef.current;
    const oldCanvases = container.querySelectorAll("canvas");
    oldCanvases.forEach((c) => container.removeChild(c));

    const scene = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

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
    controls.current.autoRotate = true;
    controls.current.autoRotateSpeed = 0.5;

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
      if (!zoomedIn) {
        camera.current.position.set(0, 0, normalDist * 5);
      } else {
        camera.current.position.set(0, 0, normalDist);
      }
      controls.current.minDistance = sphereRadius * 1.05;
      controls.current.maxDistance = normalDist * maxDistanceMultiplier;
    };

    const col = backgroundColor.startsWith("#")
      ? backgroundColor
      : `#${backgroundColor}`;
    renderer.setClearColor(new THREE.Color(col), 0);
    if ("outputColorSpace" in renderer)
      renderer.outputColorSpace = THREE.SRGBColorSpace;

    setCameraFit();

    if (!zoomedIn) {
      let start = null;
      const duration = 6000;
      const animateZoom = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const t = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - t, 2);
        if (normalDist) {
          camera.current.position.z = normalDist * 5 - normalDist * 4 * ease;
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
    let rafId;
    meshes.current = [];

    const hasImage = (index) => index < totalImages;

    const getImagePath = (index) => {
      if (!hasImage(index)) return null;
      return `/src/assets/img${index + 1}.png`;
    };

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
      const mat = new THREE.LineBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
      });
      return new THREE.LineSegments(eGeom, mat);
    };

    const createEmptySpot = (index, phi, theta) => {
      // Create a more visible placeholder for empty spots
      const geometry = new THREE.PlaneGeometry(
        baseWidth * 0.6,
        baseHeight * 0.6
      );
      const material = new THREE.MeshBasicMaterial({
        color: 0x888888,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { index, hasImage: false };

      mesh.position.x = sphereRadius * Math.cos(theta) * Math.sin(phi);
      mesh.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      mesh.position.z = sphereRadius * Math.cos(phi);

      mesh.lookAt(0, 0, 0);
      mesh.rotateY(Math.PI);

      // Add the same border structure as image spots
      const border = makeBorder(geometry);
      if (border) {
        border.material.color.set(0x666666);
        border.material.transparent = true;
        border.material.opacity = 0.7;
        border.visible = true;
        mesh.add(border);
      }

      // Add all glow borders to empty spots too (but keep them hidden initially)
      const glowGeometry1 = new THREE.EdgesGeometry(geometry);
      const glowMaterial1 = new THREE.LineBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.6,
        linewidth: 20,
      });
      const glowBorder1 = new THREE.LineSegments(glowGeometry1, glowMaterial1);
      glowBorder1.scale.set(1.15, 1.15, 1.15);
      glowBorder1.visible = false; // Hidden by default
      mesh.add(glowBorder1);
      mesh.userData.glowBorder = glowBorder1;

      const glowGeometry2 = new THREE.EdgesGeometry(geometry);
      const glowMaterial2 = new THREE.LineBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.3,
        linewidth: 25,
      });
      const glowBorder2 = new THREE.LineSegments(glowGeometry2, glowMaterial2);
      glowBorder2.scale.set(1.25, 1.25, 1.25);
      glowBorder2.visible = false; // Hidden by default
      mesh.add(glowBorder2);
      mesh.userData.outerGlowBorder = glowBorder2;

      const glowGeometry3 = new THREE.EdgesGeometry(geometry);
      const glowMaterial3 = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
        linewidth: 30,
      });
      const glowBorder3 = new THREE.LineSegments(glowGeometry3, glowMaterial3);
      glowBorder3.scale.set(1.3, 1.3, 1.3);
      glowBorder3.visible = false; // Hidden by default
      mesh.add(glowBorder3);
      mesh.userData.pulseBorder = glowBorder3;

      scene.add(mesh);
      meshes.current.push(mesh);
    };

    const addImageAt = (index, phi, theta) => {
      const imagePath = getImagePath(index);

      if (imagePath) {
        textureLoader.load(
          imagePath,
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
            mesh.userData = { index, hasImage: true };

            mesh.position.x = sphereRadius * Math.cos(theta) * Math.sin(phi);
            mesh.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
            mesh.position.z = sphereRadius * Math.cos(phi);

            mesh.lookAt(0, 0, 0);
            mesh.rotateY(Math.PI);

            // Add main border (hidden by default for image spots)
            const border = makeBorder(geometry);
            if (border) {
              border.visible = false; // Hidden by default for image spots
              mesh.add(border);
            }

            // Add all glow borders to image spots (hidden by default)
            const glowGeometry1 = new THREE.EdgesGeometry(geometry);
            const glowMaterial1 = new THREE.LineBasicMaterial({
              color: 0xffd700,
              transparent: true,
              opacity: 0.6,
              linewidth: 20,
            });
            const glowBorder1 = new THREE.LineSegments(
              glowGeometry1,
              glowMaterial1
            );
            glowBorder1.scale.set(1.15, 1.15, 1.15);
            glowBorder1.visible = false; // Hidden by default
            mesh.add(glowBorder1);
            mesh.userData.glowBorder = glowBorder1;

            const glowGeometry2 = new THREE.EdgesGeometry(geometry);
            const glowMaterial2 = new THREE.LineBasicMaterial({
              color: 0xffd700,
              transparent: true,
              opacity: 0.3,
              linewidth: 25,
            });
            const glowBorder2 = new THREE.LineSegments(
              glowGeometry2,
              glowMaterial2
            );
            glowBorder2.scale.set(1.25, 1.25, 1.25);
            glowBorder2.visible = false; // Hidden by default
            mesh.add(glowBorder2);
            mesh.userData.outerGlowBorder = glowBorder2;

            const glowGeometry3 = new THREE.EdgesGeometry(geometry);
            const glowMaterial3 = new THREE.LineBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.4,
              linewidth: 30,
            });
            const glowBorder3 = new THREE.LineSegments(
              glowGeometry3,
              glowMaterial3
            );
            glowBorder3.scale.set(1.3, 1.3, 1.3);
            glowBorder3.visible = false; // Hidden by default
            mesh.add(glowBorder3);
            mesh.userData.pulseBorder = glowBorder3;

            scene.add(mesh);
            meshes.current.push(mesh);
          },
          undefined,
          (error) => {
            createEmptySpot(index, phi, theta);
          }
        );
      } else {
        createEmptySpot(index, phi, theta);
      }
    };

    const createSphere = () => {
      for (let i = 0; i < totalItems; i++) {
        const phi = Math.acos(-1 + (2 * i) / totalItems);
        const theta = Math.sqrt(totalItems * Math.PI) * phi;
        addImageAt(i, phi, theta);
      }
    };

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
        const spotNumber = mesh.userData.index + 1;
        const hasImage = mesh.userData.hasImage;

        setSelected(mesh.userData.index);
      } else {
        setSelected(null);
      }
    }

    renderer.domElement.addEventListener("click", handleClick);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      controls.current.update();

      // Enhanced pulse effect for selected mesh with multiple glow layers
      if (selected !== null) {
        const mesh = meshes.current.find((m) => m.userData.index === selected);
        if (mesh) {
          const t = performance.now() * 0.003;
          const scale =
            1 + (mesh.userData.hasImage ? 0.18 : 0.15) * Math.abs(Math.sin(t)); // Bigger pulse
          mesh.scale.set(scale, scale, scale);

          // Animate all glow borders with different speeds for dynamic effect
          if (mesh.userData.glowBorder) {
            const glowScale = 1.15 + 0.08 * Math.abs(Math.sin(t * 1.2));
            mesh.userData.glowBorder.scale.set(glowScale, glowScale, glowScale);
          }

          if (mesh.userData.outerGlowBorder) {
            const outerScale = 1.25 + 0.1 * Math.abs(Math.sin(t * 0.8));
            mesh.userData.outerGlowBorder.scale.set(
              outerScale,
              outerScale,
              outerScale
            );
          }

          if (mesh.userData.pulseBorder) {
            const pulseScale = 1.3 + 0.15 * Math.abs(Math.sin(t * 2.0)); // Fast pulse
            mesh.userData.pulseBorder.scale.set(
              pulseScale,
              pulseScale,
              pulseScale
            );
            // Also pulse the opacity for extra effect
            mesh.userData.pulseBorder.material.opacity =
              0.2 + 0.3 * Math.abs(Math.sin(t * 3.0));
          }
        }
      }

      // Reset scale for non-selected meshes
      meshes.current.forEach((mesh) => {
        if (selected === null || mesh.userData.index !== selected) {
          mesh.scale.set(1, 1, 1);

          // Reset all glow border scales
          if (mesh.userData.glowBorder) {
            mesh.userData.glowBorder.scale.set(1.15, 1.15, 1.15);
          }
          if (mesh.userData.outerGlowBorder) {
            mesh.userData.outerGlowBorder.scale.set(1.25, 1.25, 1.25);
          }
          if (mesh.userData.pulseBorder) {
            mesh.userData.pulseBorder.scale.set(1.3, 1.3, 1.3);
            if (mesh.userData.pulseBorder.material) {
              mesh.userData.pulseBorder.material.opacity = 0.4;
            }
          }
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
      setCameraFit();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      controls.current.dispose();

      // Cancel any ongoing focus animation
      if (controls.current.focusAnimation) {
        cancelAnimationFrame(controls.current.focusAnimation);
      }

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
    fitMargin,
    initialViewScale,
  ]);

  // Camera focus helper - enhanced for optimal front-facing positioning
  const focusOnMesh = useCallback((index) => {
    const mesh = meshes.current.find((m) => m.userData.index === index);
    if (!mesh || !camera.current || !controls.current) return;

    // Get the mesh position (where we want to look)
    const targetPosition = mesh.position.clone();

    // Calculate camera distance (maintain current distance)
    const currentCameraPosition = camera.current.position.clone();
    const cameraDistance = currentCameraPosition.length();

    // Calculate direction FROM the mesh TO where camera should be (in front of the mesh)
    // This puts the camera in front of the spot, looking towards the center
    const directionToCamera = targetPosition.clone().normalize();

    // Position camera in front of the mesh (same direction as mesh position from center)
    const newCameraPosition = directionToCamera.multiplyScalar(cameraDistance);

    // Animation setup
    const startPosition = currentCameraPosition.clone();
    const startTarget = controls.current.target.clone();
    const endTarget = new THREE.Vector3(0, 0, 0); // Always look at center

    let animationId;
    const startTime = performance.now();
    const duration = 1500; // Faster rotation - 1.5 seconds

    const animateCamera = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing function
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const easedProgress = easeInOutCubic(progress);

      // Use spherical interpolation for smoother camera movement
      const tempCamera = new THREE.Vector3();
      tempCamera.lerpVectors(startPosition, newCameraPosition, easedProgress);

      // Ensure camera maintains proper distance
      tempCamera.normalize().multiplyScalar(cameraDistance);
      camera.current.position.copy(tempCamera);

      // Interpolate controls target (always center)
      controls.current.target.lerpVectors(
        startTarget,
        endTarget,
        easedProgress
      );

      // Update controls
      controls.current.update();

      if (progress < 1) {
        animationId = requestAnimationFrame(animateCamera);
      } else {
        // Animation complete - ensure final position is exact
        camera.current.position.copy(newCameraPosition);
        controls.current.target.copy(endTarget);
        controls.current.update();

        // Temporarily disable auto-rotation during focus
        controls.current.autoRotate = false;
        // Re-enable after 3 seconds
        setTimeout(() => {
          if (controls.current) {
            controls.current.autoRotate = true;
          }
        }, 3000);
      }
    };

    // Start animation
    animationId = requestAnimationFrame(animateCamera);

    // Store animation ID for cleanup
    if (controls.current.focusAnimation) {
      cancelAnimationFrame(controls.current.focusAnimation);
    }
    controls.current.focusAnimation = animationId;
  }, []);

  // Focus on mesh when selection changes (from any source)
  useEffect(() => {
    if (selected !== null) {
      // Small delay to ensure mesh is rendered
      setTimeout(() => focusOnMesh(selected), 100);
    }
  }, [selected, focusOnMesh]);

  // Highlight selected mesh border with much better visibility
  useEffect(() => {
    meshes.current.forEach((mesh) => {
      mesh.children.forEach((child) => {
        if (child.isLineSegments) {
          if (selected !== null && mesh.userData.index === selected) {
            // Selected item - MUCH more visible bright gold border
            child.material.color.set("#FFD700"); // Gold color
            child.material.linewidth = 15; // Much thicker border
            child.material.transparent = true;
            child.material.opacity = 1.0; // Fully opaque
            child.material.needsUpdate = true;
            child.visible = true;

            // Make all glow borders visible (they already exist)
            if (mesh.userData.glowBorder) {
              mesh.userData.glowBorder.visible = true;
            }
            if (mesh.userData.outerGlowBorder) {
              mesh.userData.outerGlowBorder.visible = true;
            }
            if (mesh.userData.pulseBorder) {
              mesh.userData.pulseBorder.visible = true;
            }
          } else {
            // Non-selected items
            if (mesh.userData.hasImage) {
              // Image spots - hide border when not selected
              child.visible = false;
            } else {
              // Empty spots - keep subtle border visible
              child.material.color.set(0x666666);
              child.material.linewidth = 3;
              child.material.transparent = true;
              child.material.opacity = 0.7;
              child.material.needsUpdate = true;
              child.visible = true;
            }

            // Hide all glow borders for non-selected (they already exist)
            if (mesh.userData.glowBorder) {
              mesh.userData.glowBorder.visible = false;
            }
            if (mesh.userData.outerGlowBorder) {
              mesh.userData.outerGlowBorder.visible = false;
            }
            if (mesh.userData.pulseBorder) {
              mesh.userData.pulseBorder.visible = false;
            }
          }
        }
      });
    });
  }, [selected]);

  return (
    <div className="c-orb  card shadow-lg flex items-center justify-center">
      <div
        className="orb-canvas-container rounded-xl overflow-hidden"
        ref={onRef}
      />
    </div>
  );
}

export default Orb;
