const Y=0.406982421875;
const pages={
  home:{box:[450,309+Y,1920,1080],label:'首页'},about:{box:[2554,309+Y,1920,1080],label:'关于我'},
  portfolio:{box:[2554,1543+Y,1920,1080],label:'作品集'},project:{box:[4728,1548+Y,1920,1080],label:'自由维度灯项目'},
  hero:{box:[4728,2782+Y,1920,1080],label:'产品实拍图'},heroHover:{box:[6761,2782+Y,1920,1080],label:'产品实拍图交互状态'},
  bench:{box:[4728,4026+Y,1920,1080],label:'设计目标与工作台'},sketches:{box:[4728,5391+Y,1920,1080],label:'设计草图'},
  dimensions:{box:[4728,6756+Y,1920,1080],label:'尺寸与转动轴分布'},cad:{box:[2486,4040+Y,1920,2202],label:'CAD 建模'},
  renders:{box:[450,3530+Y,1920,1080],label:'多形态渲染图'},clear:{box:[317,4964+Y,1920,2174],label:'内部结构渲染'},
  exploded:{box:[2486,6565+Y,1920,2202],label:'产品渲染爆炸图'},ui:{box:[2486,9076+Y,1920,1080],label:'蓝牙软件端 UI 界面'},
  circuit:{box:[4728,8031+Y,1920,1080],label:'电路设计与搭建'},code:{box:[4728,9348+Y,1920,1080],label:'程序开发'},
  assembly:{box:[4728,10708+Y,1920,1080],label:'制作与组装过程'},video:{box:[2465,10708+Y,1920,1080],label:'产品展示视频'},
  photosA:{box:[0,10168+Y,1920,1080],label:'实物照片一'},photosB:{box:[0,11471+Y,1920,1080],label:'实物照片二'},
  closeup:{box:[2234,12136+Y,1920,1080],label:'灯具特写'},finalVideo:{box:[4406,12153+Y,1920,1080],label:'组装视频'}
};
const story=['hero','bench','sketches','dimensions','cad','renders','clear','exploded','ui','circuit','code','assembly','video','photosA','photosB','closeup','finalVideo'];
const videoSources={video:'assets/videos/showcase.mp4',finalVideo:'assets/videos/assembly.mp4'};
const hotspotMap={
  home:[{rect:[.20,.82,.26,.12],to:'about',label:'关于我'},{rect:[.47,.82,.24,.12],to:'portfolio',label:'作品集'}],
  about:[{rect:[.46,.82,.25,.12],to:'portfolio',label:'作品集'},{rect:[.20,.82,.25,.12],to:'home',label:'返回首页'}],
  portfolio:[{rect:[256/1920,84/1080,478.333/1920,765/1080],to:'hero',label:'查看自由维度灯项目',hover:true},{rect:[.20,.82,.24,.12],to:'about',label:'关于我'}],
  project:[{rect:[.12,.08,.40,.74],to:'hero',label:'查看自由维度灯'},{rect:[.20,.82,.24,.12],to:'about',label:'关于我'},{rect:[.48,.82,.24,.12],to:'portfolio',label:'作品集'}]
};
const ns='http://www.w3.org/2000/svg';
const app=document.querySelector('#app'), artboard=document.querySelector('#artboard'), hotspots=document.querySelector('#hotspots');
const source=artboard.querySelector('svg'), defs=source.querySelector('defs');
const master=document.createElementNS(ns,'g'); master.id='shared-design-artwork'; master.setAttribute('fill',source.getAttribute('fill')||'none');
for(const child of [...source.children]) if(child!==defs) master.append(child);
defs.append(master); source.classList.add('design-source'); source.removeAttribute('role'); source.setAttribute('aria-hidden','true');
app.insertBefore(source,artboard);
// The original open guide path must be stroked only; filling it closes it into a black wedge.
const guide=[...master.querySelectorAll('path')].find(p=>p.getAttribute('d')==='M3110 1221.41L3110 1203.41L3420.23 1203.41L3539 1203.41L3539 1167.41');
if(guide)guide.setAttribute('fill','none');

