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
