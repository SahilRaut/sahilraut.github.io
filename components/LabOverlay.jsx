"use client";

import { useEffect, useState } from "react";

const words = ["BUILDING", "MACHINES", "THAT", "THINK."];

export default function LabOverlay() {
  const [paused, setPaused] = useState(false);
  const [task, setTask] = useState("PICK / PLACE");
  const [progress, setProgress] = useState(68);
  const [display, setDisplay] = useState(words);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setProgress((v) => v >= 100 ? 0 : v + 1), 100);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (let wi = 0; wi < words.length; wi++) {
        const word = words[wi];
        for (let frame = 0; frame < 7; frame++) {
          if (cancelled) return;
          setDisplay((current) => current.map((value, i) => i !== wi ? value : word.split("").map((ch, ci) => ci < frame ? ch : (Math.random() > .5 ? "0" : "1")).join("")));
          await new Promise((resolve) => setTimeout(resolve, 55));
        }
        setDisplay((current) => current.map((value, i) => i === wi ? word : value));
      }
      if (!cancelled) setTimeout(run, 8500);
    };
    run();
    return () => { cancelled = true; };
  }, []);

  return <>
    <div className={`scene-motion ${paused ? "is-paused" : ""}`} aria-hidden="true">
      <div className="lamp-flicker lamp-one" /><div className="lamp-flicker lamp-two" />
      <div className="screen-scan screen-one" /><div className="screen-scan screen-two" /><div className="screen-scan screen-three" />
      <div className="robot-arm desk-arm"><span className="arm-base"/><span className="arm-segment arm-segment-a"/><span className="arm-joint"/><span className="arm-segment arm-segment-b"/><span className="arm-wrist"/><span className="gripper"/></div>
      <div className="humanoid"><span className="hum-head"/><span className="hum-neck"/><span className="hum-torso"/><span className="hum-shoulder hum-shoulder-a"/><span className="hum-shoulder hum-shoulder-b"/><span className="hum-arm hum-arm-a"/><span className="hum-arm hum-arm-b"/><span className="hum-forearm hum-forearm-a"/><span className="hum-forearm hum-forearm-b"/><span className="hum-pelvis"/><span className="hum-leg hum-leg-a"/><span className="hum-leg hum-leg-b"/><span className="hum-shin hum-shin-a"/><span className="hum-shin hum-shin-b"/><span className="hum-foot hum-foot-a"/><span className="hum-foot hum-foot-b"/></div>
      <div className="window-flicker window-flicker-a"/><div className="window-flicker window-flicker-b"/><div className="window-flicker window-flicker-c"/>
    </div>
    <aside className="telemetry-overlay" aria-label="live robotics telemetry">
      <div className="telemetry-top"><span>LAB / LIVE OVERLAY</span><button onClick={() => setPaused((v) => !v)}>{paused ? "RESUME" : "PAUSE"}</button></div>
      <div className="telemetry-status"><span className={paused ? "status paused" : "status"}>● {paused ? "HOLD" : "RUNNING"}</span><span>MANIPULATOR A</span></div>
      <div className="overlay-task"><span>TASK</span><strong>{task}</strong></div>
      <div className="overlay-progress"><span style={{width:`${progress}%`}}/></div>
      <div className="overlay-meta"><span>EXECUTION {progress}%</span><span>CAM 03 · SAFE</span></div>
      <div className="overlay-actions"><button onClick={() => {setTask("PICK / PLACE");setProgress(68)}}>PICK</button><button onClick={() => {setTask("WHOLE-BODY REACH");setProgress(24)}}>REACH</button><button onClick={() => {setTask("VISUAL INSPECTION");setProgress(12)}}>SCAN</button></div>
    </aside>
    <div className="binary-headline" aria-hidden="true">{display.map((word, i) => <span key={i}>{word}</span>)}</div>
  </>;
}
