/* ============================================================
   THE TOUR — scroll engine + scrubbed scenes
   Scrubbing is driven by scroll position via inline styles, so
   it works even where CSS transitions are throttled, and every
   scene resolves to a readable static end-state.
   ============================================================ */
(function(){
  'use strict';
  /* tour engine v1 */
  var clamp = function(v,a,b){ return Math.max(a, Math.min(b, v)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- theme toggle ---- */
  (function(){
    var btn = document.getElementById('themeBtn'), root = document.documentElement;
    function set(t){ root.setAttribute('data-theme', t); if(btn) btn.textContent = t==='dark'?'◐ Light':'◑ Dark'; }
    try{ var s = localStorage.getItem('atlas-theme'); if(s) set(s); }catch(e){}
    if(btn) btn.addEventListener('click', function(){
      var n = root.getAttribute('data-theme')==='dark'?'light':'dark';
      set(n); try{ localStorage.setItem('atlas-theme', n); }catch(e){}
    });
  })();

  /* ============================================================
     SCENE scrubbers — keyed by data-scene. (stage, gbeat, prog)
     gbeat = active global beat number, prog = 0..1 within beat.
     ============================================================ */
  var SCENES = {};

  function setOp(el, v){ if(el) el.style.opacity = v; }

  /* SCENE: loud trace */
  SCENES.loud = function(stage, gbeat, prog){
    var sc = stage.querySelector('[data-scene="loud"]');
    if(!sc) return;
    var lines = sc.querySelectorAll('.tl');
    var stampLine = sc.querySelector('[data-stampline]');
    if(gbeat <= 2){
      var reveal = (reduce ? 4 : prog * 4.2); // lines 0..3 stream in
      lines.forEach(function(l){
        var i = +l.dataset.i;
        if(i === 4){ setOp(l, 0); return; }
        var o = reduce ? 1 : clamp((reveal - i + 0.6) / 0.6, 0, 1);
        setOp(l, o);
        l.style.filter = '';
      });
      setOp(stampLine, 0);
    } else { // beat 3+: error stays, rest dims, LOUD stamps
      lines.forEach(function(l){
        var i = +l.dataset.i;
        if(i === 4) return;
        setOp(l, l.classList.contains('err') ? 1 : 0.34);
      });
      setOp(stampLine, 1);
    }
  };

  /* SCENE: silent run */
  SCENES.silent = function(stage, gbeat, prog){
    var sc = stage.querySelector('[data-scene="silent"]');
    if(!sc) return;
    var instr = sc.querySelector('[data-instr]');
    var del = sc.querySelector('[data-del]');
    var sstamp = sc.querySelector('[data-silentstamp]');
    var nothing = sc.querySelector('[data-nothing]');
    var clns = sc.querySelectorAll('[data-ctxlines] .cln');
    var bubs = {
      compress: sc.querySelector('[data-compress-note]'),
      danger: sc.querySelector('[data-danger]'),
      stop: sc.querySelector('[data-stop]'),
      after: sc.querySelector('[data-after]')
    };
    function bubbles(p){
      setOp(bubs.compress, reduce ? 1 : clamp((p - 0.15) / 0.15, 0, 1));
      setOp(bubs.danger,   reduce ? 1 : clamp((p - 0.45) / 0.15, 0, 1));
      setOp(bubs.stop,     reduce ? 1 : clamp((p - 0.68) / 0.12, 0, 1));
      setOp(bubs.after,    reduce ? 1 : clamp((p - 0.86) / 0.12, 0, 1));
    }
    if(gbeat === 4){
      var p = reduce ? 1 : prog;
      setOp(instr, clamp(1 - (p - 0.25) / 0.35, 0, 1));      // instruction fades inside compression
      var keep = Math.round(10 - p * 5);                       // memory compresses
      clns.forEach(function(c, i){
        if(c === instr) return;
        setOp(c, i < keep ? 1 : 0.16); c.style.height = i < keep ? '9px' : '3px';
      });
      var n = Math.max(0, Math.round((p - 0.55) / 0.45 * 214)); // deletions climb
      if(del) del.textContent = n;
      setOp(sstamp, 0); setOp(nothing, 0.55);
      bubbles(p);
    } else if(gbeat >= 5){                                     // end-state
      setOp(instr, 0);
      clns.forEach(function(c, i){ if(c===instr) return; setOp(c, i < 5 ? 1 : 0.16); c.style.height = i < 5 ? '9px' : '3px'; });
      if(del) del.textContent = '214';
      setOp(sstamp, 1); setOp(nothing, 1);
      bubbles(1);
    }
  };

  /* SCENE: moat split — static, nothing to scrub */
  SCENES.moat = function(){};

  /* SCENE: spectrum — markers settle into place as you scroll */
  SCENES.spectrum = function(stage, gbeat, prog){
    var sc = stage.querySelector('[data-scene="spectrum"]');
    if(!sc) return;
    var markers = sc.querySelectorAll('.marker');
    markers.forEach(function(m, i){
      var t = reduce ? 1 : clamp((prog - i * 0.12) / 0.3, 0, 1);
      m.style.opacity = t;
      m.style.transform = 'translate(-50%,-50%) translateY(' + ((1 - t) * 14) + 'px)';
    });
  };

  /* SCENE: loud timeline — scaffold attaches, model absorbs it */
  SCENES.loudtl = function(stage, gbeat, prog, ab){
    var sc = stage.querySelector('[data-scene="loudtl"]'); if(!sc) return;
    var step = ab && ab.dataset.step;
    var p = (step === 'rule') ? 1 : (reduce ? 1 : prog);
    var scaffold = sc.querySelector('[data-scaffold]'), slot = sc.querySelector('[data-slot]'),
        core = sc.querySelector('[data-core]'), gen = sc.querySelector('[data-gen]'),
        cap = sc.querySelector('[data-cap]'), stamp = sc.querySelector('[data-stampwrap]');
    var attach = clamp(p / 0.3, 0, 1), bright = clamp((p - 0.42) / 0.18, 0, 1), absorb = clamp((p - 0.62) / 0.3, 0, 1);
    if(scaffold){ scaffold.style.opacity = Math.max(0, attach * (1 - absorb)); scaffold.style.transform = 'translateY(' + (-18 * absorb) + 'px)'; }
    if(slot) slot.style.opacity = absorb;
    if(core) core.classList.toggle('bright', bright > 0.5);
    if(gen) gen.textContent = bright > 0.5 ? 'Opus 4.6' : 'Sonnet 4.5';
    if(cap) cap.textContent = p < 0.42 ? 'The harness built a crutch: reset the context on a schedule, and hand the work across the gap in a structured note.'
      : (p < 0.66 ? 'Then Opus 4.6 arrived. It ran for hours without hurrying.'
      : '"The resets had become dead weight." So they deleted the scaffolding.');
    if(stamp) stamp.style.opacity = (step === 'rule') ? 1 : 0;
  };

  /* SCENE: silent family — verification grows as autonomy scales */
  SCENES.silentfam = function(stage, gbeat, prog, ab){
    var sc = stage.querySelector('[data-scene="silentfam"]'); if(!sc) return;
    var step = ab && ab.dataset.step;
    var p = (step === 'rule') ? 1 : (reduce ? 1 : prog);
    sc.querySelectorAll('.dw-step').forEach(function(n, i){
      var t = clamp((p - i * 0.14) / 0.22, 0, 1);
      n.style.opacity = t; n.style.transform = 'translateX(' + ((1 - t) * -12) + 'px)';
    });
    var stamp = sc.querySelector('[data-stampwrap]');
    if(stamp) stamp.style.opacity = (step === 'rule') ? 1 : 0;
  };

  /* SCENE: HERMES — billing drains while the plan dial sits frozen */
  SCENES.hermes = function(stage, gbeat, prog){
    var sc = stage.querySelector('[data-scene="hermes"]'); if(!sc) return;
    var p = reduce ? 1 : prog;
    var fill = sc.querySelector('[data-billfill]'), amt = sc.querySelector('[data-billamt]'),
        commit = sc.querySelector('[data-commit]'), cause = sc.querySelector('[data-cause]');
    var drain = clamp(p / 0.6, 0, 1);
    if(fill) fill.style.height = (drain * 100) + '%';
    if(amt) amt.textContent = '$' + (drain * 200.98).toFixed(2);
    if(commit) commit.style.opacity = clamp((p - 0.5) / 0.2, 0, 1);
    if(cause) cause.style.opacity = clamp((p - 0.75) / 0.2, 0, 1);
  };

  /* SCENE: brain — one flip card per beat, tray grows as you go */
  SCENES.brain = function(stage, gbeat, prog, ab){
    var sc = stage.querySelector('[data-scene="brain"]'); if(!sc) return;
    var idx = +ab.dataset.card;
    sc.querySelectorAll('.qcard').forEach(function(c){
      var ci = +c.dataset.card;
      c.style.display = ci === idx ? 'block' : 'none';
      if(ci === idx && !reduce) c.classList.toggle('flipped', prog > 0.42);
    });
    sc.querySelectorAll('.qtray .slot').forEach(function(s){
      s.classList.toggle('docked', +s.dataset.idx <= idx);
    });
  };

  /* SCENE: hand — one layer's fanned cards per beat */
  SCENES.hand = function(stage, gbeat, prog, ab){
    var sc = stage.querySelector('[data-scene="hand"]'); if(!sc) return;
    var idx = +ab.dataset.layer;
    sc.querySelectorAll('.hand').forEach(function(h){
      var hi = +h.dataset.layer;
      h.style.display = hi === idx ? 'block' : 'none';
      if(hi === idx && !reduce) h.querySelectorAll('.hcard').forEach(function(c){ c.classList.toggle('flipped', prog > 0.4); });
    });
  };

  /* ---- the assembled atlas: five concentric shells ---- */
  var ATLAS_LAYERS = [
    {name:'Brain', nodes:[['Identity and Context','compound','compass'],['Tool Discovery','split','wrench'],['Orchestration Routing','fade','git-fork'],['Planning','split','list-checks'],['Reasoning-Effort Allocation','split','gauge']]},
    {name:'Hands', nodes:[['Permission and Irreversibility','compound','hand'],['Execution Security','compound','shield'],['Isolation','compound','box'],['Input and Output Gating','compound','filter'],['Tool Dispatch and Retry','fade','refresh-cw']]},
    {name:'Coherence', nodes:[['Context Curation','compound','inbox'],['Compression for Coherence','compound','minimize-2'],['State Persistence and Ownership','compound','database'],['Offline Consolidation','compound','moon'],['Cross-Agent Coherence','compound','link']]},
    {name:'Feedback', nodes:[['Implicit Signals','compound','activity'],['Explicit Signals','compound','thumbs-up'],['Runtime Evaluation','split','scan-eye'],['Observability and Offline Evaluation','compound','line-chart'],['Compounding Fixes','compound','trending-up']]},
    {name:'Limitations', nodes:[["Won't Do (Safety)",'compound','ban'],["Won't Do (Commercial)",'protect','circle-dollar-sign'],["Can't Do (Ceilings)",'split','arrow-up-to-line'],["Won't Show (Opacity)",'compound','eye-off','edge']]}
  ];
  var R = [17, 26, 34, 41, 47];
  function buildShells(){
    var wrap = document.getElementById('shellsWrap'); if(!wrap || wrap._built) return; wrap._built = true;
    var svg = wrap.querySelector('.shells-svg'), ns = 'http://www.w3.org/2000/svg';
    R.forEach(function(rad, li){
      var c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', 50); c.setAttribute('cy', 50); c.setAttribute('r', rad);
      if(li === 4) c.setAttribute('class', 'wall');
      svg.appendChild(c);
    });
    ATLAS_LAYERS.forEach(function(layer, li){
      var rad = R[li], n = layer.nodes.length;
      var lab = document.createElement('div'); lab.className = 'ring-label'; lab.textContent = layer.name;
      lab.style.left = '50%'; lab.style.top = (50 - rad) + '%'; wrap.appendChild(lab);
      layer.nodes.forEach(function(node, ni){
        var ang = (-60 + ni * (360 / n)) * Math.PI / 180;
        var x = 50 + rad * Math.cos(ang), y = 50 + rad * Math.sin(ang);
        var d = document.createElement('div');
        d.className = 'shellnode ' + node[1] + (node[3] ? ' ' + node[3] : '');
        d.style.left = x + '%'; d.style.top = y + '%';
        d.setAttribute('data-name', node[0]);
        wrap.appendChild(d);
      });
    });
    // mobile five-column grid fallback
    var grid = document.getElementById('shellsGrid');
    if(grid){
      ATLAS_LAYERS.forEach(function(layer){
        var col = document.createElement('div'); col.className = 'scol';
        var h = document.createElement('div'); h.className = 'sch'; h.textContent = layer.name; col.appendChild(h);
        layer.nodes.forEach(function(node){
          var row = document.createElement('div'); row.className = 'snode';
          row.innerHTML = '<span class="fdot ' + node[1] + (node[3] ? ' ' + node[3] : '') + '"></span><span><i data-lucide="' + node[2] + '"></i>' + node[0] + '</span>';
          col.appendChild(row);
        });
        grid.appendChild(col);
      });
    }
  }

  /* SCENE: shells — nodes settle onto their rings */
  SCENES.shells = function(stage, gbeat, prog){
    var wrap = stage.querySelector('#shellsWrap'); if(!wrap) return;
    var nodes = wrap.querySelectorAll('.shellnode');
    nodes.forEach(function(nd, i){
      var t = reduce ? 1 : clamp((prog - (i / nodes.length) * 0.5) / 0.4, 0, 1);
      nd.style.opacity = t;
      if(t >= 1) nd.style.transform = ''; else nd.style.transform = 'translate(-50%,-50%) scale(' + (0.25 + 0.75 * t) + ')';
    });
  };

  /* SCENE: capopen — one node unfolds into a mini capability page */
  SCENES.capopen = function(stage, gbeat, prog, ab){
    var sc = stage.querySelector('[data-scene="capopen"]'); if(!sc) return;
    var p = (gbeat >= 32) ? 1 : (reduce ? 1 : prog);
    var blocks = sc.querySelectorAll('[data-co]');
    blocks.forEach(function(b, i){
      var t = clamp((p - 0.12 - i * 0.22) / 0.22, 0, 1);
      b.style.opacity = t;
      b.style.transform = 'translateY(' + ((1 - t) * 10) + 'px)';
    });
  };

  /* expose for later sections to extend */
  window.TourScenes = SCENES;

  /* per-scene one-time init (hide scrub elements at rest) */
  function initScene(stage){
    var s = stage.querySelector('[data-scene="silent"]');
    if(s){
      ['[data-compress-note]','[data-danger]','[data-stop]','[data-after]'].forEach(function(sel){
        var el = s.querySelector(sel); if(el && !reduce) el.style.opacity = 0;
      });
    }
  }

  /* ============================================================
     SCROLLY engine
     ============================================================ */
  function setupScrolly(root){
    var beats = [].slice.call(root.querySelectorAll('.beat'));
    var stage = root.querySelector('.stage');
    var scenes = [].slice.call(root.querySelectorAll('.scene'));
    if(!beats.length || !stage) return;
    initScene(stage);

    function update(){
      /* on mobile the stage is a compact sticky panel up top, so the
         activation line moves down below it */
      var mid = window.innerHeight * (window.innerWidth <= 880 ? 0.68 : 0.42);
      var active = 0, best = Infinity;
      beats.forEach(function(b, i){
        var r = b.getBoundingClientRect();
        var c = r.top + r.height / 2;
        var d = Math.abs(c - mid);
        if(d < best){ best = d; active = i; }
      });
      var ab = beats[active];
      var sceneName = ab.dataset.scene;
      var gbeat = +ab.dataset.beat;
      beats.forEach(function(b, i){ b.classList.toggle('cur', i === active); });
      scenes.forEach(function(s){ s.classList.toggle('on', s.dataset.scene === sceneName); });
      stage.dataset.beat = gbeat;
      var r = ab.getBoundingClientRect();
      var prog = clamp((mid - r.top) / r.height, 0, 1);
      var fn = SCENES[sceneName];
      if(fn){ try{ fn(stage, gbeat, prog, ab); }catch(e){ /* keep scrolling */ } }
    }
    root._update = update;
    return update;
  }

  /* ---- boot ---- */
  var FATE_TIPS = {
    compound: "Built against a silent failure, one nothing in the run announces. Caught and encoded, it keeps its value as models improve; this is the scaffolding that can become the moat.",
    fade: "Built against a loud failure, one the trace announces. Better models absorb these, so the scaffolding is temporary: a loan the next model repays.",
    protect: "A wall the agent-building team raises for its own commercial or legal reasons, not to make the agent better. Anti-distillation and hidden codenames when the team also makes the model; PII and compliance walls when it rents one. It neither fades nor compounds; it lasts as long as the business reason does.",
    split: "This capability's halves age differently: part fades as models improve, part compounds. The page explains which is which."
  };
  function applyFateTips(){
    [].slice.call(document.querySelectorAll('.fbadge')).forEach(function(b){
      ['compound','fade','protect','split'].forEach(function(k){
        if(b.classList.contains(k) && !b.hasAttribute('data-fate-tip')) b.setAttribute('data-fate-tip', FATE_TIPS[k]);
      });
      if(!b.hasAttribute('tabindex')) b.setAttribute('tabindex','0');
    });
  }
  window.applyFateTips = applyFateTips;

  /* prepend a Lucide capability icon to every .capname / .hname by name */
  function iconifyNames(){
    var map = {};
    ATLAS_LAYERS.forEach(function(l){ l.nodes.forEach(function(n){ map[n[0]] = n[2]; }); });
    [].slice.call(document.querySelectorAll('.capname, .hname')).forEach(function(el){
      if(el.querySelector('i,svg')) return;
      var ic = map[el.textContent.trim()];
      if(ic){ var i = document.createElement('i'); i.setAttribute('data-lucide', ic); i.className = 'capicon'; el.insertBefore(i, el.firstChild); }
    });
  }

  var updaters = [];
  function boot(){
    applyFateTips();
    buildShells();
    iconifyNames();
    if(window.lucide && window.lucide.createIcons){ try{ window.lucide.createIcons(); }catch(e){} }
    [].slice.call(document.querySelectorAll('[data-scrolly]')).forEach(function(root){
      var u = setupScrolly(root); if(u) updaters.push(u);
    });
    // tap-to-flip on every flip card (coral = interactive)
    [].slice.call(document.querySelectorAll('.qcard, .hcard')).forEach(function(c){
      c.setAttribute('tabindex', '0');
      c.addEventListener('click', function(){ c.classList.toggle('flipped'); });
      c.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); c.classList.toggle('flipped'); } });
    });
    onScroll();
    // deep-link entry points: re-run the jump after layout settles
    if(location.hash){
      var target = document.getElementById(location.hash.slice(1));
      if(target) setTimeout(function(){ target.scrollIntoView(); onScroll(); }, 60);
    }
  }
  var ticking = false;
  function onScroll(){
    if(ticking) return; ticking = true;
    requestAnimationFrame(function(){
      // progress rail
      var rail = document.getElementById('tprog');
      if(rail){
        var h = document.documentElement.scrollHeight - window.innerHeight;
        rail.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
      }
      updaters.forEach(function(u){ u(); });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  if(document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
  window.TourBoot = boot;
})();