// Adds a hand-drawn reveal mask to the original outlined greeting.
// The mask coordinates trace the existing artwork, not a substitute font.
function setupGreetingHandwriting(svg) {
  const ns = 'http://www.w3.org/2000/svg';
  const greeting = svg.querySelector('#greeting');
  if (!greeting) return () => {};
  const defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(ns, 'defs'), svg.firstChild);
  let mask = svg.querySelector('#greeting-writing-mask');
  if (mask) mask.remove();
  mask = document.createElementNS(ns, 'mask');
  mask.id = 'greeting-writing-mask';
  mask.setAttribute('maskUnits', 'userSpaceOnUse');
  mask.setAttribute('x', '1280'); mask.setAttribute('y', '725');
  mask.setAttribute('width', '260'); mask.setAttribute('height', '130');
  const strokes = [
    // 你
    'M172 103 Q151 139 128 171','M158 137 L164 220','M201 119 L184 155',
    'M201 130 Q226 129 247 135 L230 159','M211 134 L210 213 Q209 226 197 222',
    'M194 166 L181 206','M226 166 L240 204',
    // 好
    'M333 99 L303 187 L350 219','M293 145 L357 143 Q350 194 321 220',
    'M367 115 L415 112 L391 142 L391 212 Q389 224 375 222','M361 171 L426 170',
    'M462 181 Q461 216 454 226',
    // 设
    'M563 110 L579 117','M546 145 L577 145 L576 198 L596 183',
    'M598 139 L604 116 Q607 110 619 112 L622 136 Q625 143 644 141',
    'M601 159 L654 159 Q645 190 606 217','M607 167 Q632 217 670 226',
    // 计
    'M735 110 L749 119','M718 146 L745 145 L746 209 L766 190',
    'M757 155 L830 151','M786 106 L802 235',
    // 师
    'M891 116 L900 190','M919 108 Q918 182 906 225','M939 107 L980 106',
    'M933 140 L938 220','M936 144 Q969 135 986 145 Q1000 158 984 184','M959 135 L959 220',
    // Hi, Designer
    'M140 344 L139 429','M140 387 L202 386','M204 344 L201 430',
    'M249 344 L249 349','M249 373 L249 431','M300 428 Q301 441 293 451',
    'M382 345 L382 431','M383 345 Q453 342 455 386 Q454 426 383 431',
    'M482 401 Q505 401 535 389 Q532 365 509 367 Q481 368 480 395 Q479 423 508 430 Q529 432 545 420',
    'M631 372 Q613 362 594 370 Q575 380 589 391 Q598 396 618 400 Q643 411 625 425 Q605 435 579 424',
    'M657 344 L657 349','M657 373 L657 430',
    'M752 378 Q730 356 708 375 Q689 393 706 414 Q725 429 752 410 L751 429 Q745 456 714 449',
    'M778 375 L778 430','M779 390 Q795 362 817 370 Q832 373 832 395 L832 430',
    'M872 400 Q894 399 918 389 Q915 365 894 367 Q870 369 868 395 Q866 423 893 430 Q910 432 924 421',
    'M955 375 L955 430','M956 390 Q974 362 995 370'
  ];
  const paths = strokes.map(d => {
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', d); p.setAttribute('transform', 'translate(1270 719.406982421875) scale(.25)');
    p.setAttribute('fill','none'); p.setAttribute('stroke','white'); p.setAttribute('stroke-width','34');
    p.setAttribute('stroke-linecap','round'); p.setAttribute('stroke-linejoin','round'); p.setAttribute('pathLength','1');
    p.style.strokeDasharray='1 1'; p.style.strokeDashoffset='1'; mask.append(p); return p;
  });
  defs.append(mask);
  let running = [];
  return function playGreetingHandwriting() {
    running.forEach(a => a.cancel()); running = [];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { greeting.removeAttribute('mask'); return; }
    greeting.setAttribute('mask', 'url(#greeting-writing-mask)');
    const duration = 170, overlap = 80;
    paths.forEach((path, index) => {
      path.style.strokeDashoffset='1';
      running.push(path.animate([{strokeDashoffset:1},{strokeDashoffset:0}], {
        duration, delay:index*overlap, easing:'linear', fill:'forwards'
      }));
    });
    Promise.all(running.map(a => a.finished.catch(() => {}))).then(() => {
      if (running.every(a => a.playState === 'finished')) greeting.removeAttribute('mask');
    });
  };
}

