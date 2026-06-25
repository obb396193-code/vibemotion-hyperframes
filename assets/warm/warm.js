/* Claude 暖色主题 · warm.js  —— 与 warm.css 配套的轻量助手 */
window.WarmKit = (function(){
  function el(cls){ var d=document.createElement('div'); d.className=cls; return d; }

  // 注入颗粒 + 暗角到一个 .scene；orbs = [{x,y,size,color?,op?}] 可选暖橙光球
  function mountBG(scene, orbs){
    (orbs||[]).forEach(function(o){
      var a=el('orb');
      a.style.width=a.style.height=(o.size||520)+'px';
      a.style.left=(o.x!=null?o.x+'px':''); a.style.top=(o.y!=null?o.y+'px':'');
      a.style.right=(o.right!=null?o.right+'px':''); a.style.bottom=(o.bottom!=null?o.bottom+'px':'');
      if(o.color) a.style.background='radial-gradient(circle,'+o.color+',transparent 70%)';
      if(o.op!=null) a.style.opacity=o.op;
      scene.insertBefore(a, scene.firstChild);
    });
    scene.appendChild(el('grain'));
  }

  // fromTo 快捷（默认暖系常用 ease）
  function F(tl,s,a,b,t){ b.ease=b.ease||'power3.out'; tl.fromTo(s,a,b,t); }

  // 字符级 stagger 入场（钩子标题用）：把元素文字拆成 span 再逐字升起
  function charIn(tl, sel, t, opt){
    opt=opt||{};
    document.querySelectorAll(sel).forEach(function(node){
      var txt=node.textContent; node.textContent='';
      txt.split('').forEach(function(ch){
        var s=document.createElement('span'); s.style.display='inline-block';
        s.textContent=(ch===' '?' ':ch); node.appendChild(s);
      });
      tl.fromTo(node.children,{y:opt.y||80,autoAlpha:0},{y:0,autoAlpha:1,duration:opt.duration||0.55,
        ease:opt.ease||'back.out(1.4)',stagger:opt.stagger||0.04}, t);
    });
  }
  return {mountBG:mountBG, F:F, charIn:charIn};
})();
