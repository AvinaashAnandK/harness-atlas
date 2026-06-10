/* ============================================================
   FIRST VISIT — a one-time orientation card for visitors who
   land on the Atlas or the Timeline without taking the Tour.
   Shown once per surface, dismissed forever via localStorage.
   Self-contained: injects its own styles, uses the site's
   CSS variables, respects the active theme.
   ============================================================ */
(function(){
  'use strict';

  var surface = document.body.getAttribute('data-surface') || 'atlas';
  var KEY = 'atlas-intro-seen-' + surface;
  try{ if(localStorage.getItem(KEY)) return; }catch(e){ return; }

  var COPY = {
    atlas: {
      ek: 'First time here?',
      h: 'One question organizes everything in this atlas: when this thing fails, does anything announce it?',
      body: 'Every capability page holds the question the agent cannot answer alone, the real cited failures that force it, the families of approaches that answer it, and its fate:',
      foot: 'The seven-minute tour builds this lens from two real incidents.'
    },
    timeline: {
      ek: 'First time here?',
      h: 'This is the research provenance: every dated source the atlas is built on.',
      body: 'Release notes, papers, news reports, and incidents, each mapped to the capability it informed. The colors are fates, the atlas’s organizing lens:',
      foot: 'The lens comes from the seven-minute tour, built from two real incidents.'
    }
  };
  var c = COPY[surface] || COPY.atlas;

  var css = [
    '.fv-back{position:fixed;inset:0;z-index:200;background:color-mix(in srgb,var(--bg) 62%,transparent);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px}',
    '.fv-card{max-width:480px;width:100%;border:1.5px solid var(--line-2);border-radius:var(--r-lg);background:var(--bg-raised);padding:26px 26px 22px;box-shadow:0 18px 60px rgba(0,0,0,.25)}',
    '.fv-ek{font-family:var(--mono);font-weight:700;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--live);display:block;margin-bottom:12px}',
    '.fv-h{font-weight:600;font-size:1.18rem;line-height:1.38;letter-spacing:-.015em;color:var(--ink);margin:0 0 12px}',
    '.fv-body{font-size:.9rem;line-height:1.55;color:var(--ink-2);margin:0 0 12px}',
    '.fv-fates{display:flex;flex-direction:column;gap:7px;margin:0 0 14px}',
    '.fv-fate{display:flex;align-items:center;gap:9px;font-size:.82rem;color:var(--ink-2)}',
    '.fv-fate .fdot{flex:none}',
    '.fv-foot{font-size:.82rem;color:var(--ink-3);margin:0 0 18px}',
    '.fv-btns{display:flex;gap:10px;flex-wrap:wrap}',
    '.fv-btn{font-family:var(--mono);font-weight:700;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;padding:11px 16px;border-radius:var(--r-pill);cursor:pointer;border:1px solid var(--live-bd);text-decoration:none}',
    '.fv-btn.go{background:var(--live);border-color:var(--live);color:#fff}',
    '.fv-btn.go:hover{opacity:.92;text-decoration:none}',
    '.fv-btn.skip{background:var(--bg-sunken);border-color:var(--line-2);color:var(--ink-2)}',
    '.fv-btn.skip:hover{color:var(--ink)}',
    '@media (max-width:560px){.fv-card{padding:20px 18px 16px}}'
  ].join('\n');

  function dismiss(){
    try{ localStorage.setItem(KEY, '1'); }catch(e){}
    var b = document.getElementById('fvBack');
    if(b && b.parentNode) b.parentNode.removeChild(b);
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e){ if(e.key === 'Escape') dismiss(); }

  function show(){
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var back = document.createElement('div');
    back.className = 'fv-back'; back.id = 'fvBack';
    back.setAttribute('role', 'dialog');
    back.setAttribute('aria-modal', 'true');
    back.setAttribute('aria-label', 'Orientation');
    back.innerHTML =
      '<div class="fv-card">' +
        '<span class="fv-ek">' + c.ek + '</span>' +
        '<p class="fv-h">' + c.h + '</p>' +
        '<p class="fv-body">' + c.body + '</p>' +
        '<div class="fv-fates">' +
          '<span class="fv-fate"><span class="fdot compound"></span><span><b>Compounds</b> &middot; a silent failure, caught and encoded. Can become the moat.</span></span>' +
          '<span class="fv-fate"><span class="fdot fade"></span><span><b>Fades</b> &middot; a loud failure the next model absorbs. Build it lightly.</span></span>' +
          '<span class="fv-fate"><span class="fdot protect"></span><span><b>Protects the builder</b> &middot; raised for the agent-building team’s own reasons, not yours.</span></span>' +
        '</div>' +
        '<p class="fv-foot">' + c.foot + '</p>' +
        '<div class="fv-btns">' +
          '<a class="fv-btn go" href="01-the-tour.html" id="fvGo">Take the 7-minute tour</a>' +
          '<button class="fv-btn skip" id="fvSkip" type="button">Skip, just browse</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(back);

    document.getElementById('fvSkip').addEventListener('click', dismiss);
    document.getElementById('fvGo').addEventListener('click', function(){
      try{ localStorage.setItem(KEY, '1'); }catch(e){}
    });
    back.addEventListener('click', function(e){ if(e.target === back) dismiss(); });
    document.addEventListener('keydown', onKey);
  }

  if(document.readyState !== 'loading') show();
  else document.addEventListener('DOMContentLoaded', show);
})();
