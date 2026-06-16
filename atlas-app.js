/* ============================================================
   THE ATLAS — app: surface-aware hash router + renderers.
   - atlas (02):   approaches-forward accordion (question -> approaches),
                   full width, no rail. Filters; harness highlights nodes.
   - deepdives (03): full-width layer browser + full Deep Dives.
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
  var ATLAS_PAGE  = 'the-atlas.html';
  var DEEP_PAGE   = 'capability-deep-dives.html';
  var MATTER_PAGE = 'what-should-matter-to-you.html';
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
    compound:"This is a hypothesis about durable value. The failure is silent, so the harness has to preserve the catch because the model may never observe the miss on its own.",
    fade:"This is a hypothesis about temporary scaffolding. The failure is visible in traces, tests, or user reports, so better models and evaluations may absorb more of it over time.",
    protect:"A wall the builder raises for commercial or legal reasons. It may persist, but the protected party is not necessarily the operator using the agent.",
    split:"This capability covers two different failure classes. One side may shrink with better models, and the other remains structural."
  };
  var FATE_PLAIN = {compound:'Compounds', fade:'May fade', protect:'Protects builder', split:'Split'};

  /* ---- operating-loop framing, mirroring 02 The Atlas (v2). L1-L4 are the four
     jobs of the loop; L5 is a cross-cutting constraints overlay, not a step. ---- */
  var ROLE = {1:'Orient', 2:'Act', 3:'Remember', 4:'Improve'};
  var LOOP_Q = {
    1:'How does the agent orient itself and choose an approach?',
    2:'What can touch real systems?',
    3:'How does the run keep the thread?',
    4:'How does the system improve after failure?'
  };
  /* plain-language one-liner per capability (the on-ramp before the dense
     challenge). Kept identical to the DEF map in the-atlas.js — if you
     edit one, edit both, or hoist to atlas-data.js. */
  var DEF = {
    'identity-and-context':'Supplies the project rules and domain knowledge the model does not start with.',
    'tool-discovery':'Shows the available tools without loading every schema into every turn.',
    'orchestration-routing':'Decides when one run should stay linear and when work should split across helpers.',
    'planning':'Forms an approach before action, with approval where the possible damage is large enough to need it.',
    'reasoning-effort-allocation':'Matches thinking effort and model cost to the task.',
    'permission-and-irreversibility':'Enforces approval at the action boundary for changes the agent cannot safely undo.',
    'execution-security':'Prevents hostile content from becoming executable instructions.',
    'isolation':'Limits what a run can reach when something fails.',
    'input-and-output-gating':'Stops one oversized result from consuming the working context.',
    'tool-dispatch-and-retry':'Handles failed tool calls with retry, adjustment, or escalation.',
    'context-curation':'Keeps the context the run depends on active and discards lower-value material.',
    'compression-for-coherence':'Shrinks a growing history without losing the plot.',
    'state-persistence-and-ownership':'Carries useful state beyond one run and defines who owns it.',
    'offline-consolidation':'Turns messy session notes into a better starting point for the next run.',
    'cross-agent-coherence':'Keeps parallel workers from returning contradictory pieces.',
    'implicit-signals':'Uses behavior as evidence when the user never states the issue directly.',
    'explicit-signals':'Captures corrections so the fix travels beyond one session.',
    'runtime-evaluation':'Checks work during the run before somebody acts on it.',
    'observability-and-offline-evaluation':'Makes runs inspectable and scores changes against a stable test set.',
    'compounding-fixes':'Turns a caught failure into a rule, test, or gate that prevents recurrence.',
    'wont-do-safety':'Enforces safety limits even when the model argues against them.',
    'wont-do-commercial':'Marks restrictions driven by the builder’s incentives rather than the operator’s.',
    'cant-do-ceilings':'Names actual capability ceilings instead of pretending configuration can remove them.',
    'wont-show-opacity':'Surfaces the behavior the harness keeps hidden from the operator.'
  };
  /* what each capability's approach diagram actually shows, curated (not a
     heuristic). Mirrors the DIAGRAM map in the-atlas.js. */
  var DIAGRAM = {
    'identity-and-context':'Alternatives','tool-discovery':'Maturity path','orchestration-routing':'Alternatives',
    'planning':'Alternatives','reasoning-effort-allocation':'Maturity path','permission-and-irreversibility':'Control set',
    'execution-security':'Control set','isolation':'Control set','input-and-output-gating':'Pipeline',
    'tool-dispatch-and-retry':'Control set','context-curation':'Control set','compression-for-coherence':'Control set',
    'state-persistence-and-ownership':'Alternatives','offline-consolidation':'Alternatives','cross-agent-coherence':'Alternatives',
    'implicit-signals':'Maturity path','explicit-signals':'Control set','runtime-evaluation':'Control set',
    'observability-and-offline-evaluation':'Control set','compounding-fixes':'Maturity path','wont-do-safety':'Maturity path',
    'wont-do-commercial':'Examples','cant-do-ceilings':'Control set','wont-show-opacity':'Examples'
  };
  var DIAGRAM_NOTE = {
    'Alternatives':'Competing approaches. Teams choose among these tracks. Arrows mark how one track evolves.',
    'Pipeline':'One pipeline. The stages compose and run in order. Nothing here is a rival to anything else.',
    'Maturity path':'One approach maturing into a more capable version. Sibling tracks branch off the spine.',
    'Control set':'Not rivals. These mechanisms are usually deployed together. Arrows mark how one track evolves.',
    'Examples':'Documented product instances, not architectural options to choose among.'
  };

  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function icon(name){ return '<i data-lucide="'+name+'"></i>'; }
  function lucide(){ if(window.lucide && window.lucide.createIcons){ try{ window.lucide.createIcons(); }catch(e){} } }
  function fdot(c, edge){ return '<span class="fdot '+c+(edge?' edge':'')+'"></span>'; }
  function tip(c){ return ' data-fate-tip="'+esc(FATE_TIPS[c])+'" tabindex="0"'; }
  function tidy(s){ return String(s==null?'':s).replace(/\s+,/g, ',').replace(/\s{2,}/g, ' ').trim(); }
  function displayFateSub(c){ return tidy(c.fateSub || ''); }
  function displayFateLine(c){
    return tidy(c.fateLine || '')
      .replace(/\baccretes\b/g, 'keeps accumulating')
      .replace(/\bthe moat\b/g, 'durable advantage')
      .replace(/\bmoat\b/g, 'durable advantage');
  }
  function provenance(in_){
    var raw = ((in_.source||'')+' '+(in_.by||'')+' '+(in_.url||'')).toLowerCase();
    if(!in_.url || raw.indexOf('vault')>=0) return {cls:'vault', label:'Vault note', desc:'Internal research note or no public URL'};
    if(raw.indexOf('unverified')>=0 || raw.indexOf('leak')>=0 || raw.indexOf('reverse')>=0 || raw.indexOf('competitor')>=0) return {cls:'caveat', label:'Caveated', desc:'Single-source, reconstructed, leak-derived, or disputed'};
    if(raw.indexOf('docs')>=0 || raw.indexOf('blog')>=0 || raw.indexOf('engineering')>=0 || raw.indexOf('arxiv')>=0 || raw.indexOf('github')>=0 || raw.indexOf('anthropic')>=0 || raw.indexOf('microsoft')>=0 || raw.indexOf('shopify')>=0 || raw.indexOf('intercom')>=0 || raw.indexOf('atlassian')>=0 || raw.indexOf('project vend')>=0) return {cls:'primary', label:'Primary/public', desc:'Primary source, public docs, paper, or firsthand issue'};
    return {cls:'reported', label:'Reported', desc:'Public report or practitioner account'};
  }

  var FILT = { layers:{}, fates:{}, harness:null };
  var DDFILT = { layer:null, harness:null };
  /* analytics (GoatCounter, cookieless) — count.js auto-counts the page load;
     this fires a clean virtual pageview for in-page deep-dive navigation. */
  var routedOnce = false;
  function gcount(path, title){ if(window.goatcounter && window.goatcounter.count){ try{ window.goatcounter.count({path:path, title:title||path, event:false}); }catch(e){} } }

  /* ============================================================ RAIL (deepdives + matter only) */
  var RR = [17,26,34,41,47];
  function renderRail(activeSlug){
    if(!rail) return;
    if(SURFACE==='deepdives'){ rail.innerHTML = ''; return; }
    var isMap = location.hash.indexOf('map')>=0;
    var html = '<div class="rail-lab">Deep Dive nav</div>';
    html += '<div class="rail-shells" id="railShells"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"></svg><div class="rail-core">model<br>core</div></div>';
    html += '<div class="rail-legend">'
      + '<span class="rl">'+fdot('compound')+'compounds</span>'
      + '<span class="rl">'+fdot('fade')+'may fade</span>'
      + '<span class="rl">'+fdot('protect')+'protects builder</span>'
      + '<span class="rl">'+fdot('split')+'split</span></div>';
    html += '<div class="rail-mobile-grid" id="railGrid"></div>';
    html += '<div class="rail-nav">'
      + '<a href="'+ATLAS_PAGE+'">'+icon('layout-grid')+'The Atlas</a>'
      + '<a href="'+DEEP_PAGE+'" class="'+(SURFACE==='deepdives' && !isMap ? 'cur':'')+'">'+icon('book-open')+'Deep dives</a>'
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
      + '<p style="margin:0 0 4px">Fate is an investment hypothesis. It says what kind of failure forced this capability, and what a better model is likely to remove.</p>'
      + '<div class="legend-row">'+fdot('compound')+'<div><b style="color:var(--fate-compound)">Teal, Compounds:</b> the failure is silent, so the catch has to stay in the harness unless another system makes it visible.</div></div>'
      + '<div class="legend-row">'+fdot('fade')+'<div><b style="color:var(--fate-fade)">Warm gray, May fade:</b> the failure is visible enough for models, tests, or evaluations to absorb more of it over time.</div></div>'
      + '<div class="legend-row">'+fdot('protect')+'<div><b style="color:var(--fate-protect)">Amber, Protects builder:</b> the builder raises the wall for commercial or legal reasons. The operator may not be the protected party.</div></div>'
      + '<div class="lk">The Tour teaches all three with documented incidents in about seven minutes. <a href="the-tour.html">Take the tour -&gt;</a></div>'
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
        + '<div class="ln-panel"><span class="lp-lab">Family bet</span>'+esc(fam.bet || 'This is one implementation track.')+'<div style="margin-top:8px"><span class="lp-lab">Tracked use</span>'+(nd.usedBy&&nd.usedBy.length?harnessChips(nd.usedBy):'<span class="ln-desc">no tracked harness yet</span>')+'</div>'+(nd.rel?'<div style="margin-top:8px"><span class="lp-lab">Relationship</span>'+esc(nd.rel)+'</div>':'')+'</div>'
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
        + '<p class="approaches-note">'+esc(DIAGRAM_NOTE[DIAGRAM[c.slug]||'Alternatives'])+' Tap a node for who uses it.</p>'
        + '<div class="lanes">'+c.families.map(laneHTML).join('')+'</div>'
        + '<a class="acard-cta" href="'+DEEP_PAGE+'#/cap/'+c.slug+'">Open Deep Dive '+icon('arrow-right')+'</a>'
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

  /* ============================================================ DEEP DIVES — layer browser, filters, and pages */
  function ddItem(c){
    return '<li data-dd-item="'+esc(c.slug)+'" data-layer="'+c.layerNum+'" data-fate="'+esc(c.fate)+'" data-harnesses="'+esc((c.harnesses||[]).join(' '))+'"><a href="#/cap/'+c.slug+'">'
      + '<span class="dd-card-top"><span class="dd-num">'+(c.n<10?'0'+c.n:c.n)+'</span><span class="dd-layer">L'+c.layerNum+' · '+esc(c.layer)+'</span><span class="dd-mini-fate '+c.fate+'">'+fdot(c.fate,c.edge)+esc(c.fateLabel)+'</span></span>'
      + '<span class="dd-nm">'+esc(c.name)+'</span>'
      + '<span class="dd-q">'+esc(c.question)+'</span>'
      + '<span class="dd-fear">'+esc(c.fear)+'</span>'
      + '<span class="dd-go">'+icon('arrow-right')+'</span>'
      + '</a></li>';
  }

  function deepFilterBarHTML(){
    var hchips = A.harnesses.map(function(h){ return '<button class="chip-f" data-dd-harness="'+h.key+'">'+esc(h.name)+'</button>'; }).join('');
    return '<div class="dd-filterbar" id="ddBrowse"><div class="dd-filter-head"><div><p class="eyebrow">Find a Deep Dive</p><h2>Filter by harness</h2></div><span class="fb-count" id="ddCount"></span></div>'
      + '<div class="fb-in">'
      + '<div class="fgroup"><span class="fglab">Harness</span>'+hchips+'</div>'
      + '<button class="fb-clear" id="ddClear">Clear</button>'
      + '</div></div>';
  }

  function ddBoardCard(c){
    return '<a href="#/cap/'+c.slug+'" class="dd-board-card" data-dd-item="'+esc(c.slug)+'" data-layer="'+c.layerNum+'" data-fate="'+esc(c.fate)+'" data-harnesses="'+esc((c.harnesses||[]).join(' '))+'">'
      + '<span class="dd-card-top"><span class="dd-num">'+(c.n<10?'0'+c.n:c.n)+'</span><span class="dd-layer">L'+c.layerNum+' · '+esc(c.layer)+'</span><span class="dd-mini-fate '+c.fate+'">'+fdot(c.fate,c.edge)+esc(c.fateLabel)+'</span></span>'
      + '<span class="dd-nm">'+esc(c.name)+'</span>'
      + '<span class="dd-q">'+esc(c.question)+'</span>'
      + '<span class="dd-fear">'+esc(c.fear)+'</span>'
      + '<span class="dd-go">'+icon('arrow-right')+'</span>'
      + '</a>';
  }

  function ddBoardHTML(){
    return '<section class="dd-board" id="ddBoard" aria-label="Capability layer browser">'
      + '<div class="dd-board-left">'
        + '<div class="dd-stage-spine">'
          + '<div class="dd-spine-model">Model<span>Core</span></div>'
          + '<div class="dd-spine-layers">'
          + layers.map(function(L){
              return '<button type="button" class="dd-spine-layer" data-dd-board-layer="'+L.num+'" aria-pressed="false">'
                + '<span><b>L'+L.num+' · '+esc(L.name)+'</b><em>'+esc(L.num<5 ? ROLE[L.num] : 'Overlay')+'</em></span>'
                + '<i class="dd-spine-count" data-dd-count="'+L.num+'"></i>'
                + '</button>';
            }).join('')
          + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="dd-board-main">'
        + layers.map(function(L){
            var lc = caps.filter(function(c){ return c.layerNum===L.num; });
            var q = L.num<5 ? LOOP_Q[L.num] : 'What won’t it do, can’t it do, won’t it show?';
            return '<section class="dd-board-layer" data-dd-board-panel="'+L.num+'">'
              + '<div class="dd-board-head"><span>'+(L.num<5 ? ROLE[L.num] : 'Overlay')+'</span><h2>L'+L.num+' · '+esc(L.name)+'</h2><p>'+esc(q)+'</p></div>'
              + '<div class="dd-board-cards">'+lc.map(ddBoardCard).join('')+'</div>'
              + '</section>';
          }).join('')
      + '</div>'
      + '</section>';
  }

  function drawDeepSpine(){
    var spine = document.querySelector('.dd-stage-spine'); if(!spine) return;
    var old = spine.querySelector('.dd-spine-svg'); if(old) old.parentNode.removeChild(old);
    var model = spine.querySelector('.dd-spine-model');
    var btns = [].slice.call(spine.querySelectorAll('.dd-spine-layer'));
    if(!model || !btns.length) return;
    var s = spine.getBoundingClientRect();
    if(s.width < 10) return;
    var m = model.getBoundingClientRect();
    var mx = m.right - s.left, my = m.top + m.height/2 - s.top;
    var activeLayer = String(DDFILT.layer || '1');
    var ah = 8, parts = '';
    btns.forEach(function(b){
      var r = b.getBoundingClientRect();
      var bx = r.left - s.left, by = r.top + r.height/2 - s.top;
      var on = String(b.dataset.ddBoardLayer)===activeLayer;
      var col = on ? 'var(--live)' : 'var(--hl-strong)';
      var op = on ? '1' : '.42';
      var dy = by - my, d;
      if(Math.abs(dy) < 4){
        d = 'M '+mx+' '+my+' H '+(bx-ah);
      } else {
        var dir = dy>0 ? 1 : -1, tx = mx + (bx-mx)/2;
        var rr = Math.min(12, Math.abs(dy)/2);
        d = 'M '+mx+' '+my+' H '+(tx-rr)
          + ' Q '+tx+' '+my+' '+tx+' '+(my+rr*dir)
          + ' V '+(by-rr*dir)
          + ' Q '+tx+' '+by+' '+(tx+rr)+' '+by
          + ' H '+(bx-ah);
      }
      parts += '<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="2.4" stroke-linecap="round" opacity="'+op+'"/>'
        + '<path d="M '+bx+' '+by+' l -'+ah+' -4.6 v 9.2 z" fill="'+col+'" opacity="'+op+'"/>';
    });
    spine.insertAdjacentHTML('beforeend',
      '<svg class="dd-spine-svg" width="'+Math.ceil(s.width)+'" height="'+Math.ceil(s.height)+'" viewBox="0 0 '+Math.ceil(s.width)+' '+Math.ceil(s.height)+'" aria-hidden="true">'+parts+'</svg>');
  }

  function bindDeepFilters(){
    function pick(kind, val){
      var was = String(DDFILT[kind])===String(val);
      DDFILT[kind] = was ? null : val;
      applyDeepFilters();
    }
    [].slice.call(document.querySelectorAll('[data-dd-harness]')).forEach(function(b){ b.onclick=function(){ pick('harness', b.dataset.ddHarness); }; });
    var clear = document.getElementById('ddClear');
    if(clear) clear.onclick = function(){ DDFILT.harness=null; applyDeepFilters(); };
    [].slice.call(document.querySelectorAll('[data-dd-board-layer]')).forEach(function(b){
      b.onclick = function(){ DDFILT.layer = b.dataset.ddBoardLayer; applyDeepFilters(); };
    });
  }

  function applyDeepFilters(){
    var shown = 0;
    var activeLayer = String(DDFILT.layer || '1');
    caps.forEach(function(c){
      var item = document.querySelector('[data-dd-item="'+c.slug+'"]'); if(!item) return;
      var ok = String(c.layerNum)===activeLayer
        && (!DDFILT.harness || (c.harnesses||[]).indexOf(DDFILT.harness)>=0);
      item.classList.toggle('hidden', !ok);
      if(ok) shown++;
    });
    [].slice.call(document.querySelectorAll('[data-dd-board-panel]')).forEach(function(g){
      var on = String(g.dataset.ddBoardPanel)===activeLayer;
      g.classList.toggle('active', on);
      g.style.display = on ? '' : 'none';
    });
    [].slice.call(document.querySelectorAll('[data-dd-board-layer]')).forEach(function(b){
      var on = activeLayer===String(b.dataset.ddBoardLayer);
      b.classList.toggle('on', on);
      b.classList.toggle('sel', on);
      b.setAttribute('aria-pressed', on?'true':'false');
    });
    [].slice.call(document.querySelectorAll('[data-dd-harness]')).forEach(function(b){ b.classList.toggle('on', DDFILT.harness===b.dataset.ddHarness); });
    layers.forEach(function(L){
      var n = caps.filter(function(c){ return c.layerNum===L.num && (!DDFILT.harness || (c.harnesses||[]).indexOf(DDFILT.harness)>=0); }).length;
      var el = document.querySelector('[data-dd-count="'+L.num+'"]');
      if(el) el.textContent = DDFILT.harness ? String(n) : '';
    });
    var count = document.getElementById('ddCount');
    var layerName = (layers.filter(function(L){ return String(L.num)===activeLayer; })[0]||{}).name || '';
    if(count) count.textContent = shown+' Deep Dive'+(shown===1?'':'s')+' in '+layerName+(DDFILT.harness?' · '+hkey[DDFILT.harness]:'');
    drawDeepSpine();
  }

  function renderDeepIndex(){
    var html = '<div class="main-in"><section class="dd-head">'
      + '<p class="eyebrow">03 · Capability Deep Dives · the full set</p>'
      + '<h1 class="display">Capability Deep Dives</h1>'
      + '<p class="lead">Each Deep Dive answers one roadmap question: what failure forced this capability, how teams implement it, who uses each approach, and whether a better model makes it less necessary.</p>'
      + '</section>';

    html += deepFilterBarHTML();

    html += '<div class="dd-section-head"><p class="eyebrow">The operating loop</p><h2 class="dd-section-h">Pick a layer on the left; the Deep Dives for that layer appear on the right.</h2></div>';
    html += ddBoardHTML();

    html += '</div>';
    main.innerHTML = html;
    bindDeepFilters();
    applyDeepFilters();
    setTimeout(drawDeepSpine, 60);
    lucide(); window.scrollTo(0,0);
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
  function incidentCardHTML(in_, mode){
    var pv = provenance(in_);
    var srcLabel = in_.source || 'Source';
    var srcHTML = in_.url ? '<a class="in-src" href="'+esc(in_.url)+'" target="_blank" rel="noopener">'+esc(srcLabel)+'</a>' : '<span class="in-by">'+esc(srcLabel)+' (no public URL)</span>';
    return '<div class="incident '+(mode||'')+'">'
      + '<div class="in-top"><span class="lschip '+in_.chip+'">'+esc(in_.chip)+'</span><span class="source-tier '+pv.cls+'" title="'+esc(pv.desc)+'">'+esc(pv.label)+'</span><h4>'+esc(in_.title)+'</h4></div>'
      + '<p class="in-body">'+esc(in_.body)+'</p>'
      + '<div class="in-foot"><span class="in-by">Reported by '+esc(in_.by)+'</span>'+srcHTML+'</div>'
      + '</div>';
  }

  function renderCap(slug){
    var c = bySlug[slug]; if(!c){ location.hash='#/'; return; }
    var html = '<div class="main-in"><div class="cap-page">';
    html += '<button class="cap-back" onclick="location.hash=\'#/\'">'+icon('arrow-left')+'All capabilities</button>';
    var roleTag = c.layerNum<5 ? (' · '+ROLE[c.layerNum]) : ' · cross-cutting';
    html += '<div class="cap-head"><span class="ch-ico">'+icon(CAP_ICONS[c.slug])+'</span><span class="layerchip">L'+c.layerNum+' · '+esc(c.layer)+roleTag+'</span></div>';
    html += '<h1 class="cap-name">'+esc(c.name)+'</h1>';
    if(DEF[c.slug]){ html += '<p class="cap-standfirst">'+esc(DEF[c.slug])+'</p>'; }
    html += '<div class="cap-fatebadge '+c.fate+'"'+tip(c.fate)+'>'+fdot(c.fate,c.edge)+'<span class="fb-l">'+esc(c.fateLabel)+'</span><span class="fb-s">'+esc(displayFateSub(c))+'</span></div>';
    html += '<p class="cap-q">'+esc(c.question)+'</p>';
    var inc = c.incidents || [];
    if(inc.length){
      html += '<div class="sec-label">1 · The failure that forces it</div>';
      html += '<div class="anchor-failure">'+incidentCardHTML(inc[0], 'anchor')+'</div>';
    }
    html += '<div class="sec-label">2 · The challenge</div><div class="cap-challenge"><p>'+esc(c.challenge)+'</p></div>';
    if(c.boundary){
      html += '<details class="boundary-aside boundary-details"><summary><span class="ctag">Practitioner boundary</span> What this is not</summary><div>'+esc(c.boundary)+'</div></details>';
    }
    if(inc.length>1){
      html += '<div class="sec-label">More failures in the wild</div>';
      html += '<div class="incidents">'+inc.slice(1,3).map(function(x){ return incidentCardHTML(x); }).join('')+'</div>';
    }
    if(inc.length>3){
      html += '<details class="in-more"><summary><svg class="chev" width="10" height="10" viewBox="0 0 10 10"><path d="M3 1l4 4-4 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>Show remaining '+(inc.length-3)+' failures</summary><div class="incidents" style="margin-top:13px">'+inc.slice(3).map(function(x){ return incidentCardHTML(x); }).join('')+'</div></details>';
    }
    if(c.more){ html += '<details class="in-more"><summary><svg class="chev" width="10" height="10" viewBox="0 0 10 10"><path d="M3 1l4 4-4 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>Also in the Deep Dive</summary><div class="more-body">'+esc(c.more)+'</div></details>'; }
    var dtype = DIAGRAM[c.slug] || 'Alternatives';
    html += '<div class="sec-label">3 · Approaches <span class="diagram-pill" title="'+esc(DIAGRAM_NOTE[dtype])+'">'+esc(dtype)+'</span></div>';
    html += '<p class="families-note">'+esc(DIAGRAM_NOTE[dtype])+' Open a node for tracked use and how it relates to the family.</p>';
    html += '<div class="lanes">'+c.families.map(laneHTML).join('')+'</div>';
    html += '<div class="sec-label">4 · Fate verdict</div>';
    html += '<div class="whyfate '+c.fate+'"><span class="ctag">'+fdot(c.fate,c.edge)+esc(c.fateLabel)+'</span><p class="fate-end">'+esc(displayFateLine(c))+'</p><details class="fate-proof"><summary>Read the argument</summary><p>'+esc(c.whyFate)+'</p></details></div>';
    if(c.forward){ var nx=byName[c.forward.cap]; var href = nx?'#/cap/'+nx.slug:'#/';
      html += '<a class="forward" href="'+href+'"><div><span class="fw-lab">Next door</span><div class="fw-name">'+esc(c.forward.cap)+'</div><div class="fw-teaser">'+esc(c.forward.teaser)+'</div></div><span class="fw-arrow">-&gt;</span></a>'; }
    if(c.thinSpot){ html += '<details class="thinspot"><summary><svg class="chev" width="10" height="10" viewBox="0 0 10 10"><path d="M3 1l4 4-4 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>Where the sourcing is thin</summary><div class="ts-body">'+esc(c.thinSpot)+'</div></details>'; }
    html += '</div></div>';
    main.innerHTML = html;
    [].slice.call(document.querySelectorAll('.lnode')).forEach(function(n){ n.onclick=function(){ n.classList.toggle('open'); }; });
    lucide();
    window.scrollTo(0,0);
  }

  /* ============================================================ QUADRANT CLOSER (matter) */
  var SIT = { quad:null, verif:50 };
  function renderSit(){
    var html = '<div class="main-in"><section class="interactive-head">'
      + '<p class="eyebrow">04 · What should matter to you · the take-home tool</p>'
      + '<h1>Where does your agent sit?</h1>'
      + '<p>How autonomous is your agent? How closely is it supervised? How verifiable is its work? Answer these, and the map re-weights. The capabilities you most need glow, and the ones you may be over-building dim.</p>'
      + '</section>'
      + fatesAccordion()
      + '<div class="quad-wrap">'
        + '<div>'
          + '<div class="quad" id="quad">'
            + '<span class="q-axis top">supervision: close</span><span class="q-axis bottom">supervision: loose</span>'
            + '<span class="q-axis left">autonomy: low</span><span class="q-axis right">autonomy: high</span>'
            + '<div class="q-cell tl" data-q="lc"><div class="qc-t">Low autonomy<br>Close supervision</div><div class="qc-d">a watched copilot, with a human in every loop</div></div>'
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
          + '<div class="overbuild-line" id="overbuild">Most of the map is dim. You may be over-building. For a short, single-task, well-supervised agent on verifiable work, wait for the next model rather than building scaffolding against failures it will absorb.</div>'
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
      else if(isMap) gcount('/deep-dives','Deep Dives');
    }
    routedOnce = true;
    renderRail(slug);
    if(SURFACE==='matter'){ renderSit(); return; }
    if(SURFACE==='atlas'){
      if(slug){ location.href = DEEP_PAGE+'#/cap/'+slug; return; }
      if(isMap){ location.href = DEEP_PAGE; return; }
      renderAtlas(); return;
    }
    // deepdives
    if(slug){ renderCap(slug); return; }
    if(isMap){ history.replaceState(null, '', location.pathname+'#/'); renderDeepIndex(); return; }
    renderDeepIndex();
  }
  window.addEventListener('hashchange', route);

  (function(){
    var t;
    window.addEventListener('resize', function(){
      if(!document.querySelector('.dd-stage-spine')) return;
      clearTimeout(t);
      t = setTimeout(drawDeepSpine, 120);
    });
  })();

  /* ---- hamburger menu (mobile) — mirrors tour-engine.js ---- */
  (function(){
    var b = document.getElementById('menuBtn'), m = document.querySelector('.mast');
    if(!b || !m) return;
    b.addEventListener('click', function(){ var o = m.classList.toggle('menu-open'); b.setAttribute('aria-expanded', o?'true':'false'); });
    [].slice.call(m.querySelectorAll('nav a')).forEach(function(a){ a.addEventListener('click', function(){ m.classList.remove('menu-open'); }); });
  })();

  /* ---- theme toggle ---- */
  (function(){
    var btn = document.getElementById('themeBtn'), root = document.documentElement;
    function set(t){ root.setAttribute('data-theme', t); if(btn) btn.textContent = t==='dark'?'◐ Light':'◑ Dark'; }
    try{ var s = localStorage.getItem('atlas-theme'); if(s) set(s); }catch(e){}
    if(btn) btn.addEventListener('click', function(){ var n = root.getAttribute('data-theme')==='dark'?'light':'dark'; set(n); try{ localStorage.setItem('atlas-theme', n); }catch(e){} });
  })();

  route();
})();
