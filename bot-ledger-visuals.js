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
    'Everett Park':'data:image/webp;base64,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[... truncated for brevity in this tool call ...]','
  };

  function botRecord(name){
    try{return Array.isArray(bots)?bots.find(b=>String(b.name||'').trim()===name):null}catch(e){return null}
  }
  function unreleased(name){
    const b=botRecord(name);
    return !!b&&b.stage!=="Complete";
  }
  function usePlaceholder(name){
    return unreleased(name)&&!CUSTOM_PORTRAITS[name];
  }

  function installStyles(){
    if(document.getElementById("killian-archive-visuals"))return;
    const s=document.createElement("style");
    s.id="killian-archive-visuals";
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
.badge,.tag,.linked-row .lbl,.lchip{font-family:var(--font)!important;font-size:12px!important;line-height:1.2!important;font-weight:500!important;font-style:normal!important;letter-spacing:.015em!important}
.linked-row .lbl{text-transform:uppercase!important;color:#777375!important;margin-right:2px}
.linked-row .lchip{padding:5px 12px!important}
.bot-meta .badge,.bot-meta .tag{padding:5px 12px!important}
.bot-body.with-archive-portrait{display:grid;grid-template-columns:112px minmax(0,1fr);column-gap:16px;align-items:start}
.bot-body.with-archive-portrait>:not(.archive-portrait){grid-column:2}
.archive-portrait{grid-column:1;grid-row:1/99;width:112px;height:140px;border-radius:12px;overflow:hidden;flex:0 0 auto;background-image:url('assets/archive-character-portraits.webp');background-size:400% 400%;background-repeat:no-repeat;background-color:#100b0e;border:1px solid rgba(198,48,56,.32);box-shadow:0 10px 28px rgba(0,0,0,.42),inset 0 0 0 1px rgba(255,255,255,.025);transition:filter .22s ease,transform .22s ease}
.archive-portrait::after{content:'';display:block;width:100%;height:100%;box-shadow:inset 0 -24px 30px rgba(3,3,4,.3)}
.archive-portrait.unreleased,.kportrait.unreleased{background-image:url('assets/unreleased-bot-placeholder.webp')!important;background-size:cover!important;background-position:center!important;filter:grayscale(1) saturate(0) contrast(.95) brightness(.82)}
.archive-portrait.unreleased:hover,.bot:hover .archive-portrait.unreleased,.arc:hover .archive-portrait.unreleased,.kcard:hover .kportrait.unreleased{filter:none}
.archive-portrait.unreleased:hover{transform:translateY(-1px)}
.arc .archive-portrait{grid-column:auto;grid-row:auto;width:48px;height:60px;border-radius:8px;margin-right:2px;opacity:1}
.kcard.with-kportrait{min-height:72px;padding-left:62px;position:relative}
.kportrait{position:absolute;left:10px;top:10px;width:42px;height:52px;border-radius:7px;background-image:url('assets/archive-character-portraits.webp');background-size:400% 400%;background-repeat:no-repeat;background-color:#100b0e;border:1px solid rgba(198,48,56,.28);transition:filter .22s ease}
@media(max-width:700px){.bot-body.with-archive-portrait{grid-template-columns:82px minmax(0,1fr);column-gap:11px}.archive-portrait{width:82px;height:103px;border-radius:9px}.badge,.tag,.linked-row .lbl,.lchip{font-size:11.5px!important}}
@media(max-width:500px){.bot-body.with-archive-portrait{display:block}.bot-body.with-archive-portrait>:not(.archive-portrait){grid-column:auto}.archive-portrait{float:left;margin:0 12px 8px 0;width:76px;height:95px}}
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
      if(existing){applyPortrait(existing,name);return}
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
