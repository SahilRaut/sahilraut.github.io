document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});

setInterval(()=>{
  if(Math.random()>0.94){
    document.body.style.filter='brightness(1.4) contrast(1.1)';
    setTimeout(()=>{document.body.style.filter='';},70);
  }
},1500);
