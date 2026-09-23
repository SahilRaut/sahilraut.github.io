"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGSAP } from "./useGSAP";
import gsap from "gsap";

const COLORS = {
  wall: "#0d1520",
  floor: "#182430",
  desk: "#6b4a2c",
  metal: "#3a4a58",
  darkMetal: "#1a2530",
  screenGlow: "#5fd6ff",
  lampWarm: "#ffcf7a",
  chairRed: "#a83c3c",
  botBody: "#c7cdd4",
  botDark: "#2a3038",
};

function Desk() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 0.08, 1.3]} />
        <meshStandardMaterial color={COLORS.desk} roughness={0.7} />
      </mesh>
      {[-2.4, 2.4].map((x) => (
        <mesh key={x} position={[x, 0.37, 0.45]} castShadow>
          <boxGeometry args={[0.1, 0.75, 0.1]} />
          <meshStandardMaterial color={COLORS.metal} />
        </mesh>
      ))}
      {[-2.4, 2.4].map((x) => (
        <mesh key={"b" + x} position={[x, 0.37, -0.45]} castShadow>
          <boxGeometry args={[0.1, 0.75, 0.1]} />
          <meshStandardMaterial color={COLORS.metal} />
        </mesh>
      ))}
    </group>
  );
}

function Monitor({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.05, -0.02]} castShadow>
        <boxGeometry args={[0.05, 0.55, 0.65]} />
        <meshStandardMaterial color={COLORS.darkMetal} />
      </mesh>
      <mesh position={[0, 0.05, -0.35]} castShadow>
        <boxGeometry args={[0.85, 0.55, 0.04]} />
        <meshStandardMaterial color="#111820" />
      </mesh>
      <mesh position={[0, 0.05, -0.32]}>
        <planeGeometry args={[0.75, 0.46]} />
        <meshStandardMaterial
          color={COLORS.screenGlow}
          emissive={COLORS.screenGlow}
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      <pointLight position={[0, 0.1, 0]} color={COLORS.screenGlow} intensity={0.6} distance={1.5} />
    </group>
  );
}

function HangingLamp({ x }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 1.2, 6]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 1.7, 0]} castShadow>
        <coneGeometry args={[0.28, 0.18, 16, 1, true]} />
        <meshStandardMaterial color="#1c1c1c" side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[0, 1.6, 0]} color={COLORS.lampWarm} intensity={2.2} distance={4} decay={2} castShadow />
    </group>
  );
}

