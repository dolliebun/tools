(function(){
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='bot-ledger.html')return;

  const DIRECT={
    'Alistair Fieter':'assets/portraits/alistair-fieter.webp',
    'Davian Astor':'assets/portraits/davian-astor.webp',
    'Dr. Kairos Adebisi':'assets/portraits/dr-kairos-adebisi.webp',
    'Elias Thorne':'assets/portraits/elias-thorne.webp',
    'Elirosa Bloom':'assets/portraits/elirosa-bloom.webp',
    'Rhydian Blackbriar':'assets/portraits/rhydian-blackbriar.webp',
    'Silas Viremont':'assets/portraits/silas-viremont.webp',
    'Zane Hollis':'assets/portraits/zane-hollis.webp'
  };
  const KEEP_EXISTING=new Set(['Everett Park']);

  function record(name){
    try{return Array.isArray(bots)?bots.find(b=>String(b.name||'').trim()===name):null}catch(e){return null}
  }
  function isUnreleased(name){const b=record(name);return !!b&&b.stage!=='Complete'}
  function srcFor(name){
    if(isUnreleased(name))return 'assets/unreleased-bot-placeholder.webp';
    return DIRECT[name]||null;
  }
  function makeImg(name){
    const src=srcFor(name);if(!src)return null;
    const img=document.createElement('img');
    img.className='archive-direct-img';
    img.src=src;img.loading='lazy';img.decoding='async';
    img.alt=isUnreleased(name)?name+' unreleased bot placeholder':name+' portrait';
    return img;
  }
  function replacePortrait(el,name){
    const src=srcFor(name);
    if(!src){
      if(KEEP_EXISTING.has(name))return;
      el.classList.add('portrait-hidden');
      return;
    }
    el.classList.remove('portrait-hidden');
    el.style.backgroundImage='none';el.style.backgroundPosition='center';el.style.backgroundSize='cover';
    let img=el.querySelector('.archive-direct-img');
    if(!img){img=makeImg(name);el.replaceChildren(img)}
    else if(img.getAttribute('src')!==src){img.src=src;img.alt=isUnreleased(name)?name+' unreleased bot placeholder':name+' portrait'}
    el.classList.toggle('unreleased',isUnreleased(name));
  }
  function fixCards(){
    document.querySelectorAll('.bot[id^="bot-"]').forEach(card=>{
      const name=card.querySelector('.bot-name')?.textContent?.trim();if(!name)return;
      const p=card.querySelector('.archive-portrait');if(p)replacePortrait(p,name);
      card.querySelector('.bot-body')?.classList.toggle('portraitless',!srcFor(name)&&!KEEP_EXISTING.has(name));
    });
    document.querySelectorAll('.kcard').forEach(card=>{
      const name=card.querySelector('.kname')?.textContent?.trim();if(!name)return;
      const p=card.querySelector('.kportrait');if(p)replacePortrait(p,name);
      card.classList.toggle('portraitless',!srcFor(name)&&!KEEP_EXISTING.has(name));
    });
    document.querySelectorAll('#archiveList .arc').forEach(card=>{
      const name=card.querySelector('.arc-name')?.textContent?.trim();if(!name)return;
      const p=card.querySelector('.archive-portrait');if(p)replacePortrait(p,name);
    });
  }
  const style=document.createElement('style');
  style.id='direct-portrait-fix';
  style.textContent=`
.archive-portrait .archive-direct-img,.kportrait .archive-direct-img{width:100%;height:100%;display:block;object-fit:cover;object-position:center;transition:filter .22s ease,transform .22s ease}
.archive-portrait.unreleased .archive-direct-img,.kportrait.unreleased .archive-direct-img{filter:grayscale(1) saturate(0) contrast(.95) brightness(.82)}
.bot:hover .archive-portrait.unreleased .archive-direct-img,.arc:hover .archive-portrait.unreleased .archive-direct-img,.kcard:hover .kportrait.unreleased .archive-direct-img,.archive-portrait.unreleased:hover .archive-direct-img{filter:none}
.archive-portrait.unreleased:hover .archive-direct-img{transform:translateY(-1px)}
.archive-portrait.portrait-hidden,.kportrait.portrait-hidden{display:none!important}
.bot-body.with-archive-portrait.portraitless{display:block!important}
.kcard.with-kportrait.portraitless{padding-left:12px!important}
@media(max-width:700px){
  .bot-body.with-archive-portrait{display:block!important}
  .archive-portrait{float:none!important;width:min(150px,42vw)!important;height:auto!important;aspect-ratio:4/5;margin:0 0 14px 0!important}
  .archive-portrait .archive-direct-img{aspect-ratio:4/5}
  .bot-body.with-archive-portrait>:not(.archive-portrait){grid-column:auto!important}
}
`;
  document.head.appendChild(style);
  let queued=false;
  function run(){queued=false;fixCards()}
  function queue(){if(queued)return;queued=true;queueMicrotask(run)}
  new MutationObserver(queue).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  queue();setTimeout(run,200);setTimeout(run,900);
})();
