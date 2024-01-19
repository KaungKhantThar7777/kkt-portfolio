"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Shapes() {
  return (
    <Canvas>
      <Suspense fallback="loading">
        <Geometries />
        <ContactShadows />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      rate: 0.3,
      geometry: new THREE.IcosahedronGeometry(1.3), // Gem
    },
    {
      position: [-0.8, -0.6, -1],
      rate: 0.4,
      geometry: new THREE.CapsuleGeometry(0.3, 1, 4, 16), // Pill
    },

    {
      position: [-0.6, 0.5, 0],
      rate: 0.4,
      geometry: new THREE.ConeGeometry(0.5, 1.5, 8),
    },
    {
      position: [0.6, -0.3, 0],
      rate: 0.5,
      geometry: new THREE.TorusGeometry(0.4, 0.25, 16, 32), // Donut
    },
    {
      position: [1.6, 1.6, -4],
      rate: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5), // Diamond
    },
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0x2980b9,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.1,
      metalness: 0.5,
    }),
  ];

  const soundEffects = [
    new Audio("/sounds/click1.ogg"),
    new Audio("/sounds/click2.ogg"),
    new Audio("/sounds/click3.ogg"),
    new Audio("/sounds/click4.ogg"),
    new Audio("/sounds/click5.ogg"),
  ];

  return geometries.map(({ geometry, position, rate }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 3)}
      geometry={geometry}
      materials={materials}
      soundEffects={soundEffects}
      rate={rate}
    />
  ));
}

function Geometry({ position, geometry, materials, rate, soundEffects }) {
  const meshRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const startingMaterial = getRandomMaterial();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: "elastic.out(1, 0.3)",
        delay: 0.5,
      });
      setIsVisible(true);
    });

    return () => ctx.revert();
  }, []);

  function handleClick(e) {
    const mesh = e.object;

    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 3)}`,
      y: `+=${gsap.utils.random(0, 3)}`,
      z: `+=${gsap.utils.random(0, 3)}`,
      duration: 1.3,
      ease: "elastic.out(1, 0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  function handlePointerOver() {
    document.body.style.cursor = "pointer";
  }

  function handlePointerOut() {
    document.body.style.cursor = "default";
  }

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }
  return (
    <group position={position} ref={meshRef}>
      <Float
        speed={5 * rate}
        rotationIntensity={6 * rate}
        floatIntensity={5 * rate}
      >
        <mesh
          geometry={geometry}
          visible={isVisible}
          material={startingMaterial}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
      </Float>
    </group>
  );
}