function Shelf() {
  const boxes = useMemo(
    () =>
      new Array(8).fill(0).map((_, i) => ({
        x: -1.6 + (i % 4) * 0.9,
        y: i < 4 ? 0.25 : -0.35,
        s: 0.35 + Math.random() * 0.15,
        c: i % 2 === 0 ? COLORS.botBody : COLORS.botDark,
      })),
    []
  );
  return (
    <group position={[0, 2.55, -1.05]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.2, 1.1, 0.5]} />
        <meshStandardMaterial color="#4a3520" roughness={0.8} />
      </mesh>
      {boxes.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, 0.1]} castShadow>
          <boxGeometry args={[b.s, b.s, b.s]} />
          <meshStandardMaterial color={b.c} roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function WindowSkyline() {
  const buildings = useMemo(
    () =>
      new Array(10).fill(0).map((_, i) => ({
        x: -1.8 + i * 0.4,
        h: 0.3 + Math.random() * 1.1,
      })),
    []
  );
  return (
    <group position={[5.6, 2.4, -1.3]} rotation={[0, -Math.PI / 2, 0]}>
      <mesh>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#0a1428" emissive="#0a1e3a" emissiveIntensity={0.4} />
      </mesh>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, -1.5 + b.h / 2, 0.02]}>
          <boxGeometry args={[0.32, b.h, 0.05]} />
          <meshStandardMaterial color="#0d1a2e" emissive="#3a5a8a" emissiveIntensity={0.3} />
        </mesh>
      ))}
      <mesh position={[1.4, 1.1, 0.03]}>
        <circleGeometry args={[0.18, 16]} />
        <meshStandardMaterial color="#dfe8ff" emissive="#dfe8ff" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Mannequin() {
  return (
    <group position={[4.6, 1.05, 0.3]}>
      <mesh position={[0, -0.35, 0]} castShadow>
        <boxGeometry args={[0.42, 0.65, 0.24]} />
        <meshStandardMaterial color={COLORS.botBody} roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.32, 0.34, 0.3]} />
        <meshStandardMaterial color={COLORS.botDark} roughness={0.3} metalness={0.5} />
      </mesh>
      {[-0.28, 0.28].map((x) => (
        <mesh key={x} position={[x, -0.05, 0]} castShadow>
          <boxGeometry args={[0.12, 0.55, 0.12]} />
          <meshStandardMaterial color={COLORS.botBody} roughness={0.4} metalness={0.4} />
        </mesh>
      ))}
      {[-0.14, 0.14].map((x) => (
        <mesh key={"l" + x} position={[x, -0.95, 0]} castShadow>
          <boxGeometry args={[0.14, 0.7, 0.14]} />
          <meshStandardMaterial color={COLORS.botDark} roughness={0.4} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function RoboticArm({ groupRef }) {
  const shoulderRef = useRef();
  const elbowRef = useRef();
  const wristRef = useRef();
  const gripRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });
    tl.to(shoulderRef.current.rotation, { y: -0.8, duration: 1.1 }, 0)
      .to(elbowRef.current.rotation, { z: -0.9, duration: 1.1 }, 0)
      .to(gripRef.current.rotation, { z: 0.35, duration: 0.4 }, 1.1)
      .to(shoulderRef.current.rotation, { y: 0.6, duration: 1.2 }, 1.6)
      .to(elbowRef.current.rotation, { z: -0.4, duration: 1.2 }, 1.6)
      .to(gripRef.current.rotation, { z: 0, duration: 0.4 }, 2.8)
      .to(shoulderRef.current.rotation, { y: 0, duration: 1.1 }, 3.3)
      .to(elbowRef.current.rotation, { z: 0, duration: 1.1 }, 3.3);
  }, []);

  return (
    <group ref={groupRef} position={[-2.2, 0.79, 0.2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 12]} />
        <meshStandardMaterial color={COLORS.botDark} metalness={0.6} roughness={0.3} />
      </mesh>
      <group ref={shoulderRef} position={[0, 0.08, 0]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial color={COLORS.botBody} metalness={0.5} roughness={0.3} />
        </mesh>
        <group ref={elbowRef} position={[0, 0.5, 0]}>
          <mesh position={[0.22, 0, 0]} castShadow>
            <boxGeometry args={[0.4, 0.1, 0.1]} />
            <meshStandardMaterial color={COLORS.botBody} metalness={0.5} roughness={0.3} />
          </mesh>
          <group ref={wristRef} position={[0.42, 0, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color={COLORS.botDark} metalness={0.6} />
            </mesh>
            <group ref={gripRef} position={[0.08, 0, 0]}>
              <mesh position={[0.05, 0.05, 0]} castShadow>
                <boxGeometry args={[0.12, 0.03, 0.03]} />
                <meshStandardMaterial color="#e8e8ee" />
              </mesh>
              <mesh position={[0.05, -0.05, 0]} castShadow>
                <boxGeometry args={[0.12, 0.03, 0.03]} />
                <meshStandardMaterial color="#e8e8ee" />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

function WalkingHumanoid() {
  const rootRef = useRef();
  const legLRef = useRef();
  const legRRef = useRef();
  const armLRef = useRef();
  const armRRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });
    tl.to(legLRef.current.rotation, { x: 0.5, duration: 0.5 }, 0)
      .to(legRRef.current.rotation, { x: -0.5, duration: 0.5 }, 0)
      .to(armLRef.current.rotation, { x: -0.4, duration: 0.5 }, 0)
      .to(armRRef.current.rotation, { x: 0.4, duration: 0.5 }, 0)
      .to(legLRef.current.rotation, { x: -0.5, duration: 0.5 }, 0.5)
      .to(legRRef.current.rotation, { x: 0.5, duration: 0.5 }, 0.5)
      .to(armLRef.current.rotation, { x: 0.4, duration: 0.5 }, 0.5)
      .to(armRRef.current.rotation, { x: -0.4, duration: 0.5 }, 0.5);

    gsap.to(rootRef.current.position, {
      x: 3.4,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <group ref={rootRef} position={[-3.4, 0, 1.6]}>
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[0.3, 0.22, 0.26]} />
        <meshStandardMaterial color={COLORS.botDark} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[0.34, 0.55, 0.22]} />
        <meshStandardMaterial color={COLORS.botBody} metalness={0.4} roughness={0.4} />
      </mesh>
      <group ref={armLRef} position={[-0.24, 1.0, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color={COLORS.botBody} metalness={0.4} />
        </mesh>
      </group>
      <group ref={armRRef} position={[0.24, 1.0, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color={COLORS.botBody} metalness={0.4} />
        </mesh>
      </group>
      <group ref={legLRef} position={[-0.1, 0.45, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial color={COLORS.botDark} metalness={0.4} />
        </mesh>
      </group>
      <group ref={legRRef} position={[0.1, 0.45, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial color={COLORS.botDark} metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

function Chair() {
  return (
    <group position={[0, 0, 0.9]}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.08]} />
        <meshStandardMaterial color={COLORS.chairRed} />
      </mesh>
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.06, 16]} />
        <meshStandardMaterial color={COLORS.chairRed} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
      <planeGeometry args={[16, 10]} />
      <meshStandardMaterial color={COLORS.floor} roughness={0.35} metalness={0.15} />
    </mesh>
  );
}

function BackWall() {
  return (
    <mesh position={[0, 2.5, -1.35]}>
      <planeGeometry args={[16, 6]} />
      <meshStandardMaterial color={COLORS.wall} />
    </mesh>
  );
}

export default function LabScene({ armGroupRef }) {
  return (
    <group>
      <Floor />
      <BackWall />
      <Desk />
      <Chair />
      <Monitor position={[-0.9, 1.15, -0.15]} />
      <Monitor position={[0, 1.15, -0.15]} />
      <Monitor position={[0.9, 1.15, -0.15]} />
      <Shelf />
      <HangingLamp x={-0.6} />
      <HangingLamp x={0.6} />
      <WindowSkyline />
      <Mannequin />
      <RoboticArm groupRef={armGroupRef} />
      <WalkingHumanoid />
    </group>
  );
}
