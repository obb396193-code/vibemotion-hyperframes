---
name: premium-purple-chrome-kit
description: 做"紫色镀铬 + 玻璃拟态 + 极光底"高级包装风格的 Hyperframes 视频合成时使用。提供可复用的极光底/镀铬标题/玻璃卡/玻璃胶囊/真人口播框组件与配套动效助手。
---

# 高级包装套件（紫色镀铬）

把"电商/综艺级包装"审美封装成可复用底板。任何一条这风格的合成，**复用同一套 kit.css + kit.js**，只填内容。

## 怎么搭一个合成（照抄 _template/index.html）

1. `<head>` 里按顺序放：gsap → hyperframe runtime → `<link rel="stylesheet" href="../../kit/kit.css">` → `<script src="../../kit/kit.js">`。
2. **内联 @font-face**（必须，外链 CSS 解析不到字体）：
   ```html
   <style>
   @font-face{font-family:"AliPuHui";src:url("../../assets/font/AliPuHui.woff2") format("woff2");}
   @font-face{font-family:"Mono";font-weight:500;src:url("../../assets/font/IBMPlexMono-500.woff2") format("woff2");}
   </style>
   ```
3. 舞台：`<div class="scene clip prem" id="s1" ...>`，里面放 `<div class="k-content"> 内容 </div>`。
4. 镀铬标题：`<div class="chrome" data-text="你的标题"></div>`。
5. 玻璃件直接套 class：`.glass` / `.pill`(`.on`) / `.head-frame`。

## 脚本（底部）
```js
var scene=document.getElementById('s1');
PremKit.mountBG(scene);   // 注入极光/扫描/暗角背景
PremKit.chromeAll();      // 把所有 .chrome 变镀铬
var tl=gsap.timeline({paused:true});
PremKit.bgDrift(tl);                 // 极光漂移
PremKit.chromeIn(tl,'#title',0.3);   // 标题入场+辉光
PremKit.F(tl,'#card',{autoAlpha:0,y:40},{autoAlpha:1,y:0,duration:0.8,ease:'expo.out'},1.0);
// ...你的内容动效（遵循 motion-principles：ease/时长/方向错开）
window.__timelines["main"]=tl;
```

## 渲染
`cd 合成目录 && npx hyperframes render . -o out.mp4 -w 1`

## 已验证版式（demos/）
- `prem-talkinghead/` —— 真人口播 + 镀铬标题 + 玻璃胶囊（对标参考图3）
- `prem-filetree/` —— 镀铬标题 + 玻璃卡文件树（对标参考图2）

## 重要约束
- @font-face 内联、不放 kit.css。
- 本地图用内联 SVG 或 HTTPS，别用 `<img src=本地>`（渲染 404）。
- 镀铬只给大标题；要 100% 质感出 PNG 素材叠上去。
- 不要 PSD：渲染管线只吃 PNG/SVG/woff2。
