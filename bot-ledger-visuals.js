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

  function installStyles(){
    if(document.getElementById('killian-archive-visuals'))return;
    const s=document.createElement('style');
    s.id='killian-archive-visuals';
    s.textContent=`
@font-face{font-family:'OldLondon';src:url('https://raw.githubusercontent.com/PGCRT/CRT-Nodes/main/Fonts/OldLondon.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
:root{--disp:'OldLondon','Times New Roman',serif;--mono:'OldLondon','Times New Roman',serif}
.logo-text,.content-title,.bot-name,.kname,.arc-name,.empty h2,
.sb-title,.stat-lbl,.flabel,.nav-item,.collab-item,.grp-head,.solo-item,.nav-count,.cbar-lbl,.bump,.badge,.tag,.mc,.linked-row .lbl,.lchip,.notes-toggle,.note-ts,.col-name,.col-count,.col-empty,.btn-q,.view-tab,.hero-toggle,
.btn-add,.btn-save,.btn-primary,.btn-cancel,.btn-note,.dollie-credit,
body.dollie-branded .dollie-brand-name strong,body.dollie-branded .dollie-brand-name small,body.dollie-branded .dollie-brand-nav a{
  font-family:'OldLondon','Times New Roman',serif!important;
  font-weight:400!important;
}
.badge,.tag,.linked-row .lbl,.lchip{
  font-family:'OldLondon','Times New Roman',serif!important;
  font-size:14px!important;
  line-height:1.05!important;
  font-weight:400!important;
  letter-spacing:.018em!important;
}
.linked-row .lbl{text-transform:none!important;color:#777375!important;margin-right:2px}
.linked-row .lchip{padding:5px 12px!important}
.bot-meta .badge,.bot-meta .tag{padding:5px 12px!important}

.bot-body.with-archive-portrait{display:grid;grid-template-columns:112px minmax(0,1fr);column-gap:16px;align-items:start}
.bot-body.with-archive-portrait>:not(.archive-portrait){grid-column:2}
.archive-portrait{grid-column:1;grid-row:1/99;width:112px;height:140px;border-radius:12px;overflow:hidden;flex:0 0 auto;
  background-image:url('assets/archive-character-portraits.webp');background-size:400% 400%;background-repeat:no-repeat;background-color:#100b0e;
  border:1px solid rgba(198,48,56,.32);box-shadow:0 10px 28px rgba(0,0,0,.42),inset 0 0 0 1px rgba(255,255,255,.025)}
.archive-portrait::after{content:'';display:block;width:100%;height:100%;box-shadow:inset 0 -24px 30px rgba(3,3,4,.3)}
.arc .archive-portrait{grid-column:auto;grid-row:auto;width:48px;height:60px;border-radius:8px;margin-right:2px;opacity:1}
.kcard.with-kportrait{min-height:72px;padding-left:62px;position:relative}
.kportrait{position:absolute;left:10px;top:10px;width:42px;height:52px;border-radius:7px;background-image:url('assets/archive-character-portraits.webp');background-size:400% 400%;background-repeat:no-repeat;background-color:#100b0e;border:1px solid rgba(198,48,56,.28)}
@media(max-width:700px){
  .bot-body.with-archive-portrait{grid-template-columns:82px minmax(0,1fr);column-gap:11px}
  .archive-portrait{width:82px;height:103px;border-radius:9px}
  .badge,.tag,.linked-row .lbl,.lchip{font-size:13px!important}
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

  function portrait(name,cls){
    const index=PORTRAITS[name];
    if(index===undefined)return null;
    const p=document.createElement('div');
    p.className=cls;
    p.style.backgroundPosition=spritePosition(index);
    p.setAttribute('role','img');
    p.setAttribute('aria-label',name+' portrait');
    return p;
  }

  function decorateList(){
    document.querySelectorAll('.bot[id^="bot-"]').forEach(card=>{
      const name=card.querySelector('.bot-name')?.textContent?.trim();
      if(!name||PORTRAITS[name]===undefined)return;
      const body=card.querySelector('.bot-body');
      if(!body||body.querySelector('.archive-portrait'))return;
      const p=portrait(name,'archive-portrait');
      if(!p)return;
      body.classList.add('with-archive-portrait');
      body.prepend(p);
    });
  }

  function decorateBoard(){
    document.querySelectorAll('.kcard').forEach(card=>{
      if(card.querySelector('.kportrait'))return;
      const name=card.querySelector('.kname')?.textContent?.trim();
      if(!name||PORTRAITS[name]===undefined)return;
      const p=portrait(name,'kportrait');
      if(!p)return;
      card.classList.add('with-kportrait');
      card.prepend(p);
    });
  }

  function decorateArchive(){
    document.querySelectorAll('#archiveList .arc').forEach(card=>{
      if(card.querySelector('.archive-portrait'))return;
      const name=card.querySelector('.arc-name')?.textContent?.trim();
      if(!name||PORTRAITS[name]===undefined)return;
      const p=portrait(name,'archive-portrait');
      if(p)card.prepend(p);
    });
  }

  let scheduled=false;
  function decorate(){
    scheduled=false;
    installStyles();
    decorateList();
    decorateBoard();
    decorateArchive();
  }
  function schedule(){
    if(scheduled)return;
    scheduled=true;
    queueMicrotask(decorate);
  }

  installStyles();
  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  schedule();setTimeout(decorate,250);setTimeout(decorate,1000);
})();
