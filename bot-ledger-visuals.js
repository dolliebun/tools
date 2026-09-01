(function(){
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='bot-ledger.html')return;

  const PORTRAITS={
    'Kol Frost':0,
    'My Captors':1,
    'Rhett Callow':2,
    'Zane Hollis':3,
    'Soren Pike':4,
    'Blaise Danner':5,
    'Alistair Fieter':6,
    'Davian Astor':7,
    'Elirosa Bloom':8,
    'Everett Park':9,
    'Elias Thorne':10,
    'Silas Viremont':11,
    'Rhydian Blackbriar':12,
    'Dr. Kairos Adebisi':13,
    'Prince Kyren Steinmetz':14
  };

  const CUSTOM_PORTRAITS={
    'Everett Park':'data:image/webp;base64,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'
  };

  function botRecord(name){
    try{return Array.isArray(bots)?bots.find(b=>String(b.name||'').trim()===name):null}catch(e){return null}
  }
  function unreleased(name){
    const b=botRecord(name);
    return !!b&&b.stage!=='Complete';
  }
  function usePlaceholder(name){
    return unreleased(name)&&!CUSTOM_PORTRAITS[name];
  }

  function installStyles(){
    if(document.getElementById('killian-archive-visuals'))return;
    const s=document.createElement('style');
    s.id='killian-archive-visuals';
    s.textContent=`
@font-face{font-family:'OldLondon';src:url('https://raw.githubusercontent.com/PGCRT/CRT-Nodes/main/Fonts/OldLondon.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
:root{--disp:'OldLondon','Times New Roman',serif;--mono:'OldLondon','Times New Roman',serif}
.logo-text,.content-title,.bot-name,.kname,.arc-name,.empty h2,
.sb-title,.stat-lbl,.flabel,.nav-item,.collab-item,.grp-head,.solo-item,.nav-count,.cbar-lbl,.bump,.mc,.notes-toggle,.note-ts,.col-name,.col-count,.col-empty,.btn-q,.view-tab,.hero-toggle,
.btn-add,.btn-save,.btn-primary,.btn-cancel,.btn-note,.dollie-credit,
body.dollie-branded .dollie-brand-name strong,body.dollie-branded .dollie-brand-name small,body.dollie-branded .dollie-brand-nav a{
  font-family:'OldLondon','Times New Roman',serif!important;
  font-weight:400!important;
}
/* Small metadata must stay readable. */
.badge,.tag,.linked-row .lbl,.lchip{
  font-family:var(--font)!important;
  font-size:12px!important;
  line-height:1.2!important;
  font-weight:500!important;
  font-style:normal!important;
  letter-spacing:.015em!important;
}
.linked-row .lbl{text-transform:uppercase!important;color:#777375!important;margin-right:2px}
.linked-row .lchip{padding:5px 12px!important}
.bot-meta .badge,.bot-meta .tag{padding:5px 12px!important}

.bot-body.with-archive-portrait{display:grid;grid-template-columns:112px minmax(0,1fr);column-gap:16px;align-items:start}
.bot-body.with-archive-portrait>:not(.archive-portrait){grid-column:2}
.archive-portrait{grid-column:1;grid-row:1/99;width:112px;height:140px;border-radius:12px;overflow:hidden;flex:0 0 auto;
  background-image:url('assets/archive-character-portraits.webp');background-size:400% 400%;background-repeat:no-repeat;background-color:#100b0e;
  border:1px solid rgba(198,48,56,.32);box-shadow:0 10px 28px rgba(0,0,0,.42),inset 0 0 0 1px rgba(255,255,255,.025);transition:filter .22s ease,transform .22s ease}
.archive-portrait::after{content:'';display:block;width:100%;height:100%;box-shadow:inset 0 -24px 30px rgba(3,3,4,.3)}
.archive-portrait.unreleased,.kportrait.unreleased{background-image:url('assets/unreleased-bot-placeholder.webp')!important;background-size:cover!important;background-position:center!important;filter:grayscale(1) saturate(0) contrast(.95) brightness(.82)}
.archive-portrait.unreleased:hover,.bot:hover .archive-portrait.unreleased,.arc:hover .archive-portrait.unreleased,.kcard:hover .kportrait.unreleased{filter:none}
.archive-portrait.unreleased:hover{transform:translateY(-1px)}
.arc .archive-portrait{grid-column:auto;grid-row:auto;width:48px;height:60px;border-radius:8px;margin-right:2px;opacity:1}
.kcard.with-kportrait{min-height:72px;padding-left:62px;position:relative}
.kportrait{position:absolute;left:10px;top:10px;width:42px;height:52px;border-radius:7px;background-image:url('assets/archive-character-portraits.webp');background-size:400% 400%;background-repeat:no-repeat;background-color:#100b0e;border:1px solid rgba(198,48,56,.28);transition:filter .22s ease}
@media(max-width:700px){
  .bot-body.with-archive-portrait{grid-template-columns:82px minmax(0,1fr);column-gap:11px}
  .archive-portrait{width:82px;height:103px;border-radius:9px}
  .badge,.tag,.linked-row .lbl,.lchip{font-size:11.5px!important}
}
@media(max-width:500px){
  .bot-body.with-archive-portrait{display:block}
  .bot-body.with-archive-portrait>:not(.archive-portrait){grid-column:auto}
  .archive-portrait{float:left;margin:0 12px 8px 0;width:76px;height:95px}
}
`;
    document.head.appendChild(s);
  }

  function spritePosition(index){
    const col=index%4,row=Math.floor(index/4);
    return `${(col/3)*100}% ${(row/3)*100}%`;
  }

  function applyPortrait(p,name){
    const custom=CUSTOM_PORTRAITS[name];
    const placeholder=usePlaceholder(name);
    p.classList.toggle('unreleased',placeholder);
    if(placeholder){
      p.style.backgroundImage='';
      p.style.backgroundSize='';
      p.style.backgroundPosition='';
      p.setAttribute('aria-label',name+' unreleased bot placeholder');
      return;
    }
    if(custom){
      p.style.backgroundImage=`url("${custom}")`;
      p.style.backgroundSize='cover';
      p.style.backgroundPosition='center top';
    }else{
      p.style.backgroundImage='';
      p.style.backgroundSize='400% 400%';
      p.style.backgroundPosition=spritePosition(PORTRAITS[name]);
    }
    p.setAttribute('aria-label',name+' portrait');
  }

  function portrait(name,cls){
    const index=PORTRAITS[name];
    if(index===undefined)return null;
    const p=document.createElement('div');
    p.className=cls;
    applyPortrait(p,name);
    p.setAttribute('role','img');
    return p;
  }

  function decorateList(){
    document.querySelectorAll('.bot[id^="bot-"]').forEach(card=>{
      const name=card.querySelector('.bot-name')?.textContent?.trim();
      if(!name||PORTRAITS[name]===undefined)return;
      const body=card.querySelector('.bot-body');
      if(!body)return;
      const existing=body.querySelector('.archive-portrait');
      if(existing){
        applyPortrait(existing,name);
        return;
      }
      const p=portrait(name,'archive-portrait');
      if(!p)return;
      body.classList.add('with-archive-portrait');
      body.prepend(p);
    });
  }

  function decorateBoard(){
    document.querySelectorAll('.kcard').forEach(card=>{
      const name=card.querySelector('.kname')?.textContent?.trim();
      if(!name||PORTRAITS[name]===undefined)return;
      const existing=card.querySelector('.kportrait');
      if(existing){applyPortrait(existing,name);return}
      const p=portrait(name,'kportrait');
      if(!p)return;
      card.classList.add('with-kportrait');
      card.prepend(p);
    });
  }

  function decorateArchive(){
    document.querySelectorAll('#archiveList .arc').forEach(card=>{
      const name=card.querySelector('.arc-name')?.textContent?.trim();
      if(!name||PORTRAITS[name]===undefined)return;
      const existing=card.querySelector('.archive-portrait');
      if(existing){applyPortrait(existing,name);return}
      const p=portrait(name,'archive-portrait');
      if(p)card.prepend(p);
    });
  }

  let scheduled=false;
  function decorate(){scheduled=false;installStyles();decorateList();decorateBoard();decorateArchive()}
  function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(decorate)}

  installStyles();
  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  schedule();setTimeout(decorate,250);setTimeout(decorate,1000);
})();
