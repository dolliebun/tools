(function(){
  if(!document.body){document.addEventListener('DOMContentLoaded',arguments.callee,{once:true});return}
  if(document.querySelector('.dollie-brandbar'))return;
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const section=path==='index.html'?'tools':path==='library.html'?'library':path==='bot-ledger.html'?'ledger':'tools';
  document.body.classList.add('dollie-branded');
  document.querySelectorAll('.site-header:not(.ledger-header)').forEach(existing=>existing.classList.add('dollie-old-main-nav'));
  const bar=document.createElement('header');bar.className='dollie-brandbar';bar.innerHTML=`<a class="dollie-brand-home" href="index.html"><img class="dollie-brand-avatar" src="assets/dollie-avatar.gif" alt="Dollie"><span class="dollie-brand-name"><strong>Dollie Tools</strong><small>softness, with teeth</small></span></a><span class="dollie-brand-scene" aria-hidden="true"></span><nav class="dollie-brand-nav" aria-label="Dollie Tools"><a class="${section==='tools'?'active':''}" href="index.html">Tools</a><a class="${section==='library'?'active':''}" href="library.html">Library</a><a class="${section==='ledger'?'active':''}" href="bot-ledger.html">Archives</a></nav>`;document.body.prepend(bar);

  if(path==='copyright-evidence-builder.html'){
    const applyCreatorDefaults=()=>{
      const profile=document.getElementById('creatorProfileUrl');
      const platform=(document.getElementById('originalPlatform')?.value||'').toLowerCase();
      const originalUrl=(document.getElementById('originalUrl')?.value||'').toLowerCase();
      const isTipsy=platform.includes('tipsy')||originalUrl.includes('tipsy.chat');
      if(profile&&isTipsy&&!profile.value.trim())profile.value=window.DOLLIE_REGISTRY?.owner?.creatorProfiles?.tipsy||'';
    };
    const startDefaults=()=>{
      applyCreatorDefaults();
      document.addEventListener('input',e=>{if(e.target?.id==='originalPlatform'||e.target?.id==='originalUrl')applyCreatorDefaults()});
      document.addEventListener('change',e=>{if(e.target?.id==='linkedBotId'||e.target?.id==='originalPlatform')setTimeout(applyCreatorDefaults,0)});
      document.addEventListener('click',e=>{if(e.target?.closest?.('#useLinkedBot'))setTimeout(applyCreatorDefaults,0)});
      setTimeout(applyCreatorDefaults,250);setTimeout(applyCreatorDefaults,900);
    };
    if(window.DOLLIE_REGISTRY)startDefaults();else{
      const registry=document.createElement('script');registry.src='dollie-registry.js?v=2';registry.onload=startDefaults;registry.onerror=startDefaults;document.head.appendChild(registry);
    }
  }

  if(section==='ledger'&&!document.querySelector('script[data-killian-roster-loader]')){
    const data=document.createElement('script');data.src='bot-ledger-roster-data.js?v=5';data.async=false;data.dataset.killianRosterLoader='data';data.onload=()=>{const helper=document.createElement('script');helper.src='bot-ledger-roster.js?v=6';helper.async=false;helper.dataset.killianRosterLoader='helper';helper.onload=()=>{const visuals=document.createElement('script');visuals.src='bot-ledger-visuals.js?v=4';visuals.async=false;visuals.dataset.killianRosterLoader='visuals';visuals.onload=()=>{const portraits=document.createElement('script');portraits.src='bot-ledger-direct-portraits.js?v=3';portraits.async=false;portraits.dataset.killianRosterLoader='portraits';portraits.onload=()=>{const folders=document.createElement('script');folders.src='bot-ledger-folders.js?v=5';folders.async=false;folders.dataset.killianRosterLoader='folders';folders.onload=()=>{const meta=document.createElement('script');meta.src='bot-ledger-readable-meta.js?v=3';meta.async=false;meta.dataset.killianRosterLoader='meta';document.body.appendChild(meta)};document.body.appendChild(folders)};document.body.appendChild(portraits)};document.body.appendChild(visuals)};document.body.appendChild(helper)};document.body.appendChild(data)
  }
})();