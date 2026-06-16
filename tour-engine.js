/* ============================================================
   THE TOUR — v5 engine (editorial pass).
   Changes vs v4:
   · No autoplay anywhere. Figures init at step 1 (no blank box
     on anchor jumps or fast flicks).
   · Mobile: stepped tap-through. A narration card sits under the
     figure showing the current beat's text; "Continue" advances
     figure + narration together. Dots are real step-jump
     controls (≥24px hit areas).
   · Desktop: beats drive steps as before.
   · Breadcrumbs: click-to-jump; final milestone resolves at the
     anatomy section's last beat, not the footer.
   · Orbital nodes: ≥24px hit areas, styled selected state, and
     each tap shows name + one-liner + a deep link into the
     Atlas dossier. The how-to caption is persistent.
   ============================================================ */
(function(){
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mqDesk = window.matchMedia('(min-width: 980px)');
  function desk(){ return mqDesk.matches; }

  /* ---------- theme toggle ---------- */
  (function(){
    var root = document.documentElement, btn = document.getElementById('themeBtn');
    function label(){ if(btn) btn.textContent = root.getAttribute('data-theme')==='dark' ? '◐ Light' : '◐ Dark'; }
    function set(t){ root.setAttribute('data-theme', t); label(); }
    try{ var s = localStorage.getItem('atlas-theme'); if(s) set(s); }catch(e){}
    label();
    if(btn) btn.addEventListener('click', function(){
      var n = root.getAttribute('data-theme')==='dark' ? 'light' : 'dark';
      set(n); try{ localStorage.setItem('atlas-theme', n); }catch(e){}
    });
  })();

  /* ---------- hamburger menu (mobile) ---------- */
  (function(){
    var btn = document.getElementById('menuBtn'), mast = document.querySelector('.mast');
    if(!btn || !mast) return;
    btn.addEventListener('click', function(){
      var open = mast.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    [].slice.call(mast.querySelectorAll('nav a')).forEach(function(a){
      a.addEventListener('click', function(){ mast.classList.remove('menu-open'); });
    });
  })();

  /* ---------- progress bar + section ticks ---------- */
  (function(){
    var prog = document.querySelector('.tprog'), bar = prog && prog.querySelector('.fill');
    if(!bar) return;
    var secs = [].slice.call(document.querySelectorAll('section[id]'));
    function ticks(){
      [].slice.call(prog.querySelectorAll('.tick')).forEach(function(t){ t.remove(); });
      var doc = document.documentElement.scrollHeight - window.innerHeight;
      if(doc <= 0) return;
      secs.forEach(function(s){
        var t = document.createElement('span'); t.className = 'tick';
        t.style.left = (s.offsetTop / doc * 100) + '%';
        prog.appendChild(t);
      });
    }
    function on(){
      var doc = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (doc > 0 ? (window.scrollY / doc * 100) : 0) + '%';
    }
    window.addEventListener('scroll', on, {passive:true});
    window.addEventListener('resize', function(){ ticks(); on(); });
    setTimeout(ticks, 200); on();
  })();

  /* ---------- deep links ---------- */
  if(location.hash){
    var tgt = document.getElementById(location.hash.slice(1));
    if(tgt) setTimeout(function(){ tgt.scrollIntoView(); }, 80);
  }

  /* ---------- per-figure hooks ---------- */
  var HOOKS = {
    inbox: function(fig, n){
      var rail = fig.querySelector('.ctxrail');
      if(rail) rail.classList.toggle('squeezed', n >= 3);
      var cnt = fig.querySelector('.delcount b');
      if(cnt){
        if(n >= 4 && !cnt._run){
          cnt._run = true;
          if(reduce){ cnt.textContent = '200+'; return; }
          var v = 0;
          var t = setInterval(function(){
            v += 17;
            if(v >= 200){ cnt.textContent = '200+'; clearInterval(t); }
            else cnt.textContent = String(v);
          }, 90);
        }
        if(n < 4 && !cnt._run) cnt.textContent = '0';
      }
    }
  };

  /* ---------- step setter ---------- */
  function setStep(fig, n){
    fig._step = n;
    fig.setAttribute('data-step', n);
    var last = null;
    [].slice.call(fig.querySelectorAll('[data-s]')).forEach(function(el){
      var s = parseInt(el.getAttribute('data-s'), 10);
      var u = el.hasAttribute('data-s-until') ? parseInt(el.getAttribute('data-s-until'), 10) : Infinity;
      var on = n >= s && n <= u;
      el.classList.toggle('on', on);
      if(on && s === n) last = el;
    });
    if(fig._dots) fig._dots.forEach(function(d, i){ d.classList.toggle('on', i + 1 <= n); });
    if(fig._nar) fig._nar(n);
    var hook = fig.getAttribute('data-hook');
    if(hook && HOOKS[hook]) HOOKS[hook](fig, n);
    /* mobile: the figure scrolls internally; keep the newest content
       visible WITHOUT moving the page (scroll the container only) */
    if(!desk() && fig._touched && last){
      try{
        var fr = fig.getBoundingClientRect(), lr = last.getBoundingClientRect();
        if(lr.bottom > fr.bottom - 56 || lr.top < fr.top){
          fig.scrollTo({ top: fig.scrollTop + (lr.top - fr.top) - 24,
                         behavior: reduce ? 'auto' : 'smooth' });
        }
      }catch(e){}
    }
  }

  /* ---------- dots: real step-jump controls ---------- */
  function attachDots(fig, total){
    if(total < 2) return;
    var bar = document.createElement('div'); bar.className = 'steps';
    fig._dots = [];
    for(var i = 1; i <= total; i++){
      (function(n){
        var d = document.createElement('button');
        d.className = 'sdot'; d.type = 'button';
        d.setAttribute('aria-label', 'Go to step ' + n + ' of ' + total);
        d.addEventListener('click', function(){ fig._touched = true; setStep(fig, n); });
        bar.appendChild(d); fig._dots.push(d);
      })(i);
    }
    var rp = document.createElement('button');
    rp.className = 'replay'; rp.type = 'button'; rp.textContent = 'restart';
    rp.addEventListener('click', function(){ setStep(fig, 1); });
    bar.appendChild(rp);
    fig.appendChild(bar);
  }

  /* ---------- scrolly init ---------- */
  function initScrolly(sc){
    var fig = sc.querySelector('.fig'); if(!fig) return;
    var total = parseInt(fig.getAttribute('data-steps'), 10) || 1;
    var beats = [].slice.call(sc.querySelectorAll('.beat'));

    /* desktop: beats drive */
    if(beats.length && 'IntersectionObserver' in window){
      var io = new IntersectionObserver(function(es){
        es.forEach(function(e){
          if(!desk() || !e.isIntersecting) return;
          beats.forEach(function(b){ b.classList.toggle('cur', b === e.target); });
          setStep(fig, parseInt(e.target.getAttribute('data-step'), 10) || 1);
        });
      }, {rootMargin:'-38% 0px -42% 0px', threshold:0});
      beats.forEach(function(b){ io.observe(b); });
    }
    if(beats.length) beats[0].classList.add('cur');

    /* scrolling back above the first beat returns the figure to its
       opening state, so the sequence rewinds cleanly */
    if(beats.length){
      window.addEventListener('scroll', function(){
        if(!desk()) return;
        var r = beats[0].getBoundingClientRect();
        if(r.top > window.innerHeight * 0.62 && (fig._step || 1) !== 1){
          beats.forEach(function(b){ b.classList.remove('cur'); });
          beats[0].classList.add('cur');
          setStep(fig, 1);
        }
      }, {passive:true});
    }

    /* mobile: stepped tap-through with interleaved narration */
    if(beats.length && total > 1){
      var stage = sc.querySelector('.stage');
      var narWrap = document.createElement('div'); narWrap.className = 'mnar';
      var narBody = document.createElement('div'); narBody.className = 'mnar-body';
      var nxt = document.createElement('button');
      nxt.className = 'mnext'; nxt.type = 'button';
      nxt.innerHTML = 'Continue <span class="arr">▸</span>';
      narWrap.appendChild(narBody); narWrap.appendChild(nxt);
      stage.appendChild(narWrap);

      var beatMap = beats.map(function(b){
        return { step: parseInt(b.getAttribute('data-step'), 10) || 1,
                 html: (b.querySelector('.bcard') || b).innerHTML };
      });
      fig._nar = function(n){
        var pick = beatMap[0];
        beatMap.forEach(function(bm){ if(bm.step <= n) pick = bm; });
        narBody.innerHTML = pick.html;
        nxt.style.display = (n >= total) ? 'none' : '';
      };
      nxt.addEventListener('click', function(){
        fig._touched = true;
        setStep(fig, Math.min(total, (fig._step || 1) + 1));
      });
    }
  }

  [].slice.call(document.querySelectorAll('.scrolly')).forEach(initScrolly);

  /* every figure: dots, then init at step 1 — never a blank box */
  [].slice.call(document.querySelectorAll('.fig[data-steps]')).forEach(function(fig){
    var total = parseInt(fig.getAttribute('data-steps'), 10) || 1;
    attachDots(fig, total);
    setStep(fig, 1);
  });

  /* ---------- breadcrumbs: rail ≥1600px, sticky accordion below ---------- */
  (function(){
    var rail = document.querySelector('.crumbs'); if(!rail) return;
    var items = [].slice.call(rail.querySelectorAll('li'));
    var secs = items.map(function(li){ return document.getElementById(li.getAttribute('data-sec')); });
    var btn = document.getElementById('crumbBtn'), cur = document.getElementById('crumbCur');
    if(btn) btn.addEventListener('click', function(){
      if(window.matchMedia('(min-width:1600px)').matches) return;
      var open = rail.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    items.forEach(function(li, i){
      li.setAttribute('role', 'link'); li.setAttribute('tabindex', '0');
      function go(){
        rail.classList.remove('open');
        if(secs[i]) secs[i].scrollIntoView({behavior: reduce ? 'auto' : 'smooth'});
      }
      li.addEventListener('click', go);
      li.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); go(); } });
    });
    function on(){
      var vh = window.innerHeight;
      var probe = window.scrollY + vh * .45;
      var curIdx = -1, doneCount = 0, label = 'the tour begins';
      secs.forEach(function(s, i){ if(s && s.offsetTop <= probe) curIdx = i; });
      items.forEach(function(li, i){
        var s = secs[i];
        var resolved = s && (i < curIdx || probe > s.offsetTop + s.offsetHeight - vh * .55);
        if(resolved){ doneCount++; label = li.textContent; }
        li.classList.toggle('done', !!resolved);
        li.classList.toggle('cur', i === curIdx && !resolved);
        if(i === curIdx && !resolved) label = li.textContent;
      });
      if(cur) cur.textContent = doneCount + '/' + items.length + ' · ' + label;
    }
    window.addEventListener('scroll', on, {passive:true});
    window.addEventListener('resize', on);
    on();
  })();

  /* ---------- the orbital: nodes as the Atlas on-ramp ---------- */
  var LAYERS = [
    {name:'Brain', icon:'compass', nodes:[
      ['Identity and Context','What is this project, and what are the rules of the world I’m operating in?'],
      ['Tool Discovery','What can I actually do right now, and what’s in my toolbox?'],
      ['Orchestration Routing','Is this job too big for one pass, and should I split it across helpers?'],
      ['Planning','What’s my approach before I start, and should someone sign off on it first?'],
      ['Reasoning-Effort Allocation','How hard should I think about this one, and which model should do it?']]},
    {name:'Hands', icon:'hand', nodes:[
      ['Permission and Irreversibility','Am I about to do something I cannot take back, and should a human stand between me and this button?'],
      ['Execution Security','Is this instruction really mine, or did something hostile slip in through the content I’m reading?'],
      ['Isolation','If this runs and goes wrong, what can it actually reach?'],
      ['Input and Output Gating','Is this one file or tool result big enough to swallow my whole working memory?'],
      ['Tool Dispatch and Retry','That call just failed. Do I retry it, adjust, or stop bothering the human?']]},
    {name:'Coherence', icon:'database', nodes:[
      ['Context Curation','What should be on my desk this turn, and what must never be thrown away?'],
      ['Compression for Coherence','The context is filling up. What do I keep so I don’t lose the plot?'],
      ['State Persistence and Ownership','When this session ends, will I remember any of this tomorrow, and who keeps that memory?'],
      ['Offline Consolidation','What do I clean up and learn while I’m asleep?'],
      ['Cross-Agent Coherence','My helpers are off doing their pieces. Will the pieces agree when they come back?']]},
    {name:'Feedback', icon:'trending-up', nodes:[
      ['Implicit Signals','What is the user’s behavior telling me that they aren’t saying?'],
      ['Explicit Signals','What did they actually tell me?'],
      ['Runtime Evaluation','Is this work actually right, while it is happening?'],
      ['Observability and Offline Evaluation','Can we see what happened, and did the system get better or worse this week?'],
      ['Compounding Fixes','What did we change so this never happens again?']]},
    {name:'Limitations', icon:'ban', nodes:[
      ["Won't Do (Safety)",'What must I never do, no matter how sure I am?'],
      ["Won't Do (Commercial)",'Which of my refusals protect the vendor, not me?'],
      ["Can't Do (Ceilings)",'What is actually impossible here, and do I admit it?'],
      ["Won't Show (Opacity)",'What is happening in here that nobody can see?']]}
  ];
  var R = [17, 25, 33, 40, 47];
  function slugify(name){
    return name.toLowerCase().replace(/['’()]/g, '').replace(/\s+/g, '-');
  }

  (function buildShells(){
    var wrap = document.getElementById('shellsWrap'); if(!wrap) return;
    var svg = wrap.querySelector('.shells-svg'), ns = 'http://www.w3.org/2000/svg';
    var nameBox = document.getElementById('nodeName');
    var selected = null;
    svg.setAttribute('viewBox', '0 0 100 100');
    var defs = document.createElementNS(ns, 'defs');
    svg.appendChild(defs);
    function pt(r, deg){
      var a = deg * Math.PI / 180;
      return (50 + r * Math.cos(a)).toFixed(2) + ' ' + (50 + r * Math.sin(a)).toFixed(2);
    }
    LAYERS.forEach(function(layer, li){
      var n = layer.nodes.length;
      var r = R[li];
      var label = 'L' + (li + 1) + ' · ' + layer.name.toUpperCase();

      /* the label sits IN a gap cut into its own ring, in the node-free
         arc closest to the top so the text reads horizontally */
      var nodeStep = 360 / n;
      var centerDeg = null, bestDiff = 1e9;
      for(var k = 0; k < n; k++){
        var cand = -90 + li * 20 + nodeStep / 2 + k * nodeStep;
        var norm = ((cand + 90) % 360 + 360) % 360;     /* distance from top */
        var diff = Math.min(norm, 360 - norm);
        if(diff < bestDiff){ bestDiff = diff; centerDeg = cand; }
      }
      var inner = r < 20;
      var charAdv = inner ? 1.42 : 1.62;                   /* mono advance at the label font */
      var textDeg = (label.length * charAdv) / (2 * Math.PI * r) * 360;
      var gapHalf = textDeg / 2 + 4;

      /* ring drawn as one arc that leaves the gap open */
      var ring = document.createElementNS(ns, 'path');
      ring.setAttribute('d', 'M ' + pt(r, centerDeg + gapHalf) +
        ' A ' + r + ' ' + r + ' 0 1 1 ' + pt(r, centerDeg - gapHalf));
      ring.setAttribute('class', 'ring' + (li === 4 ? ' wall' : ''));
      svg.appendChild(ring);

      /* full circle as TWO half-arcs (no degenerate endpoints); the join
         at 50% length is exactly centerDeg, where the text centers */
      var lp = document.createElementNS(ns, 'path');
      lp.setAttribute('d', 'M ' + pt(r, centerDeg - 180) +
        ' A ' + r + ' ' + r + ' 0 0 1 ' + pt(r, centerDeg) +
        ' A ' + r + ' ' + r + ' 0 0 1 ' + pt(r, centerDeg - 180));
      lp.setAttribute('id', 'ringpath' + li);
      lp.setAttribute('fill', 'none');
      defs.appendChild(lp);
      var lt = document.createElementNS(ns, 'text');
      lt.setAttribute('class', 'ringlab' + (li === 4 ? ' wall' : '') + (inner ? ' inner' : ''));
      lt.setAttribute('text-anchor', 'middle');
      var tp = document.createElementNS(ns, 'textPath');
      tp.setAttribute('href', '#ringpath' + li);
      tp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#ringpath' + li);
      tp.setAttribute('startOffset', '50%');
      tp.textContent = label;
      lt.appendChild(tp);
      svg.appendChild(lt);
      layer.nodes.forEach(function(node, ni){
        var a = -Math.PI / 2 + (ni / n) * 2 * Math.PI + li * 0.35;
        var cx = (50 + R[li] * Math.cos(a)).toFixed(2), cy = (50 + R[li] * Math.sin(a)).toFixed(2);

        var c = document.createElementNS(ns, 'circle');
        c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', 2);
        c.setAttribute('class', 'node');
        svg.appendChild(c);

        /* invisible, larger hit area on top (≥24px at typical render width) */
        var hit = document.createElementNS(ns, 'circle');
        hit.setAttribute('cx', cx); hit.setAttribute('cy', cy); hit.setAttribute('r', 3.6);
        hit.setAttribute('class', 'nodehit');
        hit.setAttribute('tabindex', '0');
        hit.setAttribute('role', 'link');
        hit.setAttribute('aria-label', node[0] + ', ' + layer.name + ' layer. Opens the Atlas dossier.');
        var slug = slugify(node[0]);
        function show(){
          if(selected) selected.classList.remove('sel');
          selected = c; c.classList.add('sel');
          if(!nameBox) return;
          nameBox.innerHTML =
            '<b class="nn-name">' + node[0] + '</b>' +
            '<span class="nn-q">' + node[1] + '</span>' +
            '<span class="nn-meta"><i data-lucide="' + layer.icon + '"></i>L' + (li + 1) + ' · ' + layer.name + '</span>' +
            '<a class="cta-open nn-cta" href="capability-deep-dives.html#/cap/' + slug + '">Open in Atlas <span class="arr">→</span></a>';
          if(window.lucide) lucide.createIcons();
        }
        hit.addEventListener('mouseenter', show);
        hit.addEventListener('focus', show);
        hit.addEventListener('click', show);
        hit.addEventListener('keydown', function(e){
          if(e.key === 'Enter'){ location.href = 'capability-deep-dives.html#/cap/' + slug; }
        });
        svg.appendChild(hit);
        /* the panel opens pre-loaded with the first capability, so real
           content is the default view, never instructions */
        if(li === 0 && ni === 0) show();
      });
    });
  })();

})();
