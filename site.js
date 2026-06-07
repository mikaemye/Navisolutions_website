/* ============================================================
   Navi Solutions — HI-FI interactions
   ============================================================ */
(function () {
  'use strict';
  const $ = (s,c)=>(c||document).querySelector(s);
  const $$ = (s,c)=>Array.from((c||document).querySelectorAll(s));
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* nav scrolled */
  const nav=$('.nav');
  const onNav=()=>nav&&nav.classList.toggle('scrolled', scrollY>40);
  onNav();

  /* mobile menu */
  const burger=$('.nav__burger');
  if(burger){
    burger.addEventListener('click',()=>{
      const open=document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded',open);
    });
    $$('.nav__menu a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));
  }

  /* hero entrance */
  const hero=$('.hero');
  if(hero) requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.add('lit')));

  /* reveal: rect-based + polling backstop (robust offscreen) */
  let reveals=$$('.reveal').filter(el=>!el.classList.contains('in'));
  function checkReveals(vh){
    if(!reveals.length) return;
    reveals=reveals.filter(el=>{
      const r=el.getBoundingClientRect();
      if(r.top<vh*0.9 && r.bottom>0){ el.classList.add('in'); return false; }
      return true;
    });
  }

  /* value feature cards expand */
  $$('.vcard--feature').forEach(card=>{
    card.tabIndex=0; card.setAttribute('role','button');
    const t=()=>card.classList.toggle('open');
    card.addEventListener('click',t);
    card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); t(); }});
  });

  /* service rows hover/tap */
  const rows=$$('.svc-row');
  if(rows.length){
    const activate=row=>rows.forEach(r=>{
      const on=r===row; r.classList.toggle('is-active',on); r.setAttribute('aria-expanded',on?'true':'false');
    });
    const collapseAll=()=>rows.forEach(r=>{ r.classList.remove('is-active'); r.setAttribute('aria-expanded','false'); });
    collapseAll();
    const hoverable=matchMedia('(hover: hover) and (pointer: fine)').matches;
    rows.forEach(row=>{
      if(hoverable) row.addEventListener('mouseenter',()=>activate(row));
      row.addEventListener('click',()=>{
        if(!hoverable && row.classList.contains('is-active')){ row.classList.remove('is-active'); row.setAttribute('aria-expanded','false'); }
        else activate(row);
      });
      row.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); activate(row); }});
    });
    const wrap=$('.svc-rows');
    if(hoverable&&wrap) wrap.addEventListener('mouseleave',collapseAll);
  }

  /* scroll choreography */
  const heroMedia=$('.hero__media');
  let ticking=false;
  function frame(){
    ticking=false;
    const vh=innerHeight, y=scrollY;
    checkReveals(vh);
    /* subtle hero parallax + fade as you leave */
    if(hero&&heroMedia&&!reduce()){
      const hp=clamp(y/hero.offsetHeight,0,1);
      heroMedia.style.transform=`scale(${1+hp*0.08}) translateY(${hp*40}px)`;
      const copy=$('.hero__inner'); if(copy) copy.style.opacity=String(clamp(1-hp*1.3,0,1));
    }
  }
  function req(){ if(!ticking){ ticking=true; requestAnimationFrame(frame); }}
  addEventListener('scroll',()=>{ onNav(); checkReveals(innerHeight); req(); },{passive:true});
  addEventListener('resize',()=>{ checkReveals(innerHeight); req(); },{passive:true});
  checkReveals(innerHeight); frame();
  const sweep=setInterval(()=>{ checkReveals(innerHeight); if(!reveals.length) clearInterval(sweep); },150);
  setTimeout(()=>{ reveals.forEach(el=>el.classList.add('in')); reveals=[]; clearInterval(sweep); },2800);

  /* full-bio modal */
  $$('.bio').forEach(modal=>{
    let lastFocus=null;
    const open=()=>{
      lastFocus=document.activeElement;
      modal.setAttribute('aria-hidden','false');
      document.body.classList.add('bio-open');
      const c=$('.bio__close',modal); if(c) c.focus();
    };
    const close=()=>{
      modal.setAttribute('aria-hidden','true');
      document.body.classList.remove('bio-open');
      if(lastFocus) lastFocus.focus();
    };
    $$('[data-bio-open="'+modal.id+'"]').forEach(t=>t.addEventListener('click',open));
    $$('[data-bio-close]',modal).forEach(b=>b.addEventListener('click',close));
    addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.getAttribute('aria-hidden')==='false') close(); });
  });

  /* tweaks hooks */
  window.__naviHooks={
    motion(on){ document.documentElement.toggleAttribute('data-still', !on); }
  };
})();
