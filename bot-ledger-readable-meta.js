(function(){
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='bot-ledger.html')return;
  if(document.getElementById('killian-readable-meta'))return;
  const s=document.createElement('style');
  s.id='killian-readable-meta';
  s.textContent=`
body.dollie-branded .badge,
body.dollie-branded .tag,
body.dollie-branded .linked-row .lbl,
body.dollie-branded .linked-row .lchip,
body.dollie-branded .bot-meta .badge,
body.dollie-branded .bot-meta .tag{
  font-family:'Outfit',system-ui,sans-serif!important;
  font-weight:500!important;
  font-style:normal!important;
  letter-spacing:.015em!important;
}
body.dollie-branded .badge,
body.dollie-branded .tag,
body.dollie-branded .linked-row .lchip{font-size:12px!important;line-height:1.2!important}
body.dollie-branded .linked-row .lbl{font-size:11px!important;line-height:1.2!important;text-transform:uppercase!important}
`;
  document.head.appendChild(s);
})();
