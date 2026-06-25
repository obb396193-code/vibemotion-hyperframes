/* ============================================================================
   Transformer Attention · 60s · HyperFrames composition
   Driven by paused GSAP timeline registered on window.__timelines["main"]
   ============================================================================ */

(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";

  // ─── helpers ───────────────────────────────────────────────────────────────
  function buildLine(svg, x1, y1, x2, y2, attrs) {
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", x1); line.setAttribute("y1", y1);
    line.setAttribute("x2", x2); line.setAttribute("y2", y2);
    if (attrs) for (const k in attrs) line.setAttribute(k, attrs[k]);
    const len = Math.hypot(x2 - x1, y2 - y1);
    line.setAttribute("stroke-dasharray", len);
    line.setAttribute("stroke-dashoffset", len);
    svg.appendChild(line);
    return line;
  }

  // =========================================================================
  // SVG edge geometry — built up front
  // =========================================================================

  // ─── S4: 6 nodes fully connected ─────────────────────────────────────────
  const S4_NODES = [
    [500,  80], [880, 300], [880, 700],
    [500, 920], [120, 700], [120, 300]
  ];
  const s4Svg = document.getElementById("s4-edges");
  const s4LineRefs = [];
  for (let i = 0; i < S4_NODES.length; i++) {
    for (let j = i + 1; j < S4_NODES.length; j++) {
      s4LineRefs.push(buildLine(s4Svg,
        S4_NODES[i][0], S4_NODES[i][1],
        S4_NODES[j][0], S4_NODES[j][1]));
    }
  }

  // ─── S5: it (center) → 4 surrounding tokens ──────────────────────────────
  const S5_CENTER = [500, 550];
  const S5_TARGETS = [
    { pos: [500, 110], pct: 72, label: "s5-p-a", color: "#CC785C", weight: 7 },  // 猫
    { pos: [880, 660], pct: 14, label: "s5-p-b", color: "#A89484", weight: 3 },  // 垫子
    { pos: [500, 990], pct:  9, label: "s5-p-c", color: "#8B7E72", weight: 2 },  // 累了
    { pos: [120, 660], pct:  5, label: "s5-p-d", color: "#776B61", weight: 2 }   // 坐
  ];
  const s5Svg = document.getElementById("s5-edges");
  const s5LineRefs = S5_TARGETS.map(t => buildLine(s5Svg,
    S5_CENTER[0], S5_CENTER[1], t.pos[0], t.pos[1], {
      stroke: t.color, "stroke-width": t.weight, opacity: "0.9"
    }));

  // ─── S6: 4 attention heads with different patterns ───────────────────────
  const S6_NODES = {
    cat:   [500, 108], sit:   [850, 315], mat:   [850, 612],
    bec:   [500, 792], it:    [150, 612], tired: [150, 315]
  };
  const S6_PATTERNS = {
    "s6-h1": [["cat","sit"], ["sit","mat"], ["mat","bec"], ["bec","it"], ["it","tired"]],
    "s6-h2": [["it","cat"],  ["it","tired"], ["it","mat"]],
    "s6-h3": [["cat","tired"], ["sit","bec"], ["mat","it"]],
    "s6-h4": [["cat","mat"], ["sit","mat"],   ["tired","it"], ["bec","mat"]]
  };
  const s6LineRefs = {};
  for (const groupId in S6_PATTERNS) {
    const g = document.getElementById(groupId);
    s6LineRefs[groupId] = S6_PATTERNS[groupId].map(p => buildLine(g,
      S6_NODES[p[0]][0], S6_NODES[p[0]][1],
      S6_NODES[p[1]][0], S6_NODES[p[1]][1]));
  }

  // =========================================================================
  // MAIN TIMELINE
  // =========================================================================
  const tl = gsap.timeline({ paused: true });

  // ── Scene visibility scaffolding ─────────────────────────────────────────
  // Anchor scenes (S1, S2, S6, S7) — opacity:0 in HTML, shader manages during transition
  tl.set("#s1", { opacity: 1 }, 0);
  tl.set("#s2", { opacity: 1 }, 5);
  tl.set("#s2", { opacity: 0 }, 12);
  tl.set("#s6", { opacity: 1 }, 37);
  tl.set("#s7", { opacity: 1 }, 45);
  tl.set("#s7", { opacity: 0 }, 52);

  // Non-anchor scenes (S3, S4, S5, S8, S9) — visibility:hidden in HTML
  tl.set("#s3", { autoAlpha: 1 }, 12);  tl.set("#s3", { autoAlpha: 0 }, 19);
  tl.set("#s4", { autoAlpha: 1 }, 19);  tl.set("#s4", { autoAlpha: 0 }, 28);
  tl.set("#s5", { autoAlpha: 1 }, 28);  tl.set("#s5", { autoAlpha: 0 }, 37);
  tl.set("#s8", { autoAlpha: 1 }, 52);  tl.set("#s8", { autoAlpha: 0 }, 57);
  tl.set("#s9", { autoAlpha: 1 }, 57);

  // ── S1 · 0-5s · 钩子 ─────────────────────────────────────────────────────
  tl.from("#s1-eyebrow", { y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, 0.2);
  tl.from("#s1-line1 .char", {
    y: 80, autoAlpha: 0, duration: 0.55, ease: "back.out(1.4)",
    stagger: { each: 0.06, from: "start" }
  }, 0.6);
  tl.from("#s1-line2", { y: 40, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 1.8);
  // mid-scene breathing
  tl.to("#s1-orb-a", { scale: 1.18, duration: 2.0, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.5);
  tl.to("#s1-orb-b", { scale: 1.12, duration: 1.7, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.0);
  tl.to("#s1-eyebrow", { letterSpacing: "0.42em", duration: 2.8, ease: "sine.inOut" }, 1.0);

  // ── S2 · 5-12s · 例句 + 它高亮 ──────────────────────────────────────────
  tl.from("#s2-eyebrow", { y: 20, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 5.4);
  ["#s2-t1","#s2-t2","#s2-t3","#s2-t4","#s2-t5","#s2-t6","#s2-t7"].forEach((sel, i) => {
    tl.from(sel, { y: -60, autoAlpha: 0, duration: 0.45, ease: "back.out(1.6)" }, 5.7 + i * 0.1);
  });
  // it highlight pulse (its 'hot' class baseline → amplify glow)
  tl.fromTo("#s2-t6",
    { boxShadow: "0 0 30px rgba(204,120,92,0.30)" },
    { boxShadow: "0 0 90px rgba(204,120,92,0.85)", duration: 0.75, ease: "sine.inOut", yoyo: true, repeat: 3 },
    7.6
  );
  tl.from("#s2-q", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 8.6);
  tl.to("#s2-q strong", { scale: 1.08, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: 2, transformOrigin: "center" }, 9.4);

  // ── S3 · 12-19s · 旧 RNN ────────────────────────────────────────────────
  tl.from("#s3-eyebrow", { y: 20, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 12.3);
  const s3Items = ["#s3-w1","#s3-a1","#s3-w2","#s3-a2","#s3-w3","#s3-a3","#s3-w4","#s3-a4","#s3-w5"];
  s3Items.forEach((sel, i) => {
    tl.from(sel, { autoAlpha: 0, scale: 0.7, duration: 0.32, ease: "power3.out" }, 12.6 + i * 0.17);
  });
  // earlier words decay (memory loss metaphor)
  tl.to(["#s3-w1","#s3-w2","#s3-w3"], { opacity: 0.22, duration: 1.1, ease: "power2.inOut" }, 15.8);
  tl.to("#s3-w4", { opacity: 0.4, duration: 1.1, ease: "power2.inOut" }, 15.8);
  // 它 pulse
  tl.to("#s3-w5", { scale: 1.1, duration: 0.55, ease: "sine.inOut", yoyo: true, repeat: 2, transformOrigin: "center" }, 15.6);
  // note
  tl.from("#s3-note", { y: 30, autoAlpha: 0, duration: 0.65, ease: "power3.out" }, 16.6);

  // ── S4 · 19-28s · Transformer 全连接 ────────────────────────────────────
  tl.from("#s4-eyebrow", { y: 20, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 19.3);
  const s4Tokens = ["#s4-n1","#s4-n2","#s4-n3","#s4-n4","#s4-n5","#s4-n6"];
  s4Tokens.forEach((sel, i) => {
    tl.from(sel, { scale: 0.4, autoAlpha: 0, duration: 0.5, ease: "back.out(1.6)" }, 19.7 + i * 0.1);
  });
  // edges fan out
  s4LineRefs.forEach((line, i) => {
    tl.to(line, { strokeDashoffset: 0, duration: 1.1, ease: "power2.out" }, 21.0 + (i % 5) * 0.08);
  });
  // orb breathing
  tl.to("#s4-orb", { scale: 1.1, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, 21.0);
  // caption
  tl.from("#s4-cap", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 24.6);
  // gentle stage rotation — keeps the network feeling alive
  tl.to("#s4-stage", { rotation: 6, duration: 3.0, ease: "sine.inOut", transformOrigin: "center" }, 24.5);

  // ── S5 · 28-37s · Attention weights ─────────────────────────────────────
  tl.from("#s5-eyebrow", { y: 20, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 28.3);
  tl.from("#s5-center", { scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "back.out(1.6)" }, 28.7);
  ["#s5-a","#s5-b","#s5-c","#s5-d"].forEach((sel, i) => {
    tl.from(sel, { scale: 0.5, autoAlpha: 0, duration: 0.4, ease: "back.out(1.5)" }, 29.2 + i * 0.1);
  });
  tl.to("#s5-center", { boxShadow: "0 0 80px rgba(204,120,92,0.85)", duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 4 }, 29.8);
  // edges + counters
  s5LineRefs.forEach((line, i) => {
    tl.to(line, { strokeDashoffset: 0, duration: 1.0, ease: "power3.out" }, 30.2 + i * 0.18);
  });
  S5_TARGETS.forEach((t, i) => {
    const counterObj = { v: 0 };
    const startT = 30.9 + i * 0.18;
    const dur = 1.2;
    tl.to(counterObj, {
      v: t.pct, duration: dur, ease: "power2.out",
      onStart:    function () { document.getElementById(t.label).textContent = "0%"; },
      onUpdate:   function () { document.getElementById(t.label).textContent = Math.round(counterObj.v) + "%"; },
      onComplete: function () { document.getElementById(t.label).textContent = t.pct + "%"; },
      onReverseComplete: function () { document.getElementById(t.label).textContent = "0%"; }
    }, startT);
    // Belt-and-braces: explicit text marker for frame-accurate seek
    tl.call(function () { document.getElementById(t.label).textContent = t.pct + "%"; }, null, startT + dur + 0.01);
    tl.from("#" + t.label, { autoAlpha: 0, scale: 0.7, duration: 0.4, ease: "back.out(1.5)" }, startT - 0.1);
  });
  // emphasize the dominant weight
  tl.to("#s5-p-a", { scale: 1.18, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 3, transformOrigin: "center" }, 33.4);
  tl.from("#s5-cap", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 34.4);

  // ── S6 · 37-45s · Multi-head ────────────────────────────────────────────
  tl.from("#s6-eyebrow", { y: 20, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 37.3);
  tl.from("#s6-line",    { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 37.6);
  ["#s6-t1","#s6-t2","#s6-t3","#s6-t4","#s6-t5","#s6-t6"].forEach((sel, i) => {
    tl.from(sel, { scale: 0.5, autoAlpha: 0, duration: 0.4, ease: "back.out(1.4)" }, 38.3 + i * 0.05);
  });

  const heads = [
    { group: "#s6-h1", badge: "#s6-b1", start: 39.0 },
    { group: "#s6-h2", badge: "#s6-b2", start: 40.1 },
    { group: "#s6-h3", badge: "#s6-b3", start: 41.2 },
    { group: "#s6-h4", badge: "#s6-b4", start: 42.3 }
  ];
  heads.forEach((h, idx) => {
    if (idx > 0) {
      tl.to(heads[idx-1].group, { opacity: 0.18, duration: 0.3, ease: "power2.out" }, h.start - 0.05);
      tl.to(heads[idx-1].badge, { autoAlpha: 0, duration: 0.2, ease: "power2.out" }, h.start - 0.1);
    }
    tl.to(h.group, { opacity: 0.95, duration: 0.4, ease: "power2.out" }, h.start);
    tl.from(h.badge, { y: -15, autoAlpha: 0, duration: 0.35, ease: "power2.out" }, h.start);
    s6LineRefs[h.group.slice(1)].forEach((line, i) => {
      tl.to(line, { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" }, h.start + 0.1 + i * 0.06);
    });
  });
  // finale — all heads layered
  tl.to(["#s6-h1","#s6-h2","#s6-h3","#s6-h4"], { opacity: 0.6, duration: 0.5, ease: "power2.out" }, 43.4);
  tl.to(heads[3].badge, { autoAlpha: 0, duration: 0.3 }, 43.5);

  // ── S7 · 45-52s · 升华 ──────────────────────────────────────────────────
  gsap.utils.toArray("#s7-bg .s7-bg-word").forEach((el, i) => {
    tl.from(el, { autoAlpha: 0, y: 20, duration: 1.4, ease: "power1.out" }, 45.2 + (i % 4) * 0.15);
    tl.to(el, { y: "+=18", duration: 3.0, ease: "sine.inOut", yoyo: true, repeat: 1 }, 45.6 + (i % 4) * 0.3);
  });
  tl.from("#s7-l1", { y: 40, autoAlpha: 0, duration: 0.9, ease: "expo.out" }, 46.0);
  tl.from("#s7-l2", { y: 60, autoAlpha: 0, duration: 1.1, ease: "expo.out" }, 47.0);
  // highlight sweep on .h via inline gradient backgroundSize
  gsap.set("#s7-l2 .h", {
    backgroundImage: "linear-gradient(rgba(204,120,92,0.20), rgba(204,120,92,0.20))",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 85%",
    backgroundSize: "0% 30%"
  });
  tl.to("#s7-l2 .h", { backgroundSize: "100% 30%", duration: 0.9, ease: "power2.out" }, 48.4);
  tl.to(".s7-main",  { scale: 1.02, duration: 2.2, ease: "sine.inOut" }, 49.5);

  // ── S8 · 52-57s · READ vs SEE ──────────────────────────────────────────
  tl.from("#s8-eyebrow", { y: 20, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 52.2);
  tl.from("#s8-col-l",   { x: -80, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 52.6);
  tl.from("#s8-div",     { scaleY: 0, autoAlpha: 0, duration: 0.6, ease: "power3.out", transformOrigin: "center" }, 53.0);
  tl.from("#s8-col-r",   { x: 80, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 53.2);
  tl.to("#s8-see",  { textShadow: "0 0 80px rgba(204,120,92,0.95)", duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 3 }, 54.0);
  tl.to("#s8-read", { opacity: 0.42, duration: 1.5, ease: "power2.inOut" }, 54.5);

  // ── S9 · 57-60s · Slogan + handle ──────────────────────────────────────
  tl.to("#s9-orb",    { scale: 1.18, duration: 2.5, ease: "sine.inOut" }, 57.0);
  tl.from("#s9-slogan", { y: 40, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, 57.2);
  tl.from("#s9-name", { y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, 58.4);
  tl.from("#s9-tag",  { y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, 58.7);
  tl.to("#s9-slogan em", { scale: 1.06, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: 1, transformOrigin: "center" }, 58.0);

  // ─── register on window for HyperFrames ───────────────────────────────
  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;

  // ─── Fallback autoplay (when not under HyperFrames player) ─────────────
  // The player normally drives playback; this lets us preview in plain browser.
  if (!window.__hyperframes_host) {
    // Auto-scale the 1080×1920 root to fit viewport (preview only)
    function fitToViewport() {
      const root = document.getElementById("root");
      if (!root) return;
      const sx = window.innerWidth  / 1080;
      const sy = window.innerHeight / 1920;
      const s  = Math.min(sx, sy, 1);
      root.style.transform = "scale(" + s + ")";
    }
    window.addEventListener("resize", fitToViewport);
    fitToViewport();

    window.addEventListener("load", function () {
      fitToViewport();
      setTimeout(function () { tl.play(0); }, 250);
    });
    if (document.readyState === "complete") {
      setTimeout(function () { tl.play(0); }, 250);
    }
  }
})();
