# 共用规则 · HyperFrames 结构契约 + 确定性 + 动效 + 渲染

两套主题都遵守。HF 把 HTML/CSS + 一条**暂停的 GSAP 时间轴**逐帧截图成视频。

## 1. 结构契约
```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <!-- 需要付费插件(全免费)就在这里加 SplitText/DrawSVG/MorphSVG… 见 gsap-plugins.md -->
  <script src="https://cdn.jsdelivr.net/npm/@hyperframes/core/dist/hyperframe.runtime.iife.js"></script>
  <link rel="stylesheet" href="<主题>.css">
  <script src="<主题>.js"></script>
  <style>/* 内联 @font-face 或 Google Fonts <link> 放这层 */</style>
</head>
<body>
<div id="root" data-composition-id="main" data-width="1920" data-height="1080" data-start="0" data-duration="14">
  <div class="scene clip <底类>" id="s1" data-start="0" data-duration="4" data-track-index="0">
    <div class="scene-content"> ... </div>
  </div>
  <!-- 多场：data-start 累加，data-duration 各自；切场用 tl.set autoAlpha -->
</div>
<script>
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });
  // ...编排...
  window.__timelines["main"] = tl;   // ← 必须挂这里，HF 靠它驱动
</script>
</body>
```
- `data-composition-id="main"` 与 `__timelines["main"]` 对应。
- 多场切换：`tl.set("#s1",{autoAlpha:0}, T); tl.set("#s2",{opacity:1}, T);`，后续场 inline `style="opacity:0"`。

## 2. 确定性铁律（违反 = 渲染抖动/不可复现）
- ❌ `Math.random()`、`Date.now()`、`new Date()`、`requestAnimationFrame`、`repeat:-1`
- ✅ 入场用 `tl.fromTo(sel, {from}, {to}, t)`，**不要 `tl.from`**（`from` 会先跳到终值再回起点，渲染易闪）
- ✅ 循环动效用 `yoyo:true, repeat:<有限数>`
- ✅ 颗粒/噪点：CSS `radial-gradient(...) ; background-size:3px 3px`，**禁** SVG `<filter>` / data-URL 噪声
- ✅ 字体内联：purple 用本地 `@font-face url(woff2)`；warm 用 `<link>` Google Fonts。**外链 CSS 里的字体路径渲染时解析不到**，所以 @font-face 必须在合成自己的 `<head>`。
- ✅ 本地图片 `<img src="./x.png">` 在 HF render 里会 404 → 改 HTTPS 或 base64 data-URI。

## 3. 动效原则（build → breathe → resolve）
- **每场必有 mid-scene activity**：glow pulse / 呼吸缩放 / 漂浮 / counter / 旋转，避免"入场后死等"。
- **缓动多样化**：每场至少 3 种 ease（`power2.out` / `back.out(1.5)` / `sine.inOut` / `expo.out`）。
- **节奏**：入场 0.3–0.8s；长 hold 1.5–3s；stagger 0.04–0.22。
- **方向/速度错开**：相邻元素别用同一方向同一时长入场。
- **GPU 安全**：只动 `transform` / `opacity` / `autoAlpha` / `boxShadow` / `filter`；少动 width/height/top/left。
- ⚠️ 用 `translate(-50%,-50%)` 居中的元素**别再用 GSAP 动 `y`/`x`**（会冲掉居中）；改用 `top` 定位 + 只 `translateX(-50%)`，或只动 scale。

## 4. 渲染
```bash
cd <合成目录>
npx hyperframes render . -o out.mp4 -w 1 -q standard                 # 默认(读 data-width/height)
npx hyperframes render . -o out.mp4 -w 1 --resolution landscape      # 横屏 1920×1080
npx hyperframes render . -o out.mp4 -w 1 --resolution portrait       # 竖屏 1080×1920
npx hyperframes render . -o out.mp4 -w 1 --resolution square         # 方屏 1080×1080
# ⚠️ --resolution 只认预设名：landscape / portrait / square（+ -4k），不是 1080x1920 这种 WxH。
# 画幅须和合成里的 data-width/data-height 一致；render 入参是「目录」不是单个 html。
```
抽帧自检：`ffmpeg -i out.mp4 -vf "select=eq(n\,80)" -vframes 1 f.png`

## 5. Shader 转场（HyperShader · Claude Design 的电影级切换）
> 这是 warm/Claude Design 片"高级感"的关键一层（原片 transformer 就靠它）。完整权威规范见 `claude-design-spec.md`；下面是可直接抄的最小用法。

**何时用**：只在 **1–3 处叙事跃迁**（钩子→正文 / act break / 收尾）。其余硬切保节奏——"每个切都加 shader"= 廉价。
- 14 个 shader：`cinematic-zoom` `cross-warp-morph` `light-leak` `domain-warp` `whip-pan` `sdf-iris` `glitch` `chromatic-split` `ridged-burn` `gravitational-lens` `ripple-waves` `swirl-vortex` `thermal-distortion` `flash-through-white`
- 选 shader 看气质：**calm/科普 → `cross-warp-morph` / `light-leak` / `cinematic-zoom` / `domain-warp`**；高能 → glitch/chromatic-split。

**怎么接**（4 步）：
1. `<head>` 加：`<script src="https://cdn.jsdelivr.net/npm/@hyperframes/shader-transitions/dist/index.global.js"></script>`（在 hyperframe runtime 之后）。
2. **所有 shader-anchor 场**用 `style="opacity:0"`（**不是** autoAlpha）；**第一个 anchor 必须显式显示**：`tl.set("#s1",{opacity:1},0)`。
3. **anchor 场不要再写 autoAlpha 开关、不要写退出动画**（shader 本身就是退出）。
4. 结尾调用：
```js
window.HyperShader.init({
  bgColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-dark').trim() || '#1A1410',
  scenes: ["s1","s2","s3","s4"],              // 连续 anchor 块
  timeline: tl,
  transitions: [                               // 不变式：scenes.length === transitions.length + 1
    { time: 4.2,  shader: "cinematic-zoom",   duration: 0.6 },
    { time: 9.7,  shader: "cross-warp-morph", duration: 0.6 },
    { time: 15.2, shader: "light-leak",       duration: 0.6 }
  ]
});           // 放在 window.__timelines["main"]=tl 之前
```
- 转场时间 = `场边界 - duration/2`，且边界要落在窗口内（`time < 边界 < time+duration`）；最短 0.3s，甜点 0.5–0.6s。

**坑（出现就照查错表/这条修）**：
- 中间场全黑 → 第一个 anchor 没 `tl.set opacity:1`，或用了 `visibility` 而非 `opacity`。
- 转场前闪一下 → anchor 上有退出动画（删掉，shader 即退出）或转场 <0.3s。
- 颗粒**必须** CSS radial-gradient，**禁 SVG `<filter>` 噪声**（会污染 html2canvas 截图、让 shader 全崩）。
