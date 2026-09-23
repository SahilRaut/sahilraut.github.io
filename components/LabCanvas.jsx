"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import LabScene from "./LabScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CameraRig({ cameraGroupRef }) {
  useEffect(() => {
    if (!cameraGroupRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#top",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(cameraGroupRef.current.position, { z: 1.2, x: 0.6, y: 0.3, duration: 1, ease: "none" })
      .to(cameraGroupRef.current.rotation, { y: -0.15, duration: 1, ease: "none" }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [cameraGroupRef]);

  return null;
}

export default function LabCanvas() {
  const cameraGroupRef = useRef();
  const armGroupRef = useRef();

  return (
    <div className="lab-canvas-wrap" aria-hidden="true">
      <Canvas
        shadows
        camera={{ position: [0, 1.6, 4.6], fov: 42 }}
        gl={{ antialias: true }}
        dpr={[1, 1.6]}
      >
        <group ref={cameraGroupRef}>
          <ambientLight intensity={0.25} />
          <hemisphereLight skyColor={"#3a5a8a"} groundColor={"#0a0a10"} intensity={0.3} />
          <LabScene armGroupRef={armGroupRef} />
        </group>
      </Canvas>
      <CameraRig cameraGroupRef={cameraGroupRef} />
    </div>
  );
}
