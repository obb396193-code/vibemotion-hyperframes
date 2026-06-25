/* 高级包装套件 · kit.js  —— 与 kit.css 配套的可复用助手 */
window.PremKit = (function(){
  function el(cls){ var d=document.createElement('div'); d.className=cls; return d; }

  // 注入背景层（极光×3 + 光带 + 编织 + 扫描 + 暗角）到 .prem 舞台
  function mountBG(scene){
    var defs=[['k-aurora','au1',{width:880,height:880,left:-160,top:-280,bg:'#7a4cff',op:.5}],
              ['k-aurora','au2',{width:800,height:800,right:-180,bottom:-220,bg:'#5a2cc0',op:.5}],
              ['k-aurora','au3',{width:520,height:520,left:'42%',top:'4%',bg:'#9a6cff',op:.32}]];
    defs.forEach(function(d){var a=el(d[0]);a.id=d[1];var s=d[2];
      ['width','height','left','top','right','bottom'].forEach(function(k){ if(s[k]!=null) a.style[k]=(typeof s[k]==='number'?s[k]+'px':s[k]); });
      a.style.background=s.bg; a.style.opacity=s.op; scene.insertBefore(a, scene.firstChild);});
    scene.appendChild(el('k-streak'));
    scene.appendChild(el('k-weave'));
    scene.appendChild(el('k-scan'));
    scene.appendChild(el('k-vig'));
  }

  // 把一个 .chrome 元素变成 4 层镀铬（ghost撑尺寸 / back深度 / edge描边 / front金属面）
  function chrome(node){
    var txt=node.getAttribute('data-text')||node.textContent; node.textContent='';
    var ghost=document.createElement('span'); ghost.className='ghost'; ghost.textContent=txt; node.appendChild(ghost);
    ['back','edge','front'].forEach(function(c){var s=document.createElement('span');s.className='lyr '+c;s.textContent=txt;node.appendChild(s);});
  }
  function chromeAll(){ Array.prototype.forEach.call(document.querySelectorAll('.chrome'), chrome); }

  // 给时间轴加背景漂移（确定性 yoyo）
  function bgDrift(tl, dur){ dur=dur||4.4;
    tl.to('#au1',{x:70,y:46,duration:dur,ease:'sine.inOut',yoyo:true,repeat:1},0);
    tl.to('#au2',{x:-60,y:-36,duration:dur,ease:'sine.inOut',yoyo:true,repeat:1},0);
    tl.to('#au3',{x:36,y:-26,duration:dur,ease:'sine.inOut',yoyo:true,repeat:1},0);
  }

  // 镀铬标题入场（缩放+去模糊）+ 镜面扫光 + 呼吸辉光
  function chromeIn(tl, sel, t){ t=t||0.25;
    tl.fromTo(sel,{autoAlpha:0,scale:0.84,filter:'blur(10px)'},{autoAlpha:1,scale:1,filter:'blur(0px)',duration:0.85,ease:'expo.out'},t);
    // 呼吸辉光（静态金属面，不动渐变位置，避免停偏）
    tl.fromTo(sel+' .front',{filter:'drop-shadow(0 2px 0 #fff) drop-shadow(0 0 26px rgba(165,140,255,.65)) drop-shadow(0 9px 16px rgba(0,0,0,.45))'},
      {filter:'drop-shadow(0 2px 0 #fff) drop-shadow(0 0 48px rgba(190,165,255,1)) drop-shadow(0 9px 16px rgba(0,0,0,.45))',duration:1.6,yoyo:true,repeat:1,ease:'sine.inOut'},t+1.4);
  }
  // fromTo 快捷
  function F(tl,s,a,b,t){ b.ease=b.ease||'power2.out'; tl.fromTo(s,a,b,t); }

  return {mountBG:mountBG, chrome:chrome, chromeAll:chromeAll, bgDrift:bgDrift, chromeIn:chromeIn, F:F};
})();
