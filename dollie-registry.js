/* Dollie Registry — canonical IP identity layer © 2026 Dollie. */
(function(root){
  'use strict';

  const SPEC=Object.freeze({
    version:'1.0',
    format:'DOLLIE-TGUUNN-YYYY',
    type:Object.freeze({solo:'1',multi:'2',world:'3'}),
    gender:Object.freeze({na:'0',male:'1',female:'2',nonbinary:'3',mixed:'4'}),
    universe:Object.freeze({dreams:'01',hunt:'02',blood:'03'}),
    reservedUniverseRange:'04-99',
    sequenceRule:'Sequential within universe + record type. 00 is reserved for WORLD roots.',
    creationYearRule:'YYYY is the calendar year in which Dollie created the character, multi or world.',
    immutable:true,
    recycleIds:false
  });

  const owner=Object.freeze({
    creator:'Dollie',
    creatorProfiles:Object.freeze({
      tipsy:'https://tipsy.chat/profile/1777650556658005181'
    })
  });

  const records=[
    {ledgerId:'bot-my-captors',name:'My Captors',type:'multi',gender:'mixed',universe:'dreams',sequence:1,year:2026},
    {ledgerId:'bot-rhett-callow',name:'Rhett Callow',type:'solo',gender:'male',universe:'dreams',sequence:1,year:2026},
    {ledgerId:'bot-zane-hollis',name:'Zane Hollis',type:'solo',gender:'male',universe:'dreams',sequence:2,year:2026},
    {ledgerId:'bot-soren-pike',name:'Soren Pike',type:'solo',gender:'male',universe:'dreams',sequence:3,year:2026},
    {ledgerId:'bot-blaise-danner',name:'Blaise Danner',type:'solo',gender:'male',universe:'dreams',sequence:4,year:2026},
    {ledgerId:'bot-elirosa-bloom',name:'Elirosa Bloom',type:'solo',gender:'female',universe:'dreams',sequence:5,year:2026,note:'Belladonna House collab; universe remains The Dreams.'},
    {ledgerId:'bot-kyren-steinmetz',name:'Prince Kyren Steinmetz',type:'solo',gender:'male',universe:'dreams',sequence:6,year:2026},
    {ledgerId:'bot-elias-thorne',name:'Elias Thorne',type:'solo',gender:'male',universe:'hunt',sequence:1,year:2026},
    {ledgerId:'bot-silas-viremont',name:'Silas Viremont',type:'solo',gender:'male',universe:'hunt',sequence:2,year:2026},
    {ledgerId:'bot-rhydian-blackbriar',name:'Rhydian Blackbriar',type:'solo',gender:'male',universe:'hunt',sequence:3,year:2026},
    {ledgerId:'bot-kairos-adebisi',name:'Dr. Kairos Adebisi',type:'solo',gender:'male',universe:'hunt',sequence:4,year:2026}
  ];

  const roots=[
    {name:'The Dreams',type:'world',gender:'na',universe:'dreams',sequence:0,year:2026},
    {name:'The Hunt',type:'world',gender:'na',universe:'hunt',sequence:0,year:2026},
    {name:'The Blood',type:'world',gender:'na',universe:'blood',sequence:0,year:2026}
  ];

  function pad2(value){return String(value).padStart(2,'0')}
  function makeId(record){
    const t=SPEC.type[record.type],g=SPEC.gender[record.gender],u=SPEC.universe[record.universe];
    if(!t||!g||!u||!/^\d{4}$/.test(String(record.year)))return '';
    return `DOLLIE-${t}${g}${u}${pad2(record.sequence)}-${record.year}`;
  }
  [...roots,...records].forEach(record=>record.registryId=makeId(record));

  const byLedgerId=Object.fromEntries(records.map(record=>[record.ledgerId,record]));
  const byRegistryId=Object.fromEntries([...roots,...records].map(record=>[record.registryId,record]));

  root.DOLLIE_REGISTRY={SPEC,owner,records,roots,byLedgerId,byRegistryId,makeId};
})(window);