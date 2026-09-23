"use client";

import dynamic from "next/dynamic";

const LabCanvas = dynamic(() => import("../components/LabCanvas"), { ssr: false });

export default function Home() {
  return (
    <>
      <LabCanvas />
      <div className="scrim" aria-hidden="true" />

      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top">
            <img src="/assets/main_logo.svg" alt="SR" />
            <span className="brand-text">
              SAHIL RAUT <span className="dot">*</span> ROBOTICS
            </span>
          </a>
          <div className="nav-links">
            <a href="#projects">SYSTEMS</a>
            <a href="#about">PROFILE</a>
            <a href="#experience">STACK</a>
          </div>
          <a className="contact-link" href="mailto:hisahiltech@gmail.com">
            CONTACT &#8599;
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <h1 className="glitch-title">
            <span className="line">BUILDING</span>
            <span className="line">MACHINES</span>
            <span className="line">THAT</span>
            <span className="line">THINK.</span>
          </h1>
          <p className="hero-sub">
            ** HUMANOID ROBOTICS, EMBODIED CONTROL AND LARGE LANGUAGE MODELS &mdash; ENGINEERING
            BODIES THAT CAN REASON ABOUT THE WORLD THEY MOVE THROUGH.
          </p>
          <div className="actions">
            <a className="button primary" href="#projects">
              View systems
            </a>
            <a className="button ghost" href="mailto:hisahiltech@gmail.com">
              Contact
            </a>
          </div>
        </section>

        <section id="about" className="section container">
          <p className="eyebrow">// 01 PROFILE</p>
          <h2 className="section-title">Engineering intelligence for the physical world</h2>
          <div className="card">
            <p>
              My work sits at the intersection of machine learning, robotics, and real-world
              deployment. I build systems that connect perception, planning, control, and
              hardware into reliable robotic behaviors.
            </p>
            <p>
              From production manipulation models to camera calibration and embedded
              integration, I take ideas from simulation to a working robot.
            </p>
          </div>
          <div className="stat-grid">
            <div className="stat-box">
              <span className="stat-num">01</span>Manipulation &amp; control
            </div>
            <div className="stat-box">
              <span className="stat-num">10</span>Learning-based perception
            </div>
            <div className="stat-box">
              <span className="stat-num">11</span>Simulation &amp; deployment
            </div>
          </div>
        </section>

        <section id="projects" className="section container">
          <p className="eyebrow">// 02 SYSTEMS</p>
          <h2 className="section-title">Selected work</h2>
          <div className="projects-grid">
            <article className="card project">
              <div className="project-tag">ROBOT LEARNING</div>
              <h3>Production Manipulation Systems</h3>
              <p>
                Learning-based manipulation models developed for production robots, combining
                perception, calibration, and robust deployment workflows.
              </p>
              <div className="chips">
                <span>Python</span>
                <span>PyTorch</span>
                <span>ROS2</span>
              </div>
            </article>
            <article className="card project">
              <div className="project-tag">PERCEPTION</div>
              <h3>Vision for Robotics</h3>
              <p>
                Camera and sensor pipelines for object understanding, robot calibration, and
                reliable interaction with the environment.
              </p>
              <div className="chips">
                <span>OpenCV</span>
                <span>Calibration</span>
              </div>
            </article>
            <article className="card project">
              <div className="project-tag">SIMULATION</div>
              <h3>Sim-to-Real Workflows</h3>
              <p>
                Simulation-first development workflows that accelerate experimentation before
                deployment on physical robotic platforms.
              </p>
              <div className="chips">
                <span>Sim</span>
                <span>Deploy</span>
              </div>
            </article>
          </div>
        </section>

        <section id="experience" className="section container">
          <p className="eyebrow">// 03 STACK</p>
          <h2 className="section-title">Where I&apos;ve been building</h2>
          <div className="card log-row">
            <span className="log-tag">NOW</span>
            <div>
              <h3>NEURA Robotics</h3>
              <p>Robotics &amp; Machine Learning Engineer &mdash; manipulation, perception, integration</p>
            </div>
          </div>
          <div className="card log-row">
            <span className="log-tag">ONGOING</span>
            <div>
              <h3>Personal robotics lab</h3>
              <p>ROS2, vision, embedded prototyping</p>
            </div>
          </div>
        </section>

        <section className="cta container">
          <p className="eyebrow">// CONNECT</p>
          <h2 className="section-title">Have a difficult robotics problem?</h2>
          <a className="button primary" href="mailto:hisahiltech@gmail.com">
            Start a conversation
          </a>
        </section>
      </main>

      <footer className="footer container">
        <div className="footer-left">
          <img src="/assets/main_logo.svg" alt="SR" />
          <p>Robotics &amp; physical AI systems</p>
        </div>
        <div className="footer-links">
          <a href="mailto:hisahiltech@gmail.com">Email</a>
          <a href="https://github.com/SahilRaut" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <p className="copyright">&copy; 2026 Sahil Raut</p>
      </footer>
    </>
  );
}
