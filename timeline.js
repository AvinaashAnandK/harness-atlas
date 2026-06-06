/* ============================================================
   THE TIMELINE - renderer.
   Reads window.TIMELINE.events (timeline-data.js, from CoWork's
   consolidation) and resolves each event's capabilities against
   window.ATLAS (atlas-data.js) so each links to its deep dive and
   carries its fate. Filter by layer, type, harness; search; sort.
   Marker color = source type (non-fate palette). The fate dot on a
   capability chip is that capability's fate (the only fate use here).
   ============================================================ */
(function(){
  'use strict';
  var T = window.TIMELINE || {events:[]};
  var DATA = (T.events || []).slice();
  var A = window.ATLAS || {caps:[]};

  var capByName = {}; (A.caps||[]).forEach(function(c){ capByName[c.name] = c; });
  var capBySlug = {}; (A.caps||[]).forEach(function(c){ capBySlug[c.slug] = c; });
  // CoWork's L5 file-stem labels -> slugs
  var ALIAS = { 'Cant Do - Ceilings':'cant-do-ceilings', 'Wont Do - Commercial':'wont-do-commercial', 'Wont Do - Safety':'wont-do-safety', 'Wont Show - Opacity':'wont-show-opacity' };
  function resolveCap(name){ if(capByName[name]) return capByName[name]; if(ALIAS[name]&&capBySlug[ALIAS[name]]) return capBySlug[ALIAS[name]]; return null; }
  var DEEP_PAGE = '03 Capability Deep Dives.html';

  var FATE_TIPS = {
    compound:"Built against a silent failure, one nothing in the run announces. Caught and encoded, it keeps its value as models improve; this is the scaffolding that can become the moat.",
    fade:"Built against a loud failure, one the trace announces. Better models absorb these, so the scaffolding is temporary: a loan the next model repays.",
    protect:"A wall the builder raises for its own commercial or legal reasons, not to make the agent better. Anti-distillation and hidden codenames when the builder makes the model; PII and compliance walls when it rents one. It neither fades nor compounds; it lasts as long as the business reason does.",
    split:"This capability's halves age differently: part fades as models improve, part compounds. The page explains which is which."
  };
  var LAYERS = [{n:1,name:'Brain'},{n:2,name:'Hands'},{n:3,name:'Coherence'},{n:4,name:'Feedback'},{n:5,name:'Limitations'}];
  var TYPE_LABEL = {release:'release', research:'paper', blog:'eng blog', docs:'docs', news:'press', web:'web', code:'repo', talk:'talk', incident:'incident', leak:'leak'};
  var TYPE_CLASS = {release:'release', research:'research', blog:'research', docs:'neutral', news:'neutral', web:'neutral', code:'neutral', talk:'neutral', incident:'incident', leak:'incident'};
  var MON = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function fdot(c){ return '<span class="fdot '+esc(c)+'"></span>'; }
  function parse(d){ var a=(d||'').split('-'); return {y:+a[0]||0, m:+a[1]||1, day:+a[2]||1}; }
  function fmt(d,p){ var a=parse(d); if(p==='year') return ''+a.y; if(p==='month') return MON[a.m]+' '+a.y; return MON[a.m]+' '+a.day+', '+a.y; }
  function quarter(d){ var a=parse(d); return a.y+' · Q'+(Math.floor((a.m-1)/3)+1); }
  function sortKey(d){ var a=parse(d); return a.y*10000+a.m*100+a.day; }

  var state = { layers:new Set([1,2,3,4,5]), types:new Set(Object.keys(TYPE_LABEL)), harn:'all', q:'', newest:true };

  /* ---- build controls ---- */
  // harness select
  var hcount = {}; DATA.forEach(function(e){ (e.harness||[]).forEach(function(h){ hcount[h]=(hcount[h]||0)+1; }); });
  var hsel = document.getElementById('tlHarn');
  Object.keys(hcount).sort().forEach(function(h){ var o=document.createElement('option'); o.value=h; o.textContent=h+' ('+hcount[h]+')'; hsel.appendChild(o); });
  hsel.addEventListener('change', function(){ state.harn=hsel.value; render(); });

  // layer chips
  var lc = document.getElementById('tlLayerChips');
  LAYERS.forEach(function(L){
    var c=document.createElement('span'); c.className='tchip'; c.setAttribute('role','button'); c.tabIndex=0;
    c.innerHTML='<span class="ln">L'+L.n+'</span>'+esc(L.name);
    function toggle(){ if(state.layers.has(L.n)){ state.layers.delete(L.n); c.classList.add('off'); } else { state.layers.add(L.n); c.classList.remove('off'); } render(); }
    c.onclick=toggle; c.onkeydown=function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); } };
    lc.appendChild(c);
  });
  // type chips (only types present in data)
  var present = {}; DATA.forEach(function(e){ present[e.type]=1; });
  var tc = document.getElementById('tlTypeChips');
  Object.keys(TYPE_LABEL).forEach(function(k){
    if(!present[k]) return;
    var c=document.createElement('span'); c.className='tchip'; c.setAttribute('role','button'); c.tabIndex=0;
    c.innerHTML='<span class="km '+TYPE_CLASS[k]+'"></span>'+esc(TYPE_LABEL[k]);
    function toggle(){ if(state.types.has(k)){ state.types.delete(k); c.classList.add('off'); } else { state.types.add(k); c.classList.remove('off'); } render(); }
    c.onclick=toggle; c.onkeydown=function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); } };
    tc.appendChild(c);
  });
  // search
  var qIn = document.getElementById('tlSearch');
  qIn.addEventListener('input', function(){ state.q=qIn.value.toLowerCase(); render(); });
  // sort
  var sortBtn = document.getElementById('tlSort');
  sortBtn.onclick = function(){ state.newest=!state.newest; sortBtn.textContent = state.newest?'↓ Newest first':'↑ Oldest first'; render(); };

  // stat line
  var dates = DATA.map(function(e){return e.date;}).sort();
  var stat = document.getElementById('tlStat');
  if(stat) stat.innerHTML = '<span><b>'+DATA.length+'</b> dated sources</span>'
    + '<span>'+fmt(dates[0],'month')+' to '+fmt(dates[dates.length-1],'month')+'</span>'
    + '<span><b>5</b> layers · <b>24</b> capabilities</span>';

  function match(e){
    if(!(e.layers||[]).some(function(l){ return state.layers.has(l); })) return false;
    if(!state.types.has(e.type)) return false;
    if(state.harn!=='all' && (e.harness||[]).indexOf(state.harn)<0) return false;
    if(state.q){
      var blob=(e.title+' '+(e.established||'')+' '+(e.capabilities||[]).join(' ')+' '+(e.harness||[]).join(' ')).toLowerCase();
      if(blob.indexOf(state.q)<0) return false;
    }
    return true;
  }

  function capChips(names){
    return (names||[]).map(function(nm){
      var c = resolveCap(nm);
      if(!c) return '<span class="tl-cap" style="cursor:default">'+esc(nm)+'</span>';
      return '<a class="tl-cap" href="'+DEEP_PAGE+'#/cap/'+esc(c.slug)+'" tabindex="0" data-fate-tip="'+esc(FATE_TIPS[c.fate])+'">'+fdot(c.fate)+esc(c.name)+'</a>';
    }).join('');
  }

  function evHTML(e){
    var cls = TYPE_CLASS[e.type]||'neutral';
    var harnTags=(e.harness||[]).filter(function(h){ return h!=='research / general'; }).map(function(h){ return '<span class="tl-tag harn">'+esc(h)+'</span>'; }).join('');
    var lyrTags=(e.layers||[]).map(function(n){ var L=LAYERS[n-1]; return L?'<span class="tl-tag lyr">L'+n+' '+esc(L.name)+'</span>':''; }).join('');
    var dateHTML = fmt(e.date,e.precision) + (e.precision!=='day' ? '<br><span class="approx">~'+esc(e.precision)+'</span>' : '');
    return '<div class="ev '+cls+'">'
      + '<span class="node"></span>'
      + '<span class="date">'+dateHTML+'</span>'
      + '<div class="tl-card">'
        + '<p class="ttl"><a href="'+esc(e.url)+'" target="_blank" rel="noopener">'+esc(e.title)+'</a></p>'
        + (e.established?'<p class="est">'+esc(e.established)+'</p>':'')
        + '<div class="tl-meta"><span class="tl-tag type">'+esc(TYPE_LABEL[e.type]||e.type)+'</span>'+capChips(e.capabilities)+lyrTags+harnTags+'</div>'
      + '</div></div>';
  }

  function render(){
    var rows = DATA.filter(match);
    rows.sort(function(a,b){ var ka=sortKey(a.date), kb=sortKey(b.date); return state.newest ? kb-ka : ka-kb; });
    var cnt = document.getElementById('tlCount'); if(cnt) cnt.innerHTML='<b>'+rows.length+'</b> of '+DATA.length+' showing';
    var root = document.getElementById('tl');
    if(!rows.length){ root.innerHTML='<div class="tl-empty">No sources match these filters.</div>'; return; }
    var html='', curQ=null;
    rows.forEach(function(e){
      var q=quarter(e.date);
      if(q!==curQ){
        if(curQ!==null) html+='</div>';
        curQ=q;
        html+='<div class="qhead"><h2>'+esc(q)+'</h2></div><div class="events">';
      }
      html += evHTML(e);
    });
    if(curQ!==null) html+='</div>';
    root.innerHTML = html;
  }

  render();

  /* theme toggle - identical to other surfaces */
  (function(){
    var btn=document.getElementById('themeBtn'), root=document.documentElement;
    function set(t){ root.setAttribute('data-theme',t); if(btn) btn.textContent=t==='dark'?'◐ Light':'◑ Dark'; }
    try{ var s=localStorage.getItem('atlas-theme'); if(s) set(s); }catch(e){}
    if(btn) btn.addEventListener('click', function(){ var n=root.getAttribute('data-theme')==='dark'?'light':'dark'; set(n); try{ localStorage.setItem('atlas-theme',n); }catch(e){} });
  })();
})();
