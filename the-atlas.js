/* ============================================================
   THE ATLAS — renderer for the-atlas.html (the operating-loop atlas).
   Built from the wireframe redesign. The arc:
     1 hero claim + four-job mental model
     2 one concrete run that fails (context-budget scenario)
     3 operating loop Orient -> Act -> Remember -> Improve,
       with Constraints and incentives as a cross-cutting overlay
     4 the fate lens, visible by default, framed as a hypothesis
     5 optional expert layer: the implementation atlas
     6 closer to the Deep Dives
   Diagram types are curated per capability (DIAGRAM below),
   not inferred by a heuristic.
   ============================================================ */
(function(){
  'use strict';
  var A = window.ATLAS;
  if(!A){ document.body.insertAdjacentHTML('beforeend','<p style="padding:30px">Atlas data did not load.</p>'); return; }
  var caps = A.caps, layers = A.layers, harnessNames = {};
  A.harnesses.forEach(function(h){ harnessNames[h.key] = h.name; });

  var fateNames = {compound:'Compounds', fade:'May fade', protect:'Protects builder', split:'Split'};
  var role = {1:'Orient', 2:'Act', 3:'Remember', 4:'Improve'};
  var layerCopy = {
    1:{q:'How does the agent orient itself and choose an approach?', body:'Supply the domain context, available tools, and reasoning strategy before the agent touches anything.'},
    2:{q:'What can touch real systems?', body:'Put enforceable boundaries between reasoning and actions with real cost, risk, or irreversibility.'},
    3:{q:'How does the run keep the thread?', body:'Restore the relevant history, compress it carefully, and persist what matters after the session ends.'},
    4:{q:'How does the system improve after failure?', body:'Observe runs, evaluate outcomes, and ship reusable fixes rather than relearning the same lesson.'}
  };

  /* plain-language definition per capability (the wireframe's language) */
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

  /* ----------------------------------------------------------
     Diagram type per capability, curated from the family
     structures in atlas-data.js (not a heuristic):
     · Alternatives  — teams choose among competing approaches
     · Pipeline      — the steps compose and must occur in order
     · Maturity path — one approach evolves into a more capable version
     · Control set   — several mechanisms usually deployed together
     · Examples      — items are product instances, not options
     ---------------------------------------------------------- */
  var DIAGRAM = {
    'identity-and-context':'Alternatives',          /* rules files vs org graph vs retrieval: rival bets on where knowledge lives */
    'tool-discovery':'Maturity path',               /* full-load -> deferred -> tool-RAG -> code execution is the spine; B-D compose with it */
    'orchestration-routing':'Alternatives',         /* single agent vs decomposition vs delegation vs coordinator vs dynamic workflows */
    'planning':'Alternatives',                      /* ReAct vs plan-then-execute vs approval gate vs replanning vs spec-first vs scratchpad */
    'reasoning-effort-allocation':'Maturity path',  /* fixed -> manual modes -> auto effort, with routing siblings */
    'permission-and-irreversibility':'Control set', /* gates, approvals, classifiers, rollback: deployed together */
    'execution-security':'Control set',             /* hardening + classifiers + marking + validation + isolation: defense in depth */
    'isolation':'Control set',                      /* sandbox + credentials + tokens + workspace + egress: walls stacked together */
    'input-and-output-gating':'Pipeline',           /* the data says it itself: one pipeline, six stages, not rival families */
    'tool-dispatch-and-retry':'Control set',        /* retry + concurrency + failover + budgets + structured dispatch run together */
    'context-curation':'Control set',               /* pre-query trim + pinning + just-in-time injection compose every turn */
    'compression-for-coherence':'Control set',      /* compaction, digest quality, restoration, pre-writes, caps: machinery around one squeeze */
    'state-persistence-and-ownership':'Alternatives', /* logs vs layered stores vs extraction services; ownership postures overlay */
    'offline-consolidation':'Alternatives',         /* reflection vs dream-loop vs sleep-time vs inline vs skill curation */
    'cross-agent-coherence':'Alternatives',         /* mailbox vs shared artifacts vs full trace vs refutation vs digest vs claiming */
    'implicit-signals':'Maturity path',             /* regex -> behavioral dynamics -> learned classifiers, plus mandatory wiring */
    'explicit-signals':'Control set',               /* corrections, ratings, approval streams, reports: channels collected together */
    'runtime-evaluation':'Control set',             /* different judges for different questions, often several at once */
    'observability-and-offline-evaluation':'Control set', /* watching + measuring + the bridge, deployed as a stack */
    'compounding-fixes':'Maturity path',            /* manual fix-engineering -> automated optimization, plus the delivery channel */
    'wont-do-safety':'Maturity path',               /* in-loop instruction -> deny lists -> non-overridable hierarchy -> policy engines */
    'wont-do-commercial':'Examples',                /* documented instances of builders protecting their business */
    'cant-do-ceilings':'Control set',               /* declared limits + loud failure + honest fallbacks compose; papering-over is the anti-pattern */
    'wont-show-opacity':'Examples'                  /* a vendor lane of documented hiding, an operator lane of countermeasures */
  };
  var DIAGRAM_NOTE = {
    'Alternatives':'Competing approaches. Teams choose among these tracks. Arrows mark how one track evolves.',
    'Pipeline':'One pipeline. The stages compose and run in order. Nothing here is a rival to anything else.',
    'Maturity path':'One approach maturing into a more capable version. Sibling tracks branch off the spine.',
    'Control set':'Not rivals. These mechanisms are usually deployed together. Arrows mark how one track evolves.',
    'Examples':'Documented product instances, not architectural options to choose among.'
  };

  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }
  function fdot(f){ return '<span class="fdot '+f+'"></span>'; }

  /* ============================================================
     2 · SCENARIO: one failing run, rebuilt as a likelihood model.
     Inputs: a tool-catalogue slider plus twelve harness blocks.
     Output: the likelihood the agent requests manager approval
     before issuing the £4,800 refund. Numbers are illustrative.
     ============================================================ */
  var sim = {
    tools: 60,                    /* slider: tools in the catalogue, each with description + schema */
    rule: 'sys',                  /* 'sys' = rule in system prompt · 'scoped' = dynamic scoped load */
    toolload: 'static',           /* 'static' | 'lazy' */
    safe: {gate:false, judge:false}
  };
  function clamp(x,lo,hi){ return Math.max(lo, Math.min(hi, x)); }

  function scenarioModel(){
    var n = sim.tools;
    /* --- context segments, as % of the working budget --- */
    var toolPct = sim.toolload==='static' ? Math.round(n*0.9) : Math.round(5 + n*0.12);
    var resultPct = 22, rulePct = 2, reasonPct = 12, otherPct = 12;
    var total = toolPct + resultPct + rulePct + reasonPct + otherPct;

    /* --- eviction pressure: compaction machinery wakes near 85% --- */
    var pressure = clamp((total-85)/30, 0, 1);

    /* --- does the rule reach the final reasoning step? --- */
    var pRule = sim.rule==='sys'
      ? 0.97 * (1 - pressure*0.85)
      : 0.88 * 0.97 * (1 - pressure*0.35); /* scoped: needs the refund signal, but loads late and fresher */
    var p = pRule * 0.92;                                      /* models sometimes argue past their own rules */
    if(sim.safe.judge) p = p + (1-p)*0.75;                     /* a judge catches ~3 of 4 misses before money moves */
    if(sim.safe.gate)  p = Math.max(p, 0.99);                  /* structural: the tool will not fire above £1,000 */
    return {toolPct:toolPct, resultPct:resultPct, rulePct:rulePct, reasonPct:reasonPct, otherPct:otherPct,
            total:total, pressure:pressure, pRule:clamp(pRule,0,1), p:clamp(p,0,1)};
  }

  function scenarioOutcome(m){
    var pct = Math.round(m.p*100);
    if(sim.safe.gate) return {kind:'blocked', title:'Structurally enforced. The refund cannot fire without approval',
      body:'Above £1,000 the refund tool needs an approval token that the agent cannot create on its own. The reasoning can still go wrong. The irreversible call cannot.'};
    if(pct>=85) return {kind:'good', title:'Agent requests manager approval',
      body:'The rule is almost always in the active context at the moment of decision.'};
    if(pct>=55) return {kind:'warn', title:'The rule survives some runs and not others',
      body:'The outcome depends on what eviction took that day. The agent and the request are the same, and every trace looks plausible.'};
    return {kind:'bad', title:'Agent likely issues the £4,800 refund',
      body:'The rule usually falls out of the active context before the decision. You see no warning inside the run.'};
  }

  /* --- the trade-off lens: the four dials a VP weighs for a support agent.
         All four read lower-is-better. --- */
  function scenarioLenses(m){
    var lat  = sim.safe.gate ? 2 : (sim.safe.judge ? 1 : 0);   /* approval queue >> judge hop >> straight through */
    var cost = Math.min(2, (m.total>=95 ? 2 : m.total>=70 ? 1 : 0) + (sim.safe.judge ? 1 : 0));
    var eng  = Math.min(2, (sim.toolload==='lazy'?1:0) + (sim.safe.judge?1:0) + (sim.safe.gate?1:0));
    var mnt  = Math.min(2, (sim.rule==='scoped'?1:0) + (sim.safe.gate?1:0) + (sim.safe.judge?1:0));
    var note = sim.safe.gate ? 'At an upmarket retailer, e.g., a furniture house, most legitimate refunds exceed £1,000. Each one now queues for a manager.'
             : sim.safe.judge ? 'A judge call now runs on every action. It adds latency and cost per contact, and the judge itself can drift.'
             : sim.toolload==='lazy' ? 'The context is cheaper, but there is more plumbing. The tool-search hop is yours to build and keep working.'
             : sim.rule==='scoped' ? 'The scoped rules registry is now configuration someone owns and keeps current.'
             : 'Most of the bill is tool schemas the agent never calls, and the rule still gets evicted.';
    function row(name, lvl){
      var words = ['Low','Medium','High'];
      var cls = lvl===0 ? 'good' : lvl===1 ? 'mid' : 'bad';
      return '<div class="lens-row"><span>'+name+'</span><b class="lens-lvl '+cls+'">'+words[lvl]+'</b></div>';
    }
    return {rows: row('Latency', lat) + row('Cost per contact', cost)
                + row('Engineering effort', eng) + row('Config maintenance effort', mnt),
            note: note};
  }

  function chip(attr, val, label, on){
    return '<button type="button" data-'+attr+'="'+val+'" class="sim-chip'+(on?' on':'')+'" aria-pressed="'+(on?'true':'false')+'">'+esc(label)+'</button>';
  }

  function contextHTML(m){
    var sr = Math.round(m.pRule*100), ruleState;
    if(sim.rule==='scoped') ruleState = 'loads on refund signal · in context ~'+sr+'% of runs';
    else if(m.pressure>0) ruleState = 'under eviction pressure · survives ~'+sr+'% of runs';
    else ruleState = 'active · survives ~'+sr+'% of runs';
    var ruleClass = m.pRule>=0.85 ? 'ok' : (m.pRule>=0.5 ? 'risk' : 'drop');
    function seg(cls,w){ return '<span class="'+cls+'" style="width:'+clamp(w,0,100)+'%"></span>'; }
    return '<div class="ctx-col">'
      + '<div class="budget-head"><strong>'+m.total+'% of context budget</strong><span class="'+(m.total>100?'over':'')+'">'+(m.total>100?'OVER BUDGET +'+(m.total-100)+'%':'WITHIN BUDGET')+'</span></div>'
      + '<div class="budget-bar" role="img" aria-label="Context budget by segment">'
        + seg('seg-rule',m.rulePct)+seg('seg-tools',m.toolPct)+seg('seg-result',m.resultPct)+seg('seg-reason',m.reasonPct)+seg('seg-other',m.otherPct)
        + '<i class="compact-mark" title="Compaction machinery wakes near 85%"></i></div>'
      + '<div class="budget-key"><span><i class="k-rule"></i>rule '+m.rulePct+'%</span><span><i class="k-tools"></i>tools '+m.toolPct+'%</span><span><i class="k-result"></i>results '+m.resultPct+'%</span><span><i class="k-reason"></i>reasoning '+m.reasonPct+'%</span><span><i class="k-other"></i>other '+m.otherPct+'%</span></div>'
      + '<p class="budget-over '+(m.pressure>0?'is-over':'')+'">'+(m.pressure>0
          ? 'Eviction pressure is '+Math.round(m.pressure*100)+'%. Compaction wakes near 85%, and you get no notice of what it takes.'
          : 'This is inside the 85% compaction threshold, so nothing is evicted.')+'</p>'
      + '</div><div class="ctx-col">'
        + '<div class="memory-item rule-item '+ruleClass+'"><span class="tag">the rule</span><span class="mi-body"><b>Refunds above £1,000 require manager approval.</b><em>'+esc(ruleState)+'</em></span></div>'
      + '</div>';
  }

  var LK_LABEL = {blocked:'Certain', good:'Very high', warn:'Medium', bad:'Low'};
  function outputHTML(m){
    var o = scenarioOutcome(m), pct = Math.round(m.p*100);
    var band = sim.safe.gate ? 'blocked' : (pct>=85 ? 'good' : pct>=55 ? 'warn' : 'bad');
    var lens = scenarioLenses(m);
    return '<div class="out-col">'
      + '<p class="pane-kicker">Output · run consequence</p>'
      + '<div class="likelihood '+band+'"><span class="lk-label">Likelihood the agent requests manager approval</span>'
        + '<span class="lk-num">'+LK_LABEL[band]+'</span>'
        + '<span class="lk-meter"><i style="width:'+pct+'%"></i></span>'
        + '<span class="lk-verdict"><b>'+esc(o.title)+'.</b> '+esc(o.body)+'</span>'
      + '</div>'
      + '</div><div class="out-col">'
      + '<p class="pane-kicker">The trade-off · what reliability costs</p>'
      + '<div class="lens-rows">'+lens.rows+'</div>'
      + '</div>'
      + '<p class="lens-note">'+esc(lens.note)+'</p>';
  }

  function renderScenario(){
    var root = document.getElementById('scenarioApp');
    root.innerHTML = '<div class="scenario-controls">'
      + '<div class="ctl-cell"><span class="g-label">Tool catalogue</span>'
        + '<div class="slider-row"><input type="range" id="toolSlider" min="8" max="80" step="2" value="'+sim.tools+'" aria-label="Number of tools and tool descriptions available">'
        + '<span class="slider-readout" id="toolReadout"></span></div></div>'
      + '<div class="ctl-group"><span class="g-label">Where the rule lives <i>pick one</i></span><div class="g-chips">'
        + chip('rule','sys','System prompt', sim.rule==='sys')
        + chip('rule','scoped','Dynamic scoped load', sim.rule==='scoped')
      + '</div></div>'
      + '<div class="ctl-group"><span class="g-label">How tools load <i>pick one</i></span><div class="g-chips">'
        + chip('toolload','static','Static full load', sim.toolload==='static')
        + chip('toolload','lazy','Lazy loading', sim.toolload==='lazy')
      + '</div></div>'
      + '<div class="ctl-group"><span class="g-label">Safeguards &amp; feedback <i>stackable</i></span><div class="g-chips">'
        + chip('safe','gate','Guardrail · > £1,000', sim.safe.gate)
        + chip('safe','judge','Runtime evaluation', sim.safe.judge)
      + '</div></div>'
      + '</div>'
      + '<p class="scenario-note">This is an illustrative model, not measured probabilities. The control is here to make the trade-off visible. Context pressure, rule placement, and action gates each push the run a different way.</p>'
      + '<div class="scenario-pane"><p class="pane-kicker">Active context · one run</p><div class="context-row" id="ctxRow"></div></div>'
      + '<div class="scenario-pane"><div class="output-row" id="outRow"></div></div>';

    function update(){
      var m = scenarioModel();
      document.getElementById('toolReadout').innerHTML = '<b>'+sim.tools+'</b> tools';
      document.getElementById('ctxRow').innerHTML = contextHTML(m);
      document.getElementById('outRow').innerHTML = outputHTML(m);
      [].slice.call(root.querySelectorAll('[data-rule]')).forEach(function(b){ var on = sim.rule===b.dataset.rule; b.classList.toggle('on',on); b.setAttribute('aria-pressed',on?'true':'false'); });
      [].slice.call(root.querySelectorAll('[data-toolload]')).forEach(function(b){ var on = sim.toolload===b.dataset.toolload; b.classList.toggle('on',on); b.setAttribute('aria-pressed',on?'true':'false'); });
      [].slice.call(root.querySelectorAll('[data-safe]')).forEach(function(b){ var on = !!sim.safe[b.dataset.safe]; b.classList.toggle('on',on); b.setAttribute('aria-pressed',on?'true':'false'); });
    }

    var slider = document.getElementById('toolSlider');
    slider.addEventListener('input', function(){ sim.tools = +slider.value; update(); });
    [].slice.call(root.querySelectorAll('[data-rule]')).forEach(function(b){ b.onclick = function(){ sim.rule = b.dataset.rule; update(); }; });
    [].slice.call(root.querySelectorAll('[data-toolload]')).forEach(function(b){ b.onclick = function(){ sim.toolload = b.dataset.toolload; update(); }; });
    [].slice.call(root.querySelectorAll('[data-safe]')).forEach(function(b){ b.onclick = function(){ sim.safe[b.dataset.safe] = !sim.safe[b.dataset.safe]; update(); }; });
    update();
  }

  /* ============================================================
     3 · OPERATING LOOP (L1-L4) + LIMITATIONS & GUARDRAILS (L5)
     Every capability carries a circled unicode number, assigned
     in layer order across all 24.
     ============================================================ */
  var CIRCLED = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','⑪','⑫','⑬','⑭','⑮','⑯','⑰','⑱','⑲','⑳','㉑','㉒','㉓','㉔'];
  var capNum = {};
  (function(){
    var i = 0;
    layers.forEach(function(l){
      caps.filter(function(c){ return c.layerNum===l.num; }).forEach(function(c){ capNum[c.slug] = CIRCLED[i++] || String(i); });
    });
  })();

  function renderLoop(){
    var root = document.getElementById('loopMap');
    root.innerHTML = layers.filter(function(l){ return l.num<5; }).map(function(l){
      var lc = caps.filter(function(c){ return c.layerNum===l.num; });
      return '<article class="loop-layer">'
        + '<div class="loop-top"><span class="loop-num">L'+l.num+' · '+esc(l.name)+'</span><span class="loop-role">'+role[l.num]+'</span></div>'
        + '<h3>'+esc(layerCopy[l.num].q)+'</h3>'
        + '<p>'+esc(layerCopy[l.num].body)+'</p>'
        + '<div class="mini-cap-list">'+lc.map(function(c){
            return '<div class="mini-cap"><button type="button" aria-expanded="false"><span class="info">'+capNum[c.slug]+'</span><span>'+esc(c.name)+'</span></button><div class="mini-def">'+esc(DEF[c.slug])+'</div></div>';
          }).join('')+'</div>'
        + '</article>';
    }).join('');
    [].slice.call(root.querySelectorAll('.mini-cap button')).forEach(function(b){
      b.onclick = function(){ var w=b.parentNode, open=w.classList.toggle('open'); b.setAttribute('aria-expanded', open?'true':'false'); };
    });
    var constraintCaps = caps.filter(function(c){ return c.layerNum===5; });
    document.getElementById('constraintsMap').innerHTML = '<div class="constraints-intro">'
      + '<p class="eyebrow">Cross-cutting overlay</p>'
      + '<h3>Limitations &amp; Guardrails</h3>'
      + '<p>This is not another step in the loop. These constraints shape what the system may do, what it cannot do, and what the builder chooses not to expose. Some protect the operator, and some protect the builder.</p>'
      + '</div><div class="constraints-caps">'+constraintCaps.map(function(c){
        return '<div class="constraint-card"><b><span class="c-num">'+capNum[c.slug]+'</span>'+esc(c.name)+'</b><span>'+esc(DEF[c.slug])+'</span></div>';
      }).join('')+'</div>';
  }

  /* ============================================================
     5 · EXPLORER: filters + capability cards + typed diagrams
     ============================================================ */
  var filters = {harness:null};

  function filterbar(){
    var root = document.getElementById('filterbar');
    root.innerHTML = '<div class="filter-row"><span class="filter-label">Harness</span>'
      + A.harnesses.map(function(h){
          return '<button type="button" class="filter-chip '+(filters.harness===h.key?'on':'')+'" data-harness="'+h.key+'">'+esc(h.name)+'</button>';
        }).join('')
      + '<button type="button" class="filter-clear" id="clearFilters">Clear</button></div>';
    [].slice.call(root.querySelectorAll('[data-harness]')).forEach(function(b){
      b.onclick = function(){ filters.harness = filters.harness===b.dataset.harness ? null : b.dataset.harness; renderAtlas(); };
    });
    root.querySelector('#clearFilters').onclick = function(){ filters={harness:null}; renderAtlas(); };
  }
  function vendorChips(used, h){
    return used.length ? '<div class="vendor-list">'+used.map(function(k){ return '<span class="vendor '+(h===k?'selected':'')+'">'+esc(harnessNames[k]||k)+'</span>'; }).join('')+'</div>' : '';
  }
  function laneHTML(fam){
    var h = filters.harness, nodes = fam.nodes||[];
    var label = (fam.label||'').replace(/^Family [A-Z]\s*·\s*/i,'');
    /* one-member families render as a compact row; the full track is reserved for real lineages */
    if(nodes.length===1){
      var nd = nodes[0], used = nd.usedBy||[], match = h && used.indexOf(h)>=0, dim = h && !match;
      return '<div class="lane solo'+(match?' match':'')+(dim?' dim':'')+'">'
        + '<div class="solo-left"><span class="lane-title">'+esc(label)+'</span><span class="lane-bet">'+esc(fam.bet)+'</span></div>'
        + '<div class="solo-right"><b>'+esc(nd.name)+'</b><p>'+esc(nd.desc)+'</p>'+vendorChips(used,h)+'</div>'
        + '</div>';
    }
    return '<div class="lane"><div class="lane-head"><span class="lane-title">'+esc(label)+'</span><span class="lane-bet">'+esc(fam.bet)+'</span></div>'
      + '<div class="lane-track">'+nodes.map(function(nd,i){
          var used = nd.usedBy||[], match = h && used.indexOf(h)>=0, dim = h && !match;
          return (i ? '<span class="lane-arrow">'+(/builds/i.test(nd.rel||'')?'→':'·')+'</span>' : '')
            + '<div class="lane-node '+(match?'match ':'')+(dim?'dim':'')+'"><b>'+esc(nd.name)+'</b><p>'+esc(nd.desc)+'</p>'
            + vendorChips(used,h)
            + '</div>';
        }).join('')+'</div></div>';
  }
  function cardHTML(c){
    var h = filters.harness, match = h && !!capUses[c.slug][h];
    var dtype = DIAGRAM[c.slug] || 'Alternatives';
    return '<article class="cap-card '+(match?'highlight':'')+'" data-cap="'+esc(c.slug)+'">'
      + '<button type="button" class="cap-head" aria-expanded="false"><span>'
        + '<span class="cap-title">'+esc(c.name)+'</span>'
        + '<span class="cap-desc">'+esc(DEF[c.slug])+'</span>'
        + '<span class="cap-meta">'
          + '<span class="meta-pill fate-pill '+c.fate+'">'+fdot(c.fate)+esc(fateNames[c.fate])+'</span>'
          + '<span class="meta-pill kind-pill" title="'+esc(DIAGRAM_NOTE[dtype])+'">'+esc(dtype)+'</span>'
        + '</span>'
      + '</span><span class="cap-chevron">+</span></button>'
      + '<div class="cap-body">'
        + '<div class="lane-list">'+(c.families||[]).map(laneHTML).join('')+'</div>'
        + '<div class="cap-footer"><small>'+esc((c.incidents||[]).length+' documented incidents'+(c.thinSpot?' · caveats noted':''))+'</small>'
        + '<a class="deep-dive-link" href="capability-deep-dives.html#/cap/'+esc(c.slug)+'">Deep Dive →</a></div>'
      + '</div></article>';
  }
  /* ---- desktop stage: Model → layer spine → capability tabs → detail panel.
          The card grid below remains the rendering for narrow screens. ---- */
  var capBySlug = {};
  caps.forEach(function(c){ capBySlug[c.slug] = c; });
  function firstCapOf(layerNum){ var c = caps.filter(function(x){ return x.layerNum===layerNum; })[0]; return c && c.slug; }
  var sel = {layer:1, cap:firstCapOf(1)};

  /* Harness matching derives from the approach nodes' usedBy lists — the same
     source the visible vendor chips render from — so a highlighted tab always
     contains at least one visibly matching approach. */
  var capUses = {};
  caps.forEach(function(c){
    var s = {};
    (c.families||[]).forEach(function(f){ (f.nodes||[]).forEach(function(nd){ (nd.usedBy||[]).forEach(function(k){ s[k]=1; }); }); });
    capUses[c.slug] = s;
  });
  function capMatches(c){
    return !filters.harness || !!capUses[c.slug][filters.harness];
  }
  /* Option B: tabs rename only the names that wrap; panels keep full names */
  var TAB_NAME = {
    'reasoning-effort-allocation':'Reasoning Effort',
    'permission-and-irreversibility':'Permissions',
    'state-persistence-and-ownership':'State Persistence',
    'observability-and-offline-evaluation':'Observability'
  };

  function stagePanelHTML(c){
    var dtype = DIAGRAM[c.slug] || 'Alternatives';
    return '<div class="panel-head">'
      + '<h4>'+esc(c.name)+'</h4>'
      + '<span class="cap-meta">'
        + '<span class="meta-pill fate-pill '+c.fate+'">'+fdot(c.fate)+esc(fateNames[c.fate])+'</span>'
        + '<span class="meta-pill kind-pill" title="'+esc(DIAGRAM_NOTE[dtype])+'">'+esc(dtype)+'</span>'
        + '<a class="deep-dive-link" href="capability-deep-dives.html#/cap/'+esc(c.slug)+'">Deep Dive →</a>'
      + '</span></div>'
      + '<p class="panel-def">'+esc(DEF[c.slug])+'</p>'
      + '<div class="lane-list">'+(c.families||[]).map(laneHTML).join('')+'</div>';
  }

  /* Figma-style connectors: SVG paths with rounded elbows and arrowheads,
     measured from the rendered buttons so alignment is exact by construction. */
  function drawSpine(root){
    var spine = root.querySelector('.stage-spine'); if(!spine) return;
    var model = spine.querySelector('.spine-model');
    var btns = [].slice.call(spine.querySelectorAll('.spine-layer'));
    if(!model || !btns.length) return;
    var s = spine.getBoundingClientRect();
    if(s.width < 10) return; /* collapsed details — nothing to measure */
    var m = model.getBoundingClientRect();
    var mx = m.right - s.left, my = m.top + m.height/2 - s.top;
    var ah = 6, parts = '';
    btns.forEach(function(b){
      var r = b.getBoundingClientRect();
      var bx = r.left - s.left, by = r.top + r.height/2 - s.top;
      var on = (+b.dataset.layer === sel.layer);
      var col = on ? 'var(--live)' : 'var(--hl-strong)';
      var op = on ? '1' : '.5';
      var dy = by - my, d;
      if(Math.abs(dy) < 4){
        d = 'M '+mx+' '+my+' H '+(bx-ah);
      } else {
        var dir = dy>0 ? 1 : -1, tx = mx + (bx-mx)/2;
        var rr = Math.min(10, Math.abs(dy)/2);
        d = 'M '+mx+' '+my+' H '+(tx-rr)
          + ' Q '+tx+' '+my+' '+tx+' '+(my+rr*dir)
          + ' V '+(by-rr*dir)
          + ' Q '+tx+' '+by+' '+(tx+rr)+' '+by
          + ' H '+(bx-ah);
      }
      parts += '<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="1.5" stroke-linecap="round" opacity="'+op+'"/>'
            +  '<path d="M '+bx+' '+by+' l -'+ah+' -3.4 v 6.8 z" fill="'+col+'" opacity="'+op+'"/>';
    });
    spine.insertAdjacentHTML('beforeend',
      '<svg class="spine-svg" width="'+Math.ceil(s.width)+'" height="'+Math.ceil(s.height)+'" viewBox="0 0 '+Math.ceil(s.width)+' '+Math.ceil(s.height)+'" aria-hidden="true">'+parts+'</svg>');
  }

  function renderStage(){
    var root = document.getElementById('atlasStage');
    if(!root) return;
    if(!capBySlug[sel.cap] || capBySlug[sel.cap].layerNum!==sel.layer) sel.cap = firstCapOf(sel.layer);
    var cur = capBySlug[sel.cap];
    var lcs = caps.filter(function(c){ return c.layerNum===sel.layer; });
    var filtering = !!filters.harness;
    root.innerHTML = '<div class="stage-spine">'
      + '<div class="spine-model">Model<span>core</span></div>'
      + '<div class="spine-layers">'+layers.map(function(l){
          var n = caps.filter(function(c){ return c.layerNum===l.num && capMatches(c); }).length;
          return '<button type="button" class="spine-layer'+(l.num===sel.layer?' sel':'')+'" data-layer="'+l.num+'" aria-pressed="'+(l.num===sel.layer?'true':'false')+'">'
            + '<b>L'+l.num+' · '+esc(l.name)+'</b>'
            + (filtering ? '<span class="spine-count">'+n+'</span>' : '')
            + '</button>';
        }).join('')+'</div></div>'
      + '<div class="stage-main">'
        + '<div class="cap-tabs">'+lcs.map(function(c){
            var dim = filtering && !capMatches(c);
            return '<button type="button" class="cap-tab'+(c.slug===sel.cap?' sel':'')+(dim?' dim':'')+'" data-tab="'+esc(c.slug)+'" aria-pressed="'+(c.slug===sel.cap?'true':'false')+'">'+esc(TAB_NAME[c.slug]||c.name)+'</button>';
          }).join('')+'</div>'
        + '<div class="cap-panel">'+(cur ? stagePanelHTML(cur) : '')+'</div>'
      + '</div>';
    [].slice.call(root.querySelectorAll('[data-layer]')).forEach(function(b){
      b.onclick = function(){ sel.layer = +b.dataset.layer; sel.cap = firstCapOf(sel.layer); renderStage(); };
    });
    [].slice.call(root.querySelectorAll('[data-tab]')).forEach(function(b){
      b.onclick = function(){ sel.cap = b.dataset.tab; renderStage(); };
    });
    drawSpine(root);
  }
  /* connector geometry depends on layout: redraw on resize, font load, and expand */
  (function(){
    var t;
    function redraw(){ clearTimeout(t); t = setTimeout(renderStage, 120); }
    window.addEventListener('resize', redraw);
    window.addEventListener('load', redraw);
    var det = document.getElementById('atlasExplorer');
    if(det) det.addEventListener('toggle', redraw);
  })();

  function renderAtlas(){
    filterbar();
    renderStage();
    var shown = 0;
    var root = document.getElementById('capabilityAtlas');
    root.innerHTML = layers.map(function(l){
      var cs = caps.filter(function(c){ return c.layerNum===l.num; }).filter(capMatches);
      shown += cs.length;
      if(!cs.length) return '';
      var q = l.num===5 ? 'Cross-cutting constraints and incentives' : (layerCopy[l.num] ? layerCopy[l.num].q : l.q);
      return '<section class="atlas-layer"><div class="atlas-layer-head"><span>L'+l.num+'</span><h3>'+esc(l.name)+'</h3><p>'+esc(q)+'</p></div>'
        + '<div class="cap-grid">'+cs.map(cardHTML).join('')+'</div></section>';
    }).join('');
    var fr = document.getElementById('filterResult'), filtering = !!filters.harness;
    fr.style.display = filtering ? '' : 'none';
    fr.textContent = filtering
      ? (filters.harness ? harnessNames[filters.harness]+' · ' : '')+shown+' of '+caps.length+' capabilities match. Dimmed entries are outside the current filter.'
      : '';
    [].slice.call(root.querySelectorAll('.cap-head')).forEach(function(b){
      b.onclick = function(){ var card=b.parentNode, open=card.classList.toggle('open'); b.setAttribute('aria-expanded', open?'true':'false'); };
    });
  }

  /* ---- hamburger menu (mobile) — mirrors tour-engine.js ---- */
  (function(){
    var b = document.getElementById('menuBtn'), m = document.querySelector('.mast');
    if(!b || !m) return;
    b.addEventListener('click', function(){ var o = m.classList.toggle('menu-open'); b.setAttribute('aria-expanded', o?'true':'false'); });
    [].slice.call(m.querySelectorAll('nav a')).forEach(function(a){ a.addEventListener('click', function(){ m.classList.remove('menu-open'); }); });
  })();

  /* ---- theme toggle (site convention: shared key + html attr) ---- */
  (function(){
    var btn = document.getElementById('themeBtn'), root = document.documentElement;
    function set(t){ root.setAttribute('data-theme', t); if(btn) btn.textContent = t==='dark'?'◐ Light':'◑ Dark'; }
    try{ var s = localStorage.getItem('atlas-theme'); if(s) set(s); }catch(e){}
    if(btn) btn.addEventListener('click', function(){ var n = root.getAttribute('data-theme')==='dark'?'light':'dark'; set(n); try{ localStorage.setItem('atlas-theme', n); }catch(e){} });
  })();

  renderScenario();
  renderLoop();
  renderAtlas();
})();
