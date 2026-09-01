(function(){
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='bot-ledger.html')return;

  const DIRECT={
    'Alistair Fieter':'assets/portraits/alistair-fieter.webp?v=2',
    'Davian Astor':'assets/portraits/davian-astor.webp?v=2',
    'Dr. Kairos Adebisi':'assets/portraits/dr-kairos-adebisi.webp?v=2',
    'Elias Thorne':'assets/portraits/elias-thorne.webp?v=2',
    'Elirosa Bloom':'assets/portraits/elirosa-bloom.webp?v=2',
    'Rhydian Blackbriar':'assets/portraits/rhydian-blackbriar.webp?v=2',
    'Silas Viremont':'assets/portraits/silas-viremont.webp?v=2',
    'Zane Hollis':'assets/portraits/zane-hollis.webp?v=2'
  };

  function record(name){
    try{return Array.isArray(bots)?bots.find(b=>String(b.name||'').trim()===name):null}catch(e){return null}
  }
  function isUnreleased(name){
    const b=record(name);
    return !!b&&b.stage!=='Complete';
  }
  function srcFor(name){
    if(isUnreleased(name))return 'assets/unreleased-bot-placeholder.webp?v=2';
    return DIRECT[name]||null;
  }
  function replacePortrait(el,name){
    const src=srcFor(name);
    if(!src)return; // Keep existing art for characters without a supplied portrait.

    el.classList.remove('portrait-hidden');
    el.style.backgroundImage='none';
    el.style.backgroundPosition='center';
    el.style.backgroundSize='cover';

    let img=el.querySelector('.archive-direct-img');
    if(!img){
      img=document.createElement('img');
      img.className='archive-direct-img';
      img.loading='lazy';
      img.decoding='async';
      el.replaceChildren(img);
    }
    if(img.getAttribute('src')!==src)img.src=src;
    img.alt=isUnreleased(name)?name+' unreleased bot placeholder':name+' portrait';
    el.classList.toggle('unreleased',isUnreleased(name));
  }
  function fixCards(){
    document.querySelectorAll('.bot[id^="bot-"]').forEach(card=>{
      const name=card.querySelector('.bot-name')?.textContent?.trim();
      const portrait=card.querySelector('.archive-portrait');
      if(name&&portrait)replacePortrait(portrait,name);
    });
    document.querySelectorAll('.kcard').forEach(card=>{
      const name=card.querySelector('.kname')?.textContent?.trim();
      const portrait=card.querySelector('.kportrait');
      if(name&&portrait)replacePortrait(portrait,name);
    });
    document.querySelectorAll('#archiveList .arc').forEach(card=>{
      const name=card.querySelector('.arc-name')?.textContent?.trim();
      const portrait=card.querySelector('.archive-portrait');
      if(name&&portrait)replacePortrait(portrait,name);
    });
  }

  const style=document.createElement('style');
  style.id='direct-portrait-fix';
  style.textContent=`
.archive-portrait .archive-direct-img,.kportrait .archive-direct-img{
  width:100%;height:100%;display:block;object-fit:cover;object-position:center top;
  transition:filter .22s ease,transform .22s ease
}
.archive-portrait.unreleased .archive-direct-img,.kportrait.unreleased .archive-direct-img{
  filter:grayscale(1) saturate(0) contrast(.95) brightness(.82)
}
.bot:hover .archive-portrait.unreleased .archive-direct-img,
.arc:hover .archive-portrait.unreleased .archive-direct-img,
.kcard:hover .kportrait.unreleased .archive-direct-img,
.archive-portrait.unreleased:hover .archive-direct-img{filter:none}
.archive-portrait.unreleased:hover .archive-direct-img{transform:translateY(-1px)}
@media(max-width:700px){
  .bot-body.with-archive-portrait{display:block!important}
  .bot-body.with-archive-portrait>:not(.archive-portrait){grid-column:auto!important}
  .archive-portrait{
    float:none!important;width:min(150px,42vw)!important;height:auto!important;
    aspect-ratio:4/5!important;margin:0 0 14px 0!important
  }
  .archive-portrait .archive-direct-img{aspect-ratio:4/5}
}
`;
  document.head.appendChild(style);

  let queued=false;
  function run(){queued=false;fixCards()}
  function queue(){if(queued)return;queued=true;queueMicrotask(run)}
  new MutationObserver(queue).observe(document.documentElement,{childList:true,subtree:true});
  queue();
  setTimeout(run,200);
  setTimeout(run,900);
})();
