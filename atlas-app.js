/* ============================================================
   THE ATLAS — app: surface-aware hash router + renderers.
   - atlas (02):   approaches-forward accordion (question -> approaches),
                   full width, no rail. Filters; harness highlights nodes.
   - deepdives (03): lean index + full dossiers + the fate map. Has rail.
   - matter (04):  the quadrant closer. Has rail.
   ============================================================ */
(function(){
  'use strict';
  var A = window.ATLAS, caps = A.caps, layers = A.layers;
  var rail = document.getElementById('rail'), main = document.getElementById('main');
  var bySlug = {}; caps.forEach(function(c){ bySlug[c.slug] = c; });
  var byName = {}; caps.forEach(function(c){ byName[c.name] = c; });
  var hkey = {}; A.harnesses.forEach(function(h){ hkey[h.key] = h.name; });

  var SURFACE = (document.body && document.body.getAttribute('data-surface')) || 'atlas';
  var ATLAS_PAGE  = '02 The Atlas.html';
  var DEEP_PAGE   = '03 Capability Deep Dives.html';
  var MATTER_PAGE = '04 What Should Matter to You.html';
  function capHref(slug){ return SURFACE==='deepdives' ? ('#/cap/'+slug) : (DEEP_PAGE+'#/cap/'+slug); }

  var CAP_ICONS = {
    'identity-and-context':'compass','tool-discovery':'wrench','orchestration-routing':'git-fork',
    'planning':'list-checks','reasoning-effort-allocation':'gauge','permission-and-irreversibility':'hand',
    'execution-security':'shield','isolation':'box','input-and-output-gating':'filter',
    'tool-dispatch-and-retry':'refresh-cw','context-curation':'inbox','compression-for-coherence':'minimize-2',
    'state-persistence-and-ownership':'database','offline-consolidation':'moon','cross-agent-coherence':'link',
    'implicit-signals':'activity','explicit-signals':'thumbs-up','runtime-evaluation':'scan-eye',
    'observability-and-offline-evaluation':'line-chart','compounding-fixes':'trending-up','wont-do-safety':'ban',
    'wont-do-commercial':'circle-dollar-sign','cant-do-ceilings':'arrow-up-to-line','wont-show-opacity':'eye-off'
  };
  var FATE_TIPS = {
    compound:"Built against a silent failure, one nothing in the run announces. Caught and encoded, it keeps its value as models improve; this is the scaffolding that can become the moat.",
    fade:"Built against a loud failure, one the trace announces. Better models absorb these, so the scaffolding is temporary: a loan the next model repays.",
    protect:"A wall the builder raises for its own commercial or legal reasons, not to make the agent better. Anti-distillation and hidden codenames when the builder makes the model; PII and compliance walls when it rents one. It neither fades nor compounds; it lasts as long as the business reason does.",
    split:"This capability's halves age differently: part fades as models improve, part compounds. The page explains which is which."
  };
  var FATE_PLAIN = {compound:'Compounds', fade:'Fades', protect:'Protects the builder', split:'Split'};

  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function icon(name){ return '<i data-lucide="'+name+'"></i>'; }
  function lucide(){ if(window.lucide && window.lucide.createIcons){ try{ window.lucide.createIcons(); }catch(e){} } }
  function fdot(c, edge){ return '<span class="fdot '+c+(edge?' edge':'')+'"></span>'; }
  function tip(c){ return ' data-fate-tip="'+esc(FATE_TIPS[c])+'" tabindex="0"'; }

  var FILT = { layers:{}, fates:{}, harness:null };
  /* analytics (GoatCounter, cookieless) — count.js auto-counts the page load;
     this fires a clean virtual pageview for in-page deep-dive navigation. */
  var routedOnce = false;
  function gcount(path, title){ if(window.goatcounter && window.goatcounter.count){ try{ window.goatcounter.count({path:path, title:title||path, event:false}); }catch(e){} } }

  /* ============================================================ RAIL (deepdives + matter only) */
  var RR = [17,26,34,41,47];
  function renderRail(activeSlug){
    if(!rail) return;
    var isMap = location.hash.indexOf('map')>=0;
    var html = '<div class="rail-lab">The map</div>';
    html += '<div class="rail-shells" id="railShells"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"></svg><div class="rail-core">model<br>core</div></div>';
    html += '<div class="rail-legend">'
      + '<span class="rl">'+fdot('compound')+'compounds</span>'
      + '<span class="rl">'+fdot('fade')+'fades</span>'
      + '<span class="rl">'+fdot('protect')+'protects builder</span>'
      + '<span class="rl">'+fdot('split')+'split</span></div>';
    html += '<div class="rail-mobile-grid" id="railGrid"></div>';
    html += '<div class="rail-nav">'
      + '<a href="'+ATLAS_PAGE+'">'+icon('layout-grid')+'The Atlas</a>'
      + '<a href="'+DEEP_PAGE+'" class="'+(SURFACE==='deepdives' && !isMap ? 'cur':'')+'">'+icon('book-open')+'Deep dives</a>'
      + '<a href="'+(SURFACE==='deepdives'?'#/map':DEEP_PAGE+'#/map')+'" class="'+(SURFACE==='deepdives' && isMap ? 'cur':'')+'">'+icon('table-2')+'The fate map</a>'
      + '<a href="'+MATTER_PAGE+'" class="'+(SURFACE==='matter' ? 'cur':'')+'">'+icon('crosshair')+'What should matter</a>'
      + '</div>';
    rail.innerHTML = html;
    var wrap = document.getElementById('railShells'), svg = wrap.querySelector('svg'), ns='http://www.w3.org/2000/svg';
    RR.forEach(function(rad,li){ var c=document.createElementNS(ns,'circle'); c.setAttribute('cx',50);c.setAttribute('cy',50);c.setAttribute('r',rad); if(li===4)c.setAttribute('class','wall'); svg.appendChild(c); });
    layers.forEach(function(L){
      var lc = caps.filter(function(c){ return c.layerNum===L.num; });
      var rad = RR[L.num-1], n = lc.length;
      lc.forEach(function(c, i){
        var ang = (-60 + i*(360/n))*Math.PI/180;
        var x = 50+rad*Math.cos(ang), y = 50+rad*Math.sin(ang);
        var d = document.createElement('div');
        d.className = 'rnode '+c.fate+(c.edge?' edge':'')+(c.slug===activeSlug?' cur':'');
        d.style.left = x+'%'; d.style.top = y+'%';
        d.setAttribute('data-name', c.name);
        d.onclick = function(){ location.href = capHref(c.slug); };
        wrap.appendChild(d);
      });
    });
    var grid = document.getElementById('railGrid');
    layers.forEach(function(L){
      var col = document.createElement('div');
      var lc = caps.filter(function(c){ return c.layerNum===L.num; });
      col.innerHTML = '<div style="font-family:var(--mono);font-weight:700;font-size:8.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);margin-bottom:7px">'+esc(L.name)+'</div>'
        + lc.map(function(c){ return '<div style="display:flex;gap:6px;align-items:flex-start;margin-bottom:7px;cursor:pointer;font-size:.7rem;line-height:1.2;color:var(--ink-2)" onclick="location.href=\''+capHref(c.slug)+'\'">'+fdot(c.fate,c.edge)+'<span>'+esc(c.name)+'</span></div>'; }).join('');
      grid.appendChild(col);
    });
    lucide();
  }

  /* ============================================================ FATES ACCORDION (reused) */
  function fatesAccordion(){
    return '<details class="fates-acc">'
      + '<summary>'+fdot('compound')+fdot('fade')+fdot('protect')+'<span>How to read the colors</span></summary>'
      + '<div class="fates-callout" style="margin:10px 0 0">'
      + '<p style="margin:0 0 4px">Most capabilities here are scaffolding built to catch a failure, and that scaffolding ages in one of two ways.</p>'
      + '<div class="legend-row">'+fdot('compound')+'<div><b style="color:var(--fate-compound)">Teal, Compounds:</b> the failure it catches is silent, so the catch gets encoded into the harness and keeps its value as models improve.</div></div>'
      + '<div class="legend-row">'+fdot('fade')+'<div><b style="color:var(--fate-fade)">Warm gray, Fades:</b> the failure is loud, and the next model absorbs it, so the scaffolding comes off.</div></div>'
      + '<div class="legend-row">'+fdot('protect')+'<div><b style="color:var(--fate-protect)">Amber, Protects the builder:</b> it does not make the agent better at all; the builder raises it for its own commercial or legal reasons, so it neither fades nor compounds, it just persists.</div></div>'
      + '<div class="lk">The Tour teaches all three with real incidents in about seven minutes. <a href="01 The Tour.html">Take the tour -&gt;</a></div>'
      + '</div></details>';
  }

  /* ============================================================ APPROACH LANES (shared) */
  function harnessChips(arr){ return (arr||[]).map(function(k){ return '<span class="hchip" data-h="'+k+'">'+esc(hkey[k]||k)+'</span>'; }).join(''); }

  function laneHTML(fam){
    var nodes = fam.nodes.map(function(nd, i){
      var arrow = '';
      if(i>0){ arrow = /^builds|builds on/i.test(nd.rel||'') ? '<div class="lane-arrow">→</div>' : '<div class="lane-arrow" style="color:var(--line-2)">·</div>'; }
      var usedStr = (nd.usedBy||[]).join(' ');
      var used = nd.usedBy && nd.usedBy.length ? '<div class="ln-used">'+harnessChips(nd.usedBy)+'</div>' : '';
      var node = '<div class="lnode" tabindex="0" data-used="'+esc(usedStr)+'">'
        + '<div class="ln-name">'+esc(nd.name)+'</div>'
        + '<div class="ln-desc">'+esc(nd.desc)+'</div>'
        + (nd.rel?'<span class="ln-rel">'+esc(nd.rel)+'</span>':'')
        + used
        + '<div class="ln-panel"><span class="lp-lab">Used by</span>'+(nd.usedBy&&nd.usedBy.length?harnessChips(nd.usedBy):'<span class="ln-desc">no tracked harness yet</span>')+(nd.rel?'<div style="margin-top:8px"><span class="lp-lab">Relationship</span>'+esc(nd.rel)+'</div>':'')+'</div>'
        + '</div>';
      return arrow + node;
    }).join('');
    return '<div class="lane">'
      + '<div class="lane-head"><div class="lh-fam">'+esc(fam.label)+'</div><div class="lh-bet">'+esc(fam.bet)+'</div></div>'
      + '<div class="lane-track">'+nodes+'</div>'
      + '</div>';
  }

  /* ============================================================ ATLAS (accordion) */
  function acardHTML(c){
    return '<div class="acard'+(c.n===1?' open':'')+'" data-slug="'+c.slug+'" data-layer="'+c.layerNum+'" data-fate="'+c.fate+'">'
      + '<button class="acard-head" type="button" aria-expanded="'+(c.n===1?'true':'false')+'">'
        + '<span class="ah-ico">'+icon(CAP_ICONS[c.slug])+'</span>'
        + '<span class="ah-txt"><span class="ah-q"><span class="qm">“</span>'+esc(c.question)+'<span class="qm">”</span></span><span class="ah-name">'+esc(c.name)+'</span></span>'
        + '<span class="ah-fate"><span class="fchip '+c.fate+'"'+tip(c.fate)+'>'+fdot(c.fate,c.edge)+esc(c.fateLabel)+'</span></span>'
        + '<span class="ah-chev">'+icon('chevron-right')+'</span>'
      + '</button>'
      + '<div class="acard-body">'
        + '<p class="approaches-note">Parallel families, not one timeline. Each track is a different bet; lineage arrows run only inside a track. Tap a node for who uses it.</p>'
        + '<div class="lanes">'+c.families.map(laneHTML).join('')+'</div>'
        + '<a class="acard-cta" href="'+DEEP_PAGE+'#/cap/'+c.slug+'">Navigate to dossier '+icon('arrow-right')+'</a>'
      + '</div>'
      + '</div>';
  }

  function renderAtlas(){
    var html = '<div class="atlas-in atlas-top">'
      + '<p class="eyebrow">02 · The Atlas · the questions, and how real harnesses answer them</p>'
      + fatesAccordion()
      + '</div>';
    html += filterBarHTML();
    html += '<div class="atlas-in" id="acards"></div>';
    main.innerHTML = html;
    var g = document.getElementById('acards');
    g.innerHTML = layers.map(function(L){
      var lc = caps.filter(function(c){ return c.layerNum===L.num; });
      return '<section class="layer-block" data-layerblock="'+L.num+'">'
        + '<div class="layer-head"><span class="lnum">L'+L.num+'</span><h2>'+esc(L.name)+'</h2></div>'
        + '<div class="layer-q">'+esc(L.q)+'</div>'
        + '<div class="layer-meta">'
          + '<div class="layer-tldr"><span class="ctag">TL;DR</span><p>'+esc(L.tldr)+'</p></div>'
          + '<div class="layer-principle"><span class="ctag">Working principle</span><div class="pr">'+esc(L.principle)+'</div></div>'
        + '</div>'
        + '<div class="acards">'+lc.map(acardHTML).join('')+'</div>'
        + '</section>';
    }).join('');
    bindAtlas();
    bindFilters();
    applyFilters();
    lucide();
    window.scrollTo(0,0);
  }

  function bindAtlas(){
    [].slice.call(document.querySelectorAll('.acard-head')).forEach(function(h){
      h.onclick = function(){ var card=h.parentNode; var open=card.classList.toggle('open'); h.setAttribute('aria-expanded', open?'true':'false'); };
    });
    [].slice.call(document.querySelectorAll('.lnode')).forEach(function(n){ n.onclick = function(){ n.classList.toggle('open'); }; });
  }

  /* ============================================================ DEEP DIVES — lean index */
  function renderDeepIndex(){
    var html = '<div class="main-in"><section class="dd-head">'
      + '<p class="eyebrow">03 · Capability Deep Dives · the full dossiers</p>'
      + '<h1 class="display">Capability Deep Dives</h1>'
      + '<p class="lead">The full record for each capability: the failures that force it, the approaches in context, who uses what, and whether it lasts. Pick one to open it.</p>'
      + '<a class="dd-maplink" href="#/map">'+icon('table-2')+'Open the fate map</a>'
      + '</section><div class="dd-index">';
    html += layers.map(function(L){
      var lc = caps.filter(function(c){ return c.layerNum===L.num; });
      return '<section class="dd-group">'
        + '<div class="dd-group-head"><span class="lnum">L'+L.num+'</span><h2>'+esc(L.name)+'</h2><span class="dd-gq">'+esc(L.q)+'</span></div>'
        + '<ul class="dd-list">'+lc.map(function(c){
            return '<li><a href="#/cap/'+c.slug+'">'+fdot(c.fate,c.edge)+'<span class="dd-nm">'+esc(c.name)+'</span><span class="dd-q">'+esc(c.question)+'</span><span class="dd-go">'+icon('arrow-right')+'</span></a></li>';
          }).join('')+'</ul>'
        + '</section>';
    }).join('');
    html += '</div></div>';
    main.innerHTML = html; lucide(); window.scrollTo(0,0);
  }

  /* ============================================================ FILTERS (atlas) */
  function filterBarHTML(){
    var lchips = layers.map(function(L){ return '<button class="chip-f" data-flayer="'+L.num+'">'+esc(L.name)+'</button>'; }).join('');
    var fates = ['compound','fade','protect','split'];
    var fchips = fates.map(function(f){ return '<button class="chip-f" data-ffate="'+f+'">'+fdot(f)+esc(FATE_PLAIN[f])+'</button>'; }).join('');
    var hchips = A.harnesses.map(function(h){ return '<button class="chip-f" data-fharness="'+h.key+'">'+esc(h.name)+'</button>'; }).join('');
    return '<div class="filterbar"><div class="fb-in">'
      + '<div class="fgroup"><span class="fglab">Layer</span>'+lchips+'</div>'
      + '<div class="fgroup"><span class="fglab">Fate</span>'+fchips+'</div>'
      + '<div class="fgroup"><span class="fglab">Harness</span>'+hchips+'</div>'
      + '<button class="fb-clear" id="fbClear">Clear</button>'
      + '<span class="fb-count" id="fbCount"></span>'
      + '</div></div>';
  }

  function bindFilters(){
    [].slice.call(document.querySelectorAll('[data-flayer]')).forEach(function(b){ b.onclick=function(){ toggle(FILT.layers, b.dataset.flayer); b.classList.toggle('on'); applyFilters(); }; });
    [].slice.call(document.querySelectorAll('[data-ffate]')).forEach(function(b){ b.onclick=function(){ toggle(FILT.fates, b.dataset.ffate); b.classList.toggle('on'); b.classList.toggle('fate-on'); b.classList.toggle(b.dataset.ffate); applyFilters(); }; });
    [].slice.call(document.querySelectorAll('[data-fharness]')).forEach(function(b){
      b.onclick=function(){
        var k=b.dataset.fharness, was=FILT.harness===k;
        [].slice.call(document.querySelectorAll('[data-fharness]')).forEach(function(x){ x.classList.remove('on'); });
        FILT.harness = was?null:k; if(!was) b.classList.add('on'); applyFilters();
      };
    });
    var clr=document.getElementById('fbClear'); if(clr) clr.onclick=function(){ FILT={layers:{},fates:{},harness:null}; [].slice.call(document.querySelectorAll('.chip-f')).forEach(function(x){ x.className='chip-f'; }); applyFilters(); };
  }
  function toggle(o,k){ if(o[k]) delete o[k]; else o[k]=1; }

  function applyFilters(){
    var anyL=Object.keys(FILT.layers).length, anyF=Object.keys(FILT.fates).length, h=FILT.harness;
    var shown=0;
    caps.forEach(function(c){
      var card=document.querySelector('.acard[data-slug="'+c.slug+'"]'); if(!card) return;
      var okL=(!anyL||FILT.layers[c.layerNum]), okF=(!anyF||FILT.fates[c.fate]);
      var hMatch = h && c.harnesses.indexOf(h)>=0;
      var visible = okL && okF && (!h || hMatch);
      card.classList.toggle('hidden', !visible);
      card.classList.toggle('hl', !!h && hMatch);
      if(visible) shown++;
      var anyNode=false;
      [].slice.call(card.querySelectorAll('.lnode')).forEach(function(n){
        var used=(n.getAttribute('data-used')||'').split(' ');
        var nm = h && used.indexOf(h)>=0;
        n.classList.toggle('hl', !!nm);
        n.classList.toggle('dimnode', !!h && !nm);
        if(nm) anyNode=true;
        [].slice.call(n.querySelectorAll('.hchip')).forEach(function(ch){ ch.classList.toggle('hl', !!h && ch.getAttribute('data-h')===h); });
      });
      if(visible && h && anyNode){ card.classList.add('open'); var hd=card.querySelector('.acard-head'); if(hd) hd.setAttribute('aria-expanded','true'); }
    });
    layers.forEach(function(L){ var blk=document.querySelector('[data-layerblock="'+L.num+'"]'); if(!blk) return; var vis=blk.querySelectorAll('.acard:not(.hidden)').length; blk.style.display = vis?'':'none'; });
    var cnt=document.getElementById('fbCount'); if(cnt){ cnt.textContent = shown+' of 24 capabilities'+(h?' · used by '+hkey[h]:''); }
  }

  /* ============================================================ CAPABILITY DOSSIER (deepdives) */
  function incidentCardHTML(in_){
    var srcLabel = in_.source || 'Source';
    var srcHTML = in_.url ? '<a class="in-src" href="'+esc(in_.url)+'" target="_blank" rel="noopener">'+esc(srcLabel)+'</a>' : '<span class="in-by">'+esc(srcLabel)+' (no public URL)</span>';
    return '<div class="incident">'
      + '<div class="in-top"><span class="lschip '+in_.chip+'">'+esc(in_.chip)+'</span><h4>'+esc(in_.title)+'</h4></div>'
      + '<p class="in-body">'+esc(in_.body)+'</p>'
      + '<div class="in-foot"><span class="in-by">Reported by '+esc(in_.by)+'</span>'+srcHTML+'</div>'
      + '</div>';
  }

  function renderCap(slug){
    var c = bySlug[slug]; if(!c){ location.hash='#/'; return; }
    var html = '<div class="main-in"><div class="cap-page">';
    html += '<button class="cap-back" onclick="location.hash=\'#/\'">'+icon('arrow-left')+'All capabilities</button>';
    html += '<div class="cap-head"><span class="ch-ico">'+icon(CAP_ICONS[c.slug])+'</span><span class="layerchip">L'+c.layerNum+' · '+esc(c.layer)+'</span></div>';
    html += '<h1 class="cap-name">'+esc(c.name)+'</h1>';
    html += '<div class="cap-fatebadge '+c.fate+'"'+tip(c.fate)+'>'+fdot(c.fate,c.edge)+'<span class="fb-l">'+esc(c.fateLabel)+'</span><span class="fb-s">'+esc(c.fateSub)+'</span></div>';
    html += '<p class="cap-q">'+esc(c.question)+'</p>';
    html += '<div class="sec-label">The challenge</div><div class="cap-challenge"><p>'+esc(c.challenge)+'</p></div>';
    if(c.boundary){ html += '<div class="boundary-aside"><span class="ctag">What this is not</span>'+esc(c.boundary)+'</div>'; }
    html += '<div class="sec-label">Failures in the wild</div>';
    var inc = c.incidents || [];
    html += '<div class="incidents">'+inc.slice(0,3).map(incidentCardHTML).join('')+'</div>';
    if(inc.length>3){
      html += '<details class="in-more"><summary><svg class="chev" width="10" height="10" viewBox="0 0 10 10"><path d="M3 1l4 4-4 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>Show all '+inc.length+' failures</summary><div class="incidents" style="margin-top:13px">'+inc.slice(3).map(incidentCardHTML).join('')+'</div></details>';
    }
    if(c.more){ html += '<details class="in-more"><summary><svg class="chev" width="10" height="10" viewBox="0 0 10 10"><path d="M3 1l4 4-4 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>Also in the dossier</summary><div class="more-body">'+esc(c.more)+'</div></details>'; }
    html += '<div class="sec-label">Approaches</div>';
    html += '<p class="families-note">Parallel families, not one timeline. Each track is a different bet; lineage arrows run only inside a track. Tap a node for who uses it.</p>';
    html += '<div class="lanes">'+c.families.map(laneHTML).join('')+'</div>';
    html += '<div class="sec-label">Why this fate</div>';
    html += '<div class="whyfate '+c.fate+'"><span class="ctag">'+fdot(c.fate,c.edge)+esc(c.fateLabel)+'</span><p>'+esc(c.whyFate)+'</p><p class="fate-end">'+esc(c.fateLine)+'</p></div>';
    if(c.forward){ var nx=byName[c.forward.cap]; var href = nx?'#/cap/'+nx.slug:'#/';
      html += '<a class="forward" href="'+href+'"><div><span class="fw-lab">Next door</span><div class="fw-name">'+esc(c.forward.cap)+'</div><div class="fw-teaser">'+esc(c.forward.teaser)+'</div></div><span class="fw-arrow">-&gt;</span></a>'; }
    if(c.thinSpot){ html += '<details class="thinspot"><summary><svg class="chev" width="10" height="10" viewBox="0 0 10 10"><path d="M3 1l4 4-4 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>Where the sourcing is thin</summary><div class="ts-body">'+esc(c.thinSpot)+'</div></details>'; }
    html += '</div></div>';
    main.innerHTML = html;
    [].slice.call(document.querySelectorAll('.lnode')).forEach(function(n){ n.onclick=function(){ n.classList.toggle('open'); }; });
    lucide();
    window.scrollTo(0,0);
  }

  /* ============================================================ FATE MAP (deepdives #/map) */
  var mapSort = {key:'n', dir:1};
  function renderMap(){
    var html = '<div class="main-in"><section class="interactive-head">'
      + '<button class="cap-back" onclick="location.hash=\'#/\'">'+icon('arrow-left')+'All capabilities</button>'
      + '<p class="eyebrow">Capability Deep Dives · the fate map</p>'
      + '<h1>The fate map</h1>'
      + '<p>All 24 capabilities, the fear each answers, and how its scaffolding ages. Sort by fate to see the moat cluster at a glance: sixteen compound, one fades, one protects the builder, and six split.</p>'
      + '</section><div style="overflow-x:auto"><table class="fatemap" id="fatemap"></table></div></div>';
    main.innerHTML = html;
    drawMap();
    lucide();
    window.scrollTo(0,0);
  }
  function drawMap(){
    var t = document.getElementById('fatemap'); if(!t) return;
    var cols = [['n','#'],['layer','Layer'],['name','Capability'],['fear','The fear'],['fate','Fate'],['comp','Compounds?']];
    var rows = caps.slice().sort(function(a,b){
      var k=mapSort.key, va, vb;
      if(k==='comp'){ va=a.compounds; vb=b.compounds; } else if(k==='fate'){ var ord={compound:0,split:1,fade:2,protect:3}; va=ord[a.fate]; vb=ord[b.fate]; } else { va=a[k]; vb=b[k]; }
      if(va<vb) return -1*mapSort.dir; if(va>vb) return 1*mapSort.dir; return (a.n-b.n);
    });
    var compLabel={yes:'Yes',no:'No',partly:'Partly',builder:'No (persists)'};
    t.innerHTML = '<thead><tr>'+cols.map(function(c){ return '<th data-k="'+c[0]+'" class="'+(mapSort.key===c[0]?'sorted':'')+'">'+c[1]+'<span class="sortcaret">'+(mapSort.key===c[0]?(mapSort.dir>0?'▲':'▼'):'↕')+'</span></th>'; }).join('')+'</tr></thead>'
      + '<tbody>'+rows.map(function(c){
        return '<tr onclick="location.href=\''+capHref(c.slug)+'\'">'
          + '<td class="fm-comp">'+(c.n<10?'0'+c.n:c.n)+'</td>'
          + '<td class="fm-layer">'+esc(c.layer)+'</td>'
          + '<td class="fm-cap">'+esc(c.name)+'</td>'
          + '<td class="fm-fear">'+esc(c.fear)+'</td>'
          + '<td><span class="fm-fate '+c.fate+'"'+tip(c.fate)+'>'+fdot(c.fate,c.edge)+esc(c.fateLabel)+'</span></td>'
          + '<td class="fm-comp">'+compLabel[c.compounds]+'</td>'
          + '</tr>';
      }).join('')+'</tbody>';
    [].slice.call(t.querySelectorAll('th')).forEach(function(th){ th.onclick=function(){ var k=th.dataset.k; if(mapSort.key===k) mapSort.dir*=-1; else { mapSort.key=k; mapSort.dir=1; } drawMap(); }; });
  }

  /* ============================================================ QUADRANT CLOSER (matter) */
  var SIT = { quad:null, verif:50 };
  function renderSit(){
    var html = '<div class="main-in"><section class="interactive-head">'
      + '<p class="eyebrow">04 · What should matter to you · the take-home tool</p>'
      + '<h1>Where does your agent sit?</h1>'
      + '<p>How autonomous is your agent, how closely supervised, and how verifiable is its work? Answer and the map re-weights: the capabilities you most need glow, and the ones you may be over-building dim.</p>'
      + '</section>'
      + fatesAccordion()
      + '<div class="quad-wrap">'
        + '<div>'
          + '<div class="quad" id="quad">'
            + '<span class="q-axis top">supervision: close</span><span class="q-axis bottom">supervision: loose</span>'
            + '<span class="q-axis left">autonomy: low</span><span class="q-axis right">autonomy: high</span>'
            + '<div class="q-cell tl" data-q="lc"><div class="qc-t">Low autonomy<br>Close supervision</div><div class="qc-d">a watched copilot; a human is in every loop</div></div>'
            + '<div class="q-cell tr" data-q="hc"><div class="qc-t">High autonomy<br>Close supervision</div><div class="qc-d">long runs a human still reviews at the gates</div></div>'
            + '<div class="q-cell bl" data-q="ll"><div class="qc-t">Low autonomy<br>Loose supervision</div><div class="qc-d">small tasks fired and forgotten</div></div>'
            + '<div class="q-cell br" data-q="hl"><div class="qc-t">High autonomy<br>Loose supervision</div><div class="qc-d">a fleet running unattended on real systems</div></div>'
          + '</div>'
          + '<div class="verif-slider" style="margin-top:34px"><span class="rail-lab" style="color:var(--ink-3)">How verifiable is the work?</span>'
            + '<div class="vs-row"><span>objective · tests catch it</span><span>subjective · only an expert can</span></div>'
            + '<input type="range" class="range" id="verif" min="0" max="100" value="50"></div>'
        + '</div>'
        + '<div class="quad-side">'
          + '<div class="qs-lab">What glows for you</div>'
          + '<div class="glow-list" id="glowList"></div>'
          + '<div class="overbuild-line" id="overbuild">Most of the map is dim. You may be over-building; for a short, single-task, well-supervised agent on verifiable work, wait for the next model rather than scaffolding against failures it will absorb.</div>'
        + '</div>'
      + '</div></div>';
    main.innerHTML = html;
    [].slice.call(document.querySelectorAll('.q-cell')).forEach(function(cell){ cell.onclick=function(){ SIT.quad=cell.dataset.q; [].slice.call(document.querySelectorAll('.q-cell')).forEach(function(x){ x.classList.remove('on'); }); cell.classList.add('on'); drawGlow(); }; });
    var v=document.getElementById('verif'); v.oninput=function(){ SIT.verif=+v.value; drawGlow(); };
    drawGlow();
    window.scrollTo(0,0);
  }
  function drawGlow(){
    var glow = {};
    var q = SIT.quad, verif = SIT.verif;
    function add(slugs){ slugs.forEach(function(s){ glow[s]=1; }); }
    if(q==='hl' || q==='hc'){ add(['permission-and-irreversibility','isolation','wont-do-safety','execution-security','tool-dispatch-and-retry']); }
    if(q==='hl'){ add(['wont-show-opacity','observability-and-offline-evaluation','cross-agent-coherence']); }
    if(q==='hc' || q==='lc'){ add(['planning','runtime-evaluation','explicit-signals']); }
    if(q==='hl' || q==='hc'){ add(['context-curation','compression-for-coherence','state-persistence-and-ownership']); }
    if(verif>=60){ add(['runtime-evaluation','reasoning-effort-allocation','implicit-signals','identity-and-context','offline-consolidation']); }
    var glowCount = Object.keys(glow).length;
    var list = document.getElementById('glowList');
    var ordered = caps.slice().sort(function(a,b){ var ga=glow[a.slug]?0:1, gb=glow[b.slug]?0:1; if(ga!==gb) return ga-gb; return a.n-b.n; });
    list.innerHTML = ordered.map(function(c){
      var on = !!glow[c.slug];
      return '<a class="glow-item '+(on?'glow':'dim')+'" href="'+DEEP_PAGE+'#/cap/'+c.slug+'">'+fdot(c.fate,c.edge)+'<span class="gi-cap">'+esc(c.name)+'</span><span class="gi-layer">'+esc(c.layer)+'</span></a>';
    }).join('');
    var ob=document.getElementById('overbuild');
    var over = (q==='ll' || q==='lc') && verif<=40 && glowCount<=3;
    ob.classList.toggle('show', over || glowCount===0);
  }

  /* ============================================================ ROUTER */
  function route(){
    var h = location.hash || '#/';
    var m = h.match(/#\/cap\/([\w-]+)/);
    var slug = m ? m[1] : null;
    var isMap = h.indexOf('map')>=0;
    if(SURFACE==='deepdives' && routedOnce){
      if(slug && bySlug[slug]) gcount('/cap/'+slug, bySlug[slug].name);
      else if(isMap) gcount('/fate-map','Fate map');
    }
    routedOnce = true;
    renderRail(slug);
    if(SURFACE==='matter'){ renderSit(); return; }
    if(SURFACE==='atlas'){
      if(slug){ location.href = DEEP_PAGE+'#/cap/'+slug; return; }
      if(isMap){ location.href = DEEP_PAGE+'#/map'; return; }
      renderAtlas(); return;
    }
    // deepdives
    if(slug){ renderCap(slug); return; }
    if(isMap){ renderMap(); return; }
    renderDeepIndex();
  }
  window.addEventListener('hashchange', route);

  /* ---- theme toggle ---- */
  (function(){
    var btn = document.getElementById('themeBtn'), root = document.documentElement;
    function set(t){ root.setAttribute('data-theme', t); if(btn) btn.textContent = t==='dark'?'◐ Light':'◑ Dark'; }
    try{ var s = localStorage.getItem('atlas-theme'); if(s) set(s); }catch(e){}
    if(btn) btn.addEventListener('click', function(){ var n = root.getAttribute('data-theme')==='dark'?'light':'dark'; set(n); try{ localStorage.setItem('atlas-theme', n); }catch(e){} });
  })();

  route();
})();
