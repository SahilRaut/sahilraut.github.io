"use client";

import LabOverlay from "../components/LabOverlay";

export default function Home() {
  return (
    <main className="console-page">
      <div className="lab-art" aria-hidden="true" />
      <div className="lab-shade" aria-hidden="true" />
      <LabOverlay />
      <header className="topbar">
        <a className="brand" href="#top"><img src="/assets/main_logo.svg" alt="SR"/><span>SAHIL RAUT <i>*</i> ROBOTICS</span></a>
        <nav><a href="#systems">SYSTEMS</a><a href="#profile">PROFILE</a><a href="#stack">STACK</a></nav>
        <a className="contact" href="mailto:hisahiltech@gmail.com">CONTACT ↗</a>
      </header>
      <section className="hero-console" id="top">
        <div className="hero-copy">
          <p className="kicker">// ROBOTICS LAB / LIVE SESSION 042</p>
          <h1>BUILDING<br/>MACHINES<br/>THAT THINK.</h1>
          <p className="lede">Humanoid robotics, embodied control, and manipulation systems engineered to reason about the world they move through.</p>
          <div className="hero-actions"><a href="#systems" className="solid-btn">OPEN SYSTEMS</a><a href="mailto:hisahiltech@gmail.com" className="line-btn">CONTACT</a></div>
        </div>
        <aside className="telemetry" aria-label="robot telemetry">
          <div className="telemetry-head"><span>LAB / TELEMETRY</span><span className="live">● LIVE</span></div>
          <div className="telemetry-main"><div><span className="label">ACTIVE SYSTEM</span><strong>MANIPULATOR A</strong></div><div className="mode">RUNNING</div></div>
          <div className="task-title"><span>TASK QUEUE</span><span>01 / 03</span></div>
          <div className="task-list"><div className="task selected"><span className="task-id">01</span><span className="task-copy"><b>Pick / place</b><small>Manipulator A · shelf target</small></span><span className="task-status">ACTIVE</span></div><div className="task"><span className="task-id">02</span><span className="task-copy"><b>Whole-body reach</b><small>Humanoid · workspace scan</small></span><span className="task-status">QUEUED</span></div><div className="task"><span className="task-id">03</span><span className="task-copy"><b>Visual inspection</b><small>Cameras · calibration pass</small></span><span className="task-status">READY</span></div></div>
          <div className="progress-label"><span>EXECUTION</span><span>68%</span></div><div className="progress"><span style={{width:"68%"}}/></div>
          <div className="joints-head"><span>JOINT TELEMETRY</span><span>deg</span></div><div className="joint-grid">{[42,68,31,57,23,49].map((v,i)=><div className="joint" key={i}><span>J{i+1}</span><i><em style={{width:`${v}%`}}/></i><b>{v}</b></div>)}</div>
          <div className="console-foot"><span>CAM / 03 ONLINE</span><span>FPS 60</span><span>SAFE</span></div>
        </aside>
      </section>
      <section className="content-section" id="profile"><p className="kicker">// 01 PROFILE</p><h2>Engineering intelligence for the physical world.</h2><p className="body-copy">I build learning-enabled robotic systems that connect perception, planning, control, and hardware into reliable manipulation behaviours. The lab is where models become machines.</p></section>
      <section className="content-section" id="systems"><p className="kicker">// 02 SYSTEMS</p><h2>Useful autonomy, not decoration.</h2><div className="system-grid"><article><span>01</span><h3>Manipulation</h3><p>Production-ready reach, grasp, and place behaviours for physical workcells.</p></article><article><span>10</span><h3>Humanoid control</h3><p>Whole-body coordination for robots that need to move through the real world.</p></article><article><span>11</span><h3>Perception</h3><p>Vision and calibration pipelines that turn a scene into actionable state.</p></article></div></section>
      <section className="content-section" id="stack"><p className="kicker">// 03 STACK</p><h2>Where experiments become systems.</h2><p className="body-copy">Python · PyTorch · ROS2 · OpenCV · simulation · embedded integration</p></section>
      <footer><span>SAHIL RAUT / ROBOTICS</span><span>© 2026</span><a href="mailto:hisahiltech@gmail.com">EMAIL ↗</a></footer>
    </main>
  );
}
