(function(){
  if(!document.body){document.addEventListener('DOMContentLoaded',arguments.callee,{once:true});return}
  if(document.querySelector('.dollie-brandbar'))return;
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const section=path==='index.html'?'tools':path==='library.html'?'library':path==='bot-ledger.html'?'ledger':'tools';
  document.body.classList.add('dollie-branded');
  document.querySelectorAll('.site-header:not(.ledger-header)').forEach(existing=>existing.classList.add('dollie-old-main-nav'));
  const bar=document.createElement('header');
  bar.className='dollie-brandbar';
  bar.innerHTML=`<a class="dollie-brand-home" href="index.html"><img class="dollie-brand-avatar" src="assets/dollie-avatar.gif" alt="Dollie"><span class="dollie-brand-name"><strong>Dollie Tools</strong><small>softness, with teeth</small></span></a><span class="dollie-brand-scene" aria-hidden="true"></span><nav class="dollie-brand-nav" aria-label="Dollie Tools"><a class="${section==='tools'?'active':''}" href="index.html">Tools</a><a class="${section==='library'?'active':''}" href="library.html">Library</a><a class="${section==='ledger'?'active':''}" href="bot-ledger.html">Archives</a></nav>`;
  document.body.prepend(bar);

  if(section==='ledger'&&!document.querySelector('script[data-killian-roster-loader]')){
    const data=document.createElement('script');
    data.src='bot-ledger-roster-data.js';data.async=false;data.dataset.killianRosterLoader='data';
    data.onload=()=>{
      const helper=document.createElement('script');
      helper.src='bot-ledger-roster.js';helper.async=false;helper.dataset.killianRosterLoader='helper';
      document.body.appendChild(helper);
    };
    document.body.appendChild(data);
  }
})();
