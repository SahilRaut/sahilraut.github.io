document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});

const BIT_CHARS = '01';

function glitchWord(el){
  const original = el.dataset.word || el.textContent;
  const chars = original.split('');
  let frame = 0;
  const totalFrames = 14;
  const revealAt = chars.map((_,i)=> Math.floor((i/chars.length)*totalFrames*0.6));

  const interval = setInterval(()=>{
    let out = '';
    for(let i=0;i<chars.length;i++){
      const ch = chars[i];
      if(ch === ' ' ){ out += ' '; continue; }
      if(frame >= revealAt[i] + 4){
        out += ch;
      } else if (Math.random() < 0.6){
        out += BIT_CHARS[Math.floor(Math.random()*2)];
      } else {
        out += ch;
      }
    }
    el.textContent = out;
    frame++;
    if(frame > totalFrames){
      clearInterval(interval);
      el.textContent = original;
    }
  }, 45);
}

function runGlitchSequence(){
  const lines = document.querySelectorAll('.glitch-title .line');
  lines.forEach((el, idx)=>{
    setTimeout(()=> glitchWord(el), idx * 260);
  });
}

window.addEventListener('DOMContentLoaded', ()=>{
  runGlitchSequence();
  setInterval(runGlitchSequence, 9000);
});

document.querySelectorAll('.glitch-title .line').forEach(el=>{
  el.addEventListener('mouseenter', ()=> glitchWord(el));
});

(function(){
  const svg = document.getElementById('labRig');
  if(!svg) return;
  const hero = document.querySelector('.hero');
  const VB = {w:1400, h:700};

  const shoulders = {
    left:  {x:620, y:430, l1:130, l2:110, mirror:-1},
    right: {x:780, y:430, l1:130, l2:110, mirror:1}
  };

  let target = {x:700, y:470};
  let smoothed = {x:700, y:470};
  const restTargets = {left:{x:400,y:560}, right:{x:1000,y:560}};
  const restHead = 700;

  function svgPointFromEvent(e){
    const rect = svg.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    return { x: nx * VB.w, y: ny * VB.h };
  }

  function solveIK(shoulder, tx, ty){
    const {x:sx, y:sy, l1, l2, mirror} = shoulder;
    let dx = (tx - sx) * mirror;
    let dy = ty - sy;
    let dist = Math.sqrt(dx*dx + dy*dy);
    const maxReach = l1 + l2 - 4;
    const minReach = Math.abs(l1 - l2) + 4;
    dist = Math.max(minReach, Math.min(maxReach, dist));
    const angleToTarget = Math.atan2(dy, dx);
    const cosElbow = (l1*l1 + l2*l2 - dist*dist) / (2*l1*l2);
    const elbowAngle = Math.acos(Math.max(-1, Math.min(1, cosElbow)));
    const cosShoulder = (l1*l1 + dist*dist - l2*l2) / (2*l1*dist);
    const shoulderOffset = Math.acos(Math.max(-1, Math.min(1, cosShoulder)));
    const shoulderAngle = angleToTarget - shoulderOffset;

    const ex = sx + mirror * l1 * Math.cos(shoulderAngle);
    const ey = sy + l1 * Math.sin(shoulderAngle);
    const wristAngle = shoulderAngle + (Math.PI - elbowAngle);
    const hx = ex + mirror * l2 * Math.cos(wristAngle);
    const hy = ey + l2 * Math.sin(wristAngle);

    return {ex, ey, hx, hy};
  }

  function applyPose(side, pose){
    const link1 = document.getElementById(side[0]+'Link1');
    const joint1 = document.getElementById(side[0]+'Joint1');
    const link2 = document.getElementById(side[0]+'Link2');
    const joint2 = document.getElementById(side[0]+'Joint2');
    const gripper = document.getElementById(side[0]+'Gripper');

    link1.setAttribute('x2', pose.ex.toFixed(1));
    link1.setAttribute('y2', pose.ey.toFixed(1));
    joint1.setAttribute('cx', pose.ex.toFixed(1));
    joint1.setAttribute('cy', pose.ey.toFixed(1));
    link2.setAttribute('x1', pose.ex.toFixed(1));
    link2.setAttribute('y1', pose.ey.toFixed(1));
    link2.setAttribute('x2', pose.hx.toFixed(1));
    link2.setAttribute('y2', pose.hy.toFixed(1));
    joint2.setAttribute('cx', pose.hx.toFixed(1));
    joint2.setAttribute('cy', pose.hy.toFixed(1));
    gripper.setAttribute('transform', `translate(${pose.hx.toFixed(1)},${pose.hy.toFixed(1)})`);
  }

  let mouseActive = false;
  let lastMove = 0;

  window.addEventListener('mousemove', (e)=>{
    if(!hero) return;
    const rect = hero.getBoundingClientRect();
    const inside = e.clientY >= rect.top && e.clientY <= rect.bottom;
    mouseActive = inside;
    if(inside){
      target = svgPointFromEvent(e);
      lastMove = performance.now();
    }
  });

  const head = document.getElementById('head');

  function tick(){
    const now = performance.now();
    const idle = now - lastMove > 2500 || !mouseActive;

    const ease = 0.08;
    smoothed.x += (target.x - smoothed.x) * ease;
    smoothed.y += (target.y - smoothed.y) * ease;

    const poseL = solveIK(shoulders.left, idle ? restTargets.left.x : smoothed.x, idle ? restTargets.left.y : smoothed.y);
    const poseR = solveIK(shoulders.right, idle ? restTargets.right.x : smoothed.x, idle ? restTargets.right.y : smoothed.y);
    applyPose('left', poseL);
    applyPose('right', poseR);

    if(head){
      const headTurn = idle ? 0 : Math.max(-14, Math.min(14, (smoothed.x - restHead) * 0.03));
      const headTilt = idle ? 0 : Math.max(-6, Math.min(6, (smoothed.y - 470) * 0.01));
      head.setAttribute('transform', `translate(700,${(360+headTilt).toFixed(1)}) rotate(${headTurn.toFixed(1)})`);
    }

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
