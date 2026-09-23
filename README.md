# Sahil Raut -- Robotics Portfolio

Built with Next.js (static export), React Three Fiber, Three.js, and GSAP + ScrollTrigger.

## Stack
- **Next.js** app router, statically exported (`output: 'export'`)
- **React Three Fiber** for declarative Three.js scene composition
- **Three.js** procedural geometry for the lab scene (desk, monitors, shelf, window skyline, mannequin)
- **GSAP** timelines animating the robotic arm's pick-and-place cycle and the walking humanoid's gait
- **ScrollTrigger** driving a subtle camera move as you scroll through the hero section

## Local development
```bash
npm install
npm run dev
```

## Build & deploy
Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` (static export to `/out`) and publishes it to GitHub Pages.

Make sure GitHub Pages is configured to deploy from **GitHub Actions** (Settings -> Pages -> Source -> GitHub Actions), not from a branch, since this repo now ships a Next.js static export instead of a plain `index.html`.
