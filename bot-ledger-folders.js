(function(){
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='bot-ledger.html')return;

  const FOLDERS={
    'My Captors':'my-captors',
    'Rhett Callow':'rhett-callow',
    'Zane Hollis':'zane-hollis',
    'Soren Pike':'soren-pike',
    'Blaise Danner':'blaise-danner',
    'Alistair Fieter':'alistair-fieter',
    'Davian Astor':'davian-astor',
    'Elirosa Bloom':'elirosa-bloom',
    'Everett Park':'everett-park',
    'Rhydian Blackbriar':'rhydian-blackbriar',
    'Elias Thorne':'elias-thorne',
    'Silas Viremont':'silas-viremont',
    'Dr. Kairos Adebisi':'dr-kairos-adebisi',
    'Prince Kyren Steinmetz':'prince-kyren-steinmetz',
    'Kol Frost':'kol-frost',
    'Julian “Noctis” Cross':'julian-cross',
    'Adam Vance':'adam-vance'
  };
  const BASE='https://github.com/dolliebun/tools/tree/main/bot-files/';

  function hrefFor(name){const slug=FOLDERS[name];return slug?BASE+slug:null}
  function link(name,compact=false){
    const href=hrefFor(name);if(!href)return null;
    const a=document.createElement('a');
    a.className='bot-folder-link'+(compact?' compact':'');
    a.href=href;a.target='_blank';a.rel='noopener noreferrer';
    a.title='Open '+name+' file folder';
    a.setAttribute('aria-label','Open '+name+' file folder');
    a.innerHTML=compact?'📁':'<span class="folder-icon">📁</span><span>files</span>';
    return a;
  }

  function decorateList(){
    document.querySelectorAll('.bot[id^="bot-"]').forEach(card=>{
      const name=card.querySelector('.bot-name')?.textContent?.trim();
      if(!name||!hrefFor(name))return;
      const meta=card.querySelector('.bot-meta');
      if(meta&&!meta.querySelector('.bot-folder-link'))meta.appendChild(link(name));
      const portrait=card.querySelector('.archive-portrait');
      if(portrait&&!portrait.dataset.folderBound){
        portrait.dataset.folderBound='1';portrait.classList.add('folder-portrait');portrait.title='Open '+name+' files';
        portrait.setAttribute('role','link');portrait.setAttribute('tabindex','0');
        const open=()=>window.open(hrefFor(name),'_blank','noopener,noreferrer');
        portrait.addEventListener('click',e=>{e.stopPropagation();open()});
        portrait.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();open()}});
      }
    });
  }

  function decorateBoard(){
    document.querySelectorAll('.kcard').forEach(card=>{
      const name=card.querySelector('.kname')?.textContent?.trim();
      if(!name||!hrefFor(name)||card.querySelector('.bot-folder-link'))return;
      card.appendChild(link(name,true));
    });
  }

  function decorateArchive(){
    document.querySelectorAll('#archiveList .arc').forEach(card=>{
      const name=card.querySelector('.arc-name')?.textContent?.trim();
      if(!name||!hrefFor(name)||card.querySelector('.bot-folder-link'))return;
      const firstAction=card.querySelector('button');
      const a=link(name);
      if(firstAction)card.insertBefore(a,firstAction);else card.appendChild(a);
    });
  }

  const style=document.createElement('style');
  style.id='bot-folder-styles';
  style.textContent=`
.bot-folder-link{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:999px;border:1px solid rgba(255,45,120,.32);background:rgba(255,45,120,.07);color:var(--hot2);text-decoration:none;font-family:var(--font)!important;font-size:12px!important;font-weight:500!important;line-height:1.2!important;letter-spacing:.01em!important;transition:background .15s,border-color .15s,color .15s,transform .15s}
.bot-folder-link:hover{background:var(--hot-dim);border-color:var(--hot);color:var(--cream);transform:translateY(-1px)}
.bot-folder-link.compact{position:absolute;right:9px;top:9px;width:28px;height:28px;padding:0;justify-content:center;border-radius:8px;z-index:3;font-size:14px!important;background:rgba(11,5,9,.78);backdrop-filter:blur(5px)}
.kcard{position:relative}
.folder-portrait{cursor:pointer}
.folder-portrait:hover{outline:1px solid rgba(255,107,163,.7);outline-offset:2px}
.arc .bot-folder-link{margin-left:auto}
@media(max-width:700px){.bot-folder-link{font-size:11.5px!important}.bot-folder-link.compact{font-size:13px!important}}
`;
  document.head.appendChild(style);

  document.addEventListener('click',e=>{
    if(e.target.closest('.bot-folder-link'))e.stopPropagation();
  },true);

  let queued=false;
  function run(){queued=false;decorateList();decorateBoard();decorateArchive()}
  function queue(){if(queued)return;queued=true;queueMicrotask(run)}
  new MutationObserver(queue).observe(document.documentElement,{childList:true,subtree:true});
  queue();setTimeout(run,250);setTimeout(run,900);
})();
