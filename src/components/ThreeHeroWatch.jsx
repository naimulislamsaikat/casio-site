import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useClock from "../hooks/useClock.js";

/**
 * ThreeHeroWatch
 * Procedural 3D Horology Watch built strictly with primitive Three.js geometry.
 * Uses vanilla Three.js for maximum performance, rock-solid stability,
 * and zero React reconciler overhead.
 */
export default function ThreeHeroWatch() {
  const canvasRef = useRef(null);
  const now = useClock();
  const [lit, setLit] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const dialTextureRef = useRef(null);

  // Dedicated offscreen canvas for crisp procedural LCD dial graphics
  const offscreenCanvasRef = useRef(null);
  if (!offscreenCanvasRef.current) {
    offscreenCanvasRef.current = document.createElement("canvas");
    offscreenCanvasRef.current.width = 512;
    offscreenCanvasRef.current.height = 384;
  }

  // Update dynamic procedural LCD texture whenever clock ticks or backlight toggles
  useEffect(() => {
    const canvas = offscreenCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background color: LCD green or backlit amber
    ctx.fillStyle = lit ? "#f4b942" : "#c3cda6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dark technical bezel border
    ctx.strokeStyle = "#222820";
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Day of week & format indicator
    ctx.fillStyle = "#222820";
    ctx.font = "bold 32px Chakra Petch, sans-serif";
    const day = now.toLocaleDateString("en", { weekday: "short" }).toUpperCase();
    ctx.fillText(`${day} 24HR`, 36, 72);

    // Main digital time readout
    const pad = (n) => String(n).padStart(2, "0");
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const secStr = pad(now.getSeconds());

    ctx.font = "bold 124px Orbitron, sans-serif";
    ctx.fillText(timeStr, 36, 230);

    ctx.font = "bold 56px Orbitron, sans-serif";
    ctx.fillText(secStr, 400, 230);

    // Micro labels
    ctx.font = "600 22px Figtree, sans-serif";
    ctx.fillText("WATER 20BAR RESIST", 36, 310);
    ctx.fillText("LITHIUM CALIBER", 36, 345);

    if (dialTextureRef.current) {
      dialTextureRef.current.needsUpdate = true;
    }
  }, [now, lit]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(340, 340);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(4, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc3cda6, 0.9);
    dirLight2.position.set(-4, -3, 3);
    scene.add(dirLight2);

    const backlight = new THREE.PointLight(lit ? 0xf4b942 : 0xffffff, lit ? 2.5 : 0.4, 10);
    backlight.position.set(0, 0, 3.5);
    scene.add(backlight);

    // 3. Procedural Dial Texture
    const dialTexture = new THREE.CanvasTexture(offscreenCanvasRef.current);
    dialTexture.minFilter = THREE.LinearFilter;
    dialTextureRef.current = dialTexture;

    // 4. Construct Watch using Primitive Geometry
    const watchGroup = new THREE.Group();

    // Main Octagonal/Chiseled Case
    const caseGeo = new THREE.CylinderGeometry(1.9, 1.9, 0.7, 8);
    const caseMat = new THREE.MeshStandardMaterial({
      color: 0x242823,
      roughness: 0.45,
      metalness: 0.35,
    });
    const watchCase = new THREE.Mesh(caseGeo, caseMat);
    watchGroup.add(watchCase);

    // Inner Bezel Rim
    const bezelGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.2, 32);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x1b1f1a,
      roughness: 0.3,
      metalness: 0.6,
    });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    bezel.position.z = 0.3;
    watchGroup.add(bezel);

    // Dial Plate with live canvas readout
    const dialGeo = new THREE.PlaneGeometry(2.0, 1.5);
    const dialMat = new THREE.MeshBasicMaterial({ map: dialTexture });
    const dial = new THREE.Mesh(dialGeo, dialMat);
    dial.position.z = 0.42;
    watchGroup.add(dial);

    // Mineral Glass Lens
    const glassGeo = new THREE.CylinderGeometry(1.52, 1.52, 0.04, 32);
    const glassMat = new THREE.MeshPhysicalMaterial({
      transparent: true,
      opacity: 0.28,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.95,
      ior: 1.5,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.z = 0.45;
    watchGroup.add(glass);

    // 4 Corner Screws
    const screwPositions = [
      [-1.35, 1.2],
      [1.35, 1.2],
      [-1.35, -1.2],
      [1.35, -1.2],
    ];
    const screwGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.12, 16);
    const screwMat = new THREE.MeshStandardMaterial({
      color: 0xd5d9cc,
      metalness: 0.85,
      roughness: 0.25,
    });
    screwPositions.forEach(([sx, sy]) => {
      const screw = new THREE.Mesh(screwGeo, screwMat);
      screw.position.set(sx, sy, 0.38);
      screw.rotation.x = Math.PI / 2;
      watchGroup.add(screw);
    });

    // Upper Resin Strap
    const strapGeo = new THREE.BoxGeometry(1.6, 2.4, 0.24);
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x2e352e,
      roughness: 0.7,
      metalness: 0.1,
    });
    const topStrap = new THREE.Mesh(strapGeo, strapMat);
    topStrap.position.set(0, 2.65, -0.1);
    watchGroup.add(topStrap);

    // Lower Resin Strap
    const bottomStrap = new THREE.Mesh(strapGeo, strapMat);
    bottomStrap.position.set(0, -2.65, -0.1);
    watchGroup.add(bottomStrap);

    scene.add(watchGroup);

    // 5. Animation Frame Loop with Silky 60fps Lerp
    let animId;
    let currentRotX = 0.15;
    let currentRotY = 0;

    const animate = () => {
      // Calculate scroll fraction for scroll rotation
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollProgress = scrollY / maxScroll;

      const targetRotY = (pointerRef.current.x * 0.55) + (scrollProgress * Math.PI * 1.8);
      const targetRotX = (-pointerRef.current.y * 0.45) + 0.15;

      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;

      watchGroup.rotation.y = currentRotY;
      watchGroup.rotation.x = currentRotX;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dialTexture.dispose();
      renderer.dispose();
    };
  }, [lit]);

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current = { x, y };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      className="three-watch-canvas-wrap"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas ref={canvasRef} className="three-watch-canvas" />

      <div className="three-watch-controls">
        <button
          className="three-light-toggle-btn"
          onClick={() => setLit(!lit)}
          aria-pressed={lit}
        >
          {lit ? "Deactivate Illumination" : "Backlight 3D Bezel"}
        </button>
      </div>
    </div>
  );
}