const playGreeting = setupGreetingHandwriting(source);
let current='home';
function createPanel(id){
  const page=pages[id], section=document.createElement('section');section.className='case-panel';section.dataset.panel=id;section.setAttribute('aria-label',page.label);
  if(videoSources[id]){
    section.classList.add('video-panel');
    const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='metadata';video.src=videoSources[id];
    video.setAttribute('aria-label',id==='video'?'产品展示视频':'产品组装视频');
    video.addEventListener('play',()=>document.querySelectorAll('.video-panel video').forEach(other=>{if(other!==video)other.pause()}));
    section.append(video);return section;
  }
  const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',page.box.join(' '));svg.setAttribute('width',page.box[2]);svg.setAttribute('height',page.box[3]);svg.setAttribute('role','img');svg.setAttribute('aria-label',page.label);
  const use=document.createElementNS(ns,'use');use.setAttribute('href','#shared-design-artwork');svg.append(use);section.append(svg);
  if(id==='portfolio'){
    const layer=document.createElement('div');layer.className='portfolio-preview';layer.setAttribute('aria-hidden','true');
    const preview=document.createElementNS(ns,'svg');const box=pages.project.box;
    preview.setAttribute('viewBox',`${box[0]+256} ${box[1]+84} 478.333 765`);
    const image=document.createElementNS(ns,'use');image.setAttribute('href','#shared-design-artwork');preview.append(image);layer.append(preview);section.append(layer);
  }
  if(id==='hero'){
    const trigger=document.createElement('button');trigger.type='button';trigger.className='hotspot hero-trigger';trigger.setAttribute('aria-label','查看项目导航');
    Object.assign(trigger.style,{left:'65%',top:'0',width:'35%',height:'72%'});
    const show=()=>{svg.setAttribute('viewBox',pages.heroHover.box.join(' '));section.classList.add('show-nav')};
    trigger.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')show()});trigger.addEventListener('click',show);section.append(trigger);
    for(const [label,target,left,width] of [['返回首页','home',0,22],['返回作品集','portfolio',75,25]]){
      const button=document.createElement('button');button.type='button';button.className='hotspot hero-nav';button.setAttribute('aria-label',label);Object.assign(button.style,{left:`${left}%`,top:'0',width:`${width}%`,height:'14%'});button.addEventListener('click',()=>go(target));section.append(button);
    }
    section.addEventListener('pointerleave',()=>{svg.setAttribute('viewBox',page.box.join(' '));section.classList.remove('show-nav')});
  }
  return section;
}
function addHotspots(id){
  hotspots.replaceChildren();
  for(const item of hotspotMap[id]||[]){
    const button=document.createElement('button');button.className='hotspot';button.type='button';button.setAttribute('aria-label',item.label);
    const [x,y,w,h]=item.rect;Object.assign(button.style,{left:`${x*100}%`,top:`${y*100}%`,width:`${w*100}%`,height:`${h*100}%`});
    button.addEventListener('click',()=>go(item.to));
    if(item.hover){
      const panel=artboard.querySelector('[data-panel="portfolio"]');
      button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')panel?.classList.add('is-preview')});
      button.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')panel?.classList.remove('is-preview')});
      button.addEventListener('focus',()=>{if(button.matches(':focus-visible'))panel?.classList.add('is-preview')});
      button.addEventListener('blur',()=>panel?.classList.remove('is-preview'));
    }
    hotspots.append(button);
  }
}
function go(id,{history=true,reset=true}={}){
  if(!pages[id]) id='home';
  if(id==='project') id='portfolio';
  const previousWasStory=artboard.classList.contains('continuous');
  const previousScrollY=window.scrollY;
  const isStory=story.includes(id)||id==='heroHover';current=id;app.dataset.page=isStory?'story':id;
  artboard.replaceChildren();hotspots.hidden=isStory;
  if(isStory){artboard.classList.add('continuous');story.forEach(item=>artboard.append(createPanel(item)))}
  else {artboard.classList.remove('continuous');artboard.append(createPanel(id));addHotspots(id)}
  if(reset&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const panel=artboard.firstElementChild;
    panel?.animate([{opacity:.82},{opacity:1}],{duration:280,easing:'cubic-bezier(.2,.8,.2,1)'});
  }
  if(id==='home') playGreeting();
  document.title=`${pages[id].label} · 万浩为设计作品集`;
  if(history&&location.hash!==`#${id}`)window.history.pushState(null,'',`#${id}`);
  if(reset){
    if(isStory&&id!=='hero'&&id!=='heroHover'){requestAnimationFrame(()=>document.querySelector(`[data-panel="${id}"]`)?.scrollIntoView())}
    else {window.scrollTo({top:!isStory&&!previousWasStory?previousScrollY:0,behavior:'instant'})}
  }
}
function movePanel(direction){
  if(!artboard.classList.contains('continuous')){go(direction>0?(current==='about'?'portfolio':current==='portfolio'?'project':'hero'):'home');return}
  const sections=[...artboard.querySelectorAll('.case-panel')];const marker=scrollY+innerHeight*.3;
  let index=sections.findLastIndex(el=>el.offsetTop<=marker);index=Math.max(0,Math.min(sections.length-1,index+direction));
  sections[index].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}
document.addEventListener('click',e=>{const target=e.target.closest('[data-go],[data-action]');if(!target)return;if(target.dataset.go)go(target.dataset.go);else movePanel(target.dataset.action==='next'?1:-1)});
document.addEventListener('keydown',e=>{if(e.key==='Home'&&!e.target.matches('input,textarea')){e.preventDefault();go('home')}else if(e.key==='ArrowRight'){e.preventDefault();movePanel(1)}else if(e.key==='ArrowLeft'){e.preventDefault();movePanel(-1)}});
window.addEventListener('popstate',()=>go(decodeURIComponent(location.hash.slice(1))||'home',{history:false}));
go(decodeURIComponent(location.hash.slice(1))||'home',{history:false});
