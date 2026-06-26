# Registry 现成零件（官方一行命令装的「会动的代码块 / 卡点字幕 / 转场」）

> HyperFrames 官方有个**活的零件商店**(registry)。`npx hyperframes add <名>` 一行装一个别人做好测好的部件。**这里缓存了科普最常用的几个当起点；不够就 `add` 去拿更多**（官方有 ~95 个 block + ~25 个 component，列了 N 个 ≠ 只有 N 个）。

## 接口（拿更多就用这个，走代理）
```bash
export all_proxy=http://127.0.0.1:12000 https_proxy=… http_proxy=…   # 装不到先挂代理(它偶尔抽风,重试)
npx hyperframes add code-typing        # 装一个 block → compositions/<名>.html
npx hyperframes add caption-highlight  # 装一个 component → compositions/components/<名>.html
```
- **block** = 独立子合成（自带尺寸/时间轴）→ 用 `data-composition-src` 挂进你的片，或当 index.html 直接渲。
- **component** = 效果片段（无尺寸）→ 把它的 HTML/CSS/JS 粘进你的合成，把它的 GSAP 调用并进你的时间轴。

## 已缓存（科普常用，`assets/registry-parts/`）
| 文件 | 类型 | 干啥 | 已验证 |
|---|---|---|---|
| `code/code-typing.html` | block | **代码像打字一样敲出来** + 语法高亮 + 光标 | ✅ 真渲出画 |
| `code/code-highlight.html` | block | 逐行扫高亮、其余变暗 | — |
| `code/code-diff.html` | block | 红删绿增 diff | — |
| `code/code-morph.html` | block | 两份代码 FLIP 形变 | — |
| `code/code-snippet-dark-plus.html` | block | 整套 VS Code 编辑器外壳(dark-plus 主题) | — |
| `captions/caption-highlight.html` | component | TikTok 式扫词高亮字幕 | — |
| `captions/caption-pill-karaoke.html` | component | 胶囊卡拉OK字幕 | — |
| `captions/caption-gradient-fill.html` | component | 渐变填充字幕 | — |

## 怎么改成你的内容
- **代码块**：代码不是运行时塞字符串，而是作者期用 **Shiki 把代码预烤成 `window.__TOKENS`**（带语法色 + 稳定 key），再设 `window.__BLOCK={effect,seq,line,duration}`。**换代码 = 重新跑 Shiki 烤一遍**（唯一构建步，写进出片 SOP）。装出来时自带 demo tokens，能直接渲。
- **字幕**：源码里一个硬编码 `WORDS=[{text,start,end},…]` 数组——**从你的 TTS/转写时间轴直接生成**，改这个数组即可卡点。

## 确定性（已核实，契合铁律）
这些零件本身就是 **paused GSAP 时间轴让引擎逐帧 seek**，grep 无 `Math.random/Date.now/rAF/setTimeout`。放心用。
> 坑：①字幕/某些块字体走 Google Fonts `<link>`，和"字体内联"对齐即可 ②块自带 1920×1080 尺寸，竖屏要重排 ③竖屏/方屏混分辨率注意 `data-width/height`。

## 科普怎么搭
- 讲代码/技术 → `code-typing`/`code-highlight`/`code-diff` + `code-snippet-*` VS Code 皮。
- 口播短视频 → `caption-*` 喂 `{text,start,end}` 出卡点字幕。
- 转场 → `add` 拿具名 shader 转场（和 `structure-and-rules.md` 的 HyperShader 同源）。
## 完整目录（官方 ~130 个，`npx hyperframes add <名>` 即取——别只用缓存的）
> 已缓存扩到 **18 个**（`code/` 6 + `captions/` 4 + `data/` 4 + `fx/` 4）。下面是全目录，按需 add：
- **代码块/编辑器(~30)**：`code-typing/highlight/diff/morph/scroll/3d-extrude/shader-dissolve/particle-assemble`；**`code-snippet-*` 25 个 VS Code/终端主题**(dark-plus/dark-modern/monokai/solarized/visual-studio-*/light-*/high-contrast + **12 个 apple-terminal-** 配色)。
- **字幕(17)**：`caption-` 后接 highlight/pill-karaoke/gradient-fill/editorial-emphasis/neon-accent/weight-shift/emoji-pop/parallax-layers/kinetic-slam/clip-wipe/texture/neon-glow/blend-difference/glitch-rgb/matrix-decode/particle-burst。
- **图表/流程/地图**：`data-chart` `nyt-graph` `decision-tree` `flowchart` `flowchart-vertical` `us-map(+bubble/hex/flow)` `world-map` `spain-map`。
- **FX/叠加**：`grain-overlay` `vignette` `shimmer-sweep` `motion-blur` `texture-mask-text` `morph-text` `grid-pixelate-wipe`。
- **转场(单 shader)**：`cinematic-zoom` `cross-warp-morph` `light-leak` `glitch` `swirl-vortex` `whip-pan` `sdf-iris` `ripple-waves` `gravitational-lens` `ridged-burn` `domain-warp-dissolve` `parallax-zoom/unzoom`(+ `transitions-*` 13 个展示 reel)。
- **VFX/3D/液态玻璃**：`vfx-liquid-background` `vfx-liquid-glass`(=要的 three.js 液态玻璃,紫色加料用这俩) `vfx-iphone-device` `vfx-portal` `vfx-magnetic` `vfx-shatter` `ui-3d-reveal` `liquid-glass-*` `ios26-liquid-glass` `macos-tahoe-liquid-glass`。
- **社交卡/下三分屏**：`yt-lower-third` `tiktok-follow` `instagram-follow` `x-post` `reddit-post` `spotify-card` `macos-notification` `logo-outro`。
> 科普优先：代码块 + VS Code 皮 + 字幕 + data-chart/flowchart + grain/vignette 质感 + 单 shader 转场。液态玻璃要加料就 `add vfx-liquid-background`。
