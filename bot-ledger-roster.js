(function(){
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  const cfg=window.KILLIAN_BOT_ROSTER;
  if(page!=='bot-ledger.html'||!cfg||!Array.isArray(cfg.bots))return;

  const marker='dollie-bot-ledger-v1:'+cfg.migration;
  const steps=['concept locked','voice defined','greeting written','example dialogue','avatar done','prompt drafted','arc tested','memory check','tags + blurb','promo post'];
  const done={Concept:1,Visual:5,Prompt:6,Testing:7,Refinement:8,Promo:9,Complete:10};
  const seedChecks=stage=>steps.map((text,i)=>({id:'seed-'+stage.toLowerCase()+'-'+i,text,done:i<(done[stage]||0)}));
  const seedBot=(b,i)=>({created:1788192000000+i,updated:Date.now()+i,hold:false,archived:false,links:[],externalLinks:[],approvedFiles:[],notes:b.note?[{id:'note-'+b.id,ts:'01 Sep 2026',text:b.note}]:[],...b,checklist:seedChecks(b.stage)});
  const roster=cfg.bots.map(seedBot);

  function marked(){try{return localStorage.getItem(marker)==='1'}catch(e){return false}}
  function mark(){try{localStorage.setItem(marker,'1')}catch(e){}}
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);

  function mergeExternalLinks(current=[],seed=[]){
    const out=Array.isArray(current)?current.map(x=>({...x})):[];
    const keys=new Set(out.map(x=>String(x.url||'').trim().toLowerCase()).filter(Boolean));
    seed.forEach(link=>{const key=String(link.url||'').trim().toLowerCase();if(key&&!keys.has(key)){out.push({...link});keys.add(key)}});
    return out;
  }

  function migrate(){
    if(marked())return {added:0,changed:false};
    let list;
    try{list=bots}catch(e){return null}
    if(!Array.isArray(list))return null;
    let added=0,changed=false;
    const byName=new Map(list.map(b=>[String(b.name||'').trim().toLowerCase(),b]));
    roster.forEach(seed=>{
      const existing=byName.get(seed.name.toLowerCase());
      if(existing){
        if(!Array.isArray(existing.externalLinks))existing.externalLinks=[];
        if(!Array.isArray(existing.approvedFiles))existing.approvedFiles=[];
        if(!Array.isArray(existing.links))existing.links=[];
        if(!existing.externalLinks.length&&seed.externalLinks.length){existing.externalLinks=seed.externalLinks.map(x=>({...x}));changed=true}
        if(!existing.approvedFiles.length&&seed.approvedFiles.length){existing.approvedFiles=seed.approvedFiles.map(x=>({...x}));changed=true}
        if(!existing.links.length&&seed.links.length){existing.links=[...seed.links];changed=true}
        if(seed.force){
          if(Object.prototype.hasOwnProperty.call(seed.force,'collab')&&existing.collab!==seed.force.collab){existing.collab=seed.force.collab;changed=true}
          if(Object.prototype.hasOwnProperty.call(seed.force,'stage')&&existing.stage!==seed.force.stage){existing.stage=seed.force.stage;changed=true}
          if(Object.prototype.hasOwnProperty.call(seed.force,'platform')&&existing.platform!==seed.force.platform){existing.platform=seed.force.platform;changed=true}
          if(seed.force.externalLinks){const merged=mergeExternalLinks(existing.externalLinks,seed.externalLinks);if(!same(existing.externalLinks,merged)){existing.externalLinks=merged;changed=true}}
          if(seed.force.approvedFiles&&!same(existing.approvedFiles,seed.approvedFiles)){existing.approvedFiles=seed.approvedFiles.map(x=>({...x}));changed=true}
          if(seed.force.desc&&existing.desc!==seed.desc){existing.desc=seed.desc;changed=true}
          if(seed.force.note&&seed.note){
            if(!Array.isArray(existing.notes))existing.notes=[];
            if(!existing.notes.some(n=>String(n.text||'')===seed.note)){existing.notes.unshift({id:'release-'+seed.id,ts:'01 Sep 2026',text:seed.note});changed=true}
          }
          if(seed.force.complete){
            if(!Array.isArray(existing.checklist)||!existing.checklist.length){existing.checklist=seedChecks('Complete');changed=true}
            else if(existing.checklist.some(c=>!c.done)){existing.checklist.forEach(c=>c.done=true);changed=true}
          }
        }
        existing.updated=Date.now();
        return;
      }
      list.push(JSON.parse(JSON.stringify(seed)));added++;changed=true;
    });
    const idForName=new Map(list.map(b=>[String(b.name||'').trim().toLowerCase(),b.id]));
    const seededNameById=new Map(roster.map(b=>[b.id,b.name.toLowerCase()]));
    list.forEach(b=>{
      if(!Array.isArray(b.externalLinks))b.externalLinks=[];
      if(!Array.isArray(b.approvedFiles))b.approvedFiles=[];
      const before=JSON.stringify(b.links||[]);
      b.links=(b.links||[]).map(id=>seededNameById.has(id)?(idForName.get(seededNameById.get(id))||id):id).filter(id=>list.some(x=>x.id===id));
      if(JSON.stringify(b.links)!==before)changed=true;
    });
    try{normaliseBots()}catch(e){}
    mark();
    return {added,changed};
  }

  function styles(){
    if(document.getElementById('killian-roster-links'))return;
    const s=document.createElement('style');
    s.id='killian-roster-links';
    s.textContent=`
.ext-row,.file-row{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px;align-items:center}
.ext-row .lbl,.file-row .lbl{font-family:var(--font);font-size:11px;color:var(--dim);letter-spacing:.04em}
.ext-link,.file-link{font-family:var(--font);font-size:11.5px;padding:4px 10px;border-radius:99px;text-decoration:none;transition:all .15s}
.ext-link{border:1px solid rgba(179,22,37,.45);background:rgba(179,22,37,.08);color:var(--cream)}
.file-link{border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.035);color:var(--mute)}
.ext-link:hover{border-color:var(--alarm);background:rgba(179,22,37,.16);color:#fff}
.file-link:hover{border-color:rgba(198,48,56,.5);color:var(--cream);background:rgba(129,16,24,.12)}
.manual-links-editor{margin-top:2px}
.manual-links-list{display:grid;gap:8px}
.manual-link-row{display:grid;grid-template-columns:minmax(120px,180px) minmax(260px,1fr) auto;gap:8px;align-items:center}
.manual-link-row .manual-link-remove{width:42px;height:42px;border:1px solid rgba(184,40,49,.35);border-radius:10px;color:var(--alarm);font-size:18px;line-height:1;background:rgba(129,16,24,.08)}
.manual-link-row .manual-link-remove:hover{border-color:var(--alarm);background:rgba(129,16,24,.17);color:#fff}
.manual-links-empty{padding:10px 12px;border:1px dashed var(--line2);border-radius:10px;color:var(--dim);font-size:12px}
@media(max-width:760px){.manual-link-row{grid-template-columns:1fr auto}.manual-link-row .manual-link-label{grid-column:1/-1}.manual-link-row .manual-link-url{grid-column:1}.manual-link-row .manual-link-remove{grid-column:2}}
`;
    document.head.appendChild(s);
  }

  function decorate(){
    styles();
    let list;
    try{list=bots}catch(e){return}
    list.forEach(b=>{
      const card=document.getElementById('bot-'+b.id);
      if(!card)return;
      const body=card.querySelector('.bot-body');if(!body)return;
      card.querySelectorAll('.ext-row[data-killian-roster="1"],.file-row[data-killian-files="1"]').forEach(row=>row.remove());
      const anchor=body.querySelector('.mini-checks,.linked-row,.notes');
      if(Array.isArray(b.externalLinks)&&b.externalLinks.length){
        const row=document.createElement('div');row.className='ext-row';row.dataset.killianRoster='1';
        const label=document.createElement('span');label.className='lbl';label.textContent='platforms';row.appendChild(label);
        b.externalLinks.forEach(l=>{if(!l?.url)return;const a=document.createElement('a');a.className='ext-link';a.href=l.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=(l.label||'Link')+' ↗';row.appendChild(a)});
        if(anchor)anchor.before(row);else body.appendChild(row);
      }
      if(Array.isArray(b.approvedFiles)&&b.approvedFiles.length){
        const row=document.createElement('div');row.className='file-row';row.dataset.killianFiles='1';
        const label=document.createElement('span');label.className='lbl';label.textContent='approved files';row.appendChild(label);
        b.approvedFiles.forEach(f=>{const a=document.createElement('a');a.className='file-link';a.href=f.path;a.target='_blank';a.rel='noopener';a.textContent=f.label+' ↗';row.appendChild(a)});
        if(anchor)anchor.before(row);else body.appendChild(row);
      }
    });
  }

  const htmlEscape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let draftExternalLinks=[];

  function ensureLinkEditor(){
    if(document.getElementById('externalLinksEditor'))return;
    const linkRow=document.getElementById('linkRow');
    const linkedSection=linkRow?.closest('.fgrid.full');
    if(!linkedSection)return;
    const section=document.createElement('div');
    section.className='fgrid full manual-links-editor';section.id='externalLinksEditor';
    section.innerHTML=`<div><div class="flabel"><span>manual links</span><button type="button" class="btn-q" id="addExternalLink" style="padding:3px 9px;font-size:9.5px">+ add link</button></div><div class="manual-links-list" id="externalLinksRows"></div></div>`;
    linkedSection.after(section);
    document.getElementById('addExternalLink').addEventListener('click',()=>{draftExternalLinks.push({label:'',url:''});renderLinkEditor()});
    document.getElementById('externalLinksRows').addEventListener('input',event=>{
      const row=event.target.closest('.manual-link-row');if(!row)return;
      const i=Number(row.dataset.index);if(!draftExternalLinks[i])return;
      if(event.target.classList.contains('manual-link-label'))draftExternalLinks[i].label=event.target.value;
      if(event.target.classList.contains('manual-link-url'))draftExternalLinks[i].url=event.target.value;
    });
    document.getElementById('externalLinksRows').addEventListener('click',event=>{
      const button=event.target.closest('.manual-link-remove');if(!button)return;
      draftExternalLinks.splice(Number(button.closest('.manual-link-row').dataset.index),1);renderLinkEditor();
    });
  }

  function renderLinkEditor(){
    ensureLinkEditor();
    const host=document.getElementById('externalLinksRows');if(!host)return;
    if(!draftExternalLinks.length){host.innerHTML='<div class="manual-links-empty">No manual links yet. Add Tipsy, CrushOn, CraveU, a collab page or any other URL.</div>';return}
    host.innerHTML=draftExternalLinks.map((link,i)=>`<div class="manual-link-row" data-index="${i}"><input class="finput manual-link-label" maxlength="40" placeholder="label — e.g. Tipsy" value="${htmlEscape(link.label||'')}"><input class="finput manual-link-url" type="url" placeholder="https://…" value="${htmlEscape(link.url||'')}"><button type="button" class="manual-link-remove" title="Remove link" aria-label="Remove link">×</button></div>`).join('');
  }

  function loadLinkEditor(){
    ensureLinkEditor();
    let record=null;
    try{record=editingId?bots.find(b=>b.id===editingId):null}catch(e){}
    draftExternalLinks=Array.isArray(record?.externalLinks)?record.externalLinks.map(x=>({label:x.label||'',url:x.url||''})):[];
    renderLinkEditor();
  }

  function collectDraftLinks(){
    return draftExternalLinks.map(link=>({label:String(link.label||'').trim(),url:String(link.url||'').trim()})).filter(link=>link.url).map(link=>({label:link.label||'Link',url:link.url}));
  }

  function bindLinkEditor(){
    ensureLinkEditor();
    document.addEventListener('click',event=>{
      if(event.target.closest('[data-a="edit"],#addBtn,[data-a="add"]'))setTimeout(loadLinkEditor,0);
    });
    const saveButton=document.getElementById('saveBtn');
    if(saveButton&&!saveButton.dataset.externalLinksBound){
      saveButton.dataset.externalLinksBound='1';
      saveButton.addEventListener('click',()=>{
        const links=collectDraftLinks();
        let currentId=null,beforeCount=0,name='';
        try{currentId=editingId;beforeCount=bots.length;name=document.getElementById('fName')?.value.trim()||''}catch(e){}
        if(currentId){
          const record=bots.find(b=>b.id===currentId);if(record)record.externalLinks=links;
          return;
        }
        if(!name)return;
        setTimeout(()=>{
          try{
            if(bots.length<=beforeCount)return;
            const created=[...bots].filter(b=>b.name===name).sort((a,b)=>(b.created||0)-(a.created||0))[0];
            if(!created)return;
            created.externalLinks=links;created.updated=Date.now();
            if(typeof save==='function')save();if(typeof render==='function')render();
          }catch(e){}
        },0);
      },true);
    }
  }

  let migrated=false,editorBound=false;
  function ready(){
    const board=document.getElementById('board');
    if(!board||!board.innerHTML.trim())return false;
    try{return Array.isArray(bots)&&typeof render==='function'&&typeof save==='function'}catch(e){return false}
  }
  function run(){
    if(!ready())return;
    if(!migrated){
      migrated=true;
      const result=migrate();
      if(result&&result.changed){try{save();render();if(result.added&&typeof toast==='function')toast(result.added+' records transferred into Killian\'s archives')}catch(e){}}
    }
    if(!editorBound){editorBound=true;bindLinkEditor()}
    decorate();
  }

  const board=document.getElementById('board');
  if(board)new MutationObserver(()=>queueMicrotask(run)).observe(board,{childList:true,subtree:true});
  run();setTimeout(run,0);setTimeout(run,500);setTimeout(run,1500);
})();