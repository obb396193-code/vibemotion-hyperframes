---
name: vibemotion-hyperframes
description: 用 HyperFrames + GSAP 做 Claude 设计风格的科普/包装短视频时使用。提供三套已验证的可复用主题——紫色镀铬玻璃(purple-glass)、暖色衬线(warm-serif，即 Claude Design)、复古像素(pixel-arcade)——共用结构契约、确定性铁律与动效原则。画幅(横屏/竖屏/方屏)按用户或平台选，不写死。含「联网找 CC0 素材/logo/字体」方法。需要做代码动画、概念讲解、产品包装、像素转场类视频，或问"用 HF/GSAP 怎么做某风格的视频"时触发。
---

# vibemotion-hyperframes · Claude 视频套件（HyperFrames + GSAP）

> 昵称 **vibemotion-hyperframes**（纯代码图形片）。姊妹技能 **vibemotion-remotion**（Remotion，素材重/OCR/批量）。

把"Claude 设计风格的纯代码视频"封装成可复用底板。**核心引擎 HyperFrames + GSAP**（像素角色长动画也可走 GSAP + playwright 录屏，见 pixel 主题）。三套主题换皮，规则共用：

> **⚠️ 用法哲学（先读这条，统管全技能）**：本技能是「**方法 + 权威源 + 验证过的起点**」，**不是一份固定清单**。每次做片可以不一样：
> - **缺什么就主动去找**——翻 `references/` 的规范、`examples/` 的真工程、外部仓库（GSAP `greensock/GSAP`、Claude Design、HF 官方 `heygen-com/hyperframes` 及其 registry）看**当前有什么**（这些会更新），按这条片要讲的内容挑，别只用文档里列出来的那几样。
> - **想要新的就照规范生成新的**——主题/插件/转场/版式/素材/分场都能**新造**，只要守住「结构契约 + 确定性铁律 + 反 AI 自检」三条底线。
> - **列了 N 个 ≠ 只有 N 个**。下面三套主题、几个插件、几份范例都只是**验证过的起点**，不是上限。看到清单先想"还能去哪找/还能生成什么"，而不是"只能用这些"。

| 主题 | 调性 | 何时用 | 规范 |
|---|---|---|---|
| **purple-glass** | 紫色极光 + 镀铬立体字 + 玻璃拟态 | 电商/综艺级包装、产品、酷炫概念 | `references/theme-purple-glass.md` |
| **warm-serif** | Claude 暖橙 + 米/深双底 + 衬线 | 科普讲解、知识、人文、沉静叙事 | `references/theme-warm-serif.md` |
| **pixel-arcade** | 复古像素游戏 / 街机 | 游戏类比、目录/进度转场、对战/评分卡 | `references/theme-pixel-arcade.md` |

> **加新主题的铁律**：先真渲染一条片验证（出 mp4、抽帧确认好看 + 不翻车），**再**写 `theme-*.md` + css/js 入库。没在 HF/GSAP 视频里渲染验证过的审美（如 taste-skill 那类高级网页风），**不许**直接进库——它们可能只在静态网页里成立，动画里未必。**素材同理**：联网找的 logo/精灵/字体先本地化验证再用，见 `references/asset-sourcing.md`。

## 做一条视频的流程

1. **选主题 + 选画幅**
   - 主题 → 读对应 `references/theme-*.md`（拿色板/字体/组件/动效）。
   - **画幅按用户/平台定，不写死**：抖音/小红书竖屏 `1080×1920`、B站/横版 `1920×1080`、方屏 `1080×1080` 等。把 `data-width/data-height` 与渲染 `--resolution` 设成对应值即可；三套主题都自适应（竖屏字号放大、横屏多用横向布局）。
   - **主题冲突时（如"酷炫"+要 Claude 对话界面素材）分两层定**：①视频外壳主题（按调性，酷炫→purple-glass）；②内嵌素材的设计系统（Claude 对话界面用 warm/Claude-Design 色，见 `realistic-ui-and-web.md`）。两层各选一条，别混。

> **🔴 CHECKPOINT · 🛑 STOP（渲染前必停一次）**：开始填模板/渲染前，把分场清单（每场讲什么 + 时长）、主题、画幅、需联网的素材清单**列给用户确认**。渲染是最贵的一步（一条 60s 片渲染按分钟计），方向错了重渲成本高——确认后再进第 4 步。用户改方向 → 回第 1 步重定。
2. **读共用规则** → `references/structure-and-rules.md`（结构契约 + 确定性铁律 + 渲染命令 + 动效原则）。必读，所有主题都遵守。
3. **要真实素材?**（logo / 精灵图 / 字体）→ 读 `references/asset-sourcing.md`，联网找 CC0 素材并本地化、记来源。
   - 要**拟真界面/网页**当演示素材（产品页/对话框/代码评审/仪表盘）→ 读 `references/realistic-ui-and-web.md`（taste/shadcn/reactbits/impeccable/Claude Design 提炼的高级感规范 + 截图合成管线，已验证）。
4. **照抄起步模板** → `templates/purple-starter.html` / `warm-starter.html`（pixel 见其 theme 文档的两条管线）。填内容与分场。
5. **渲染**
   - HF：`cd 合成目录 && npx hyperframes render . -o out.mp4 -w 1 --resolution <landscape|portrait|square>`（只认预设名，不是 WxH；须与 data-width/height 一致）
   - 像素角色长动画（B 管线）：GSAP + playwright 录屏（`record.js` 模式）。

## 结构契约（两套通用，详见 structure-and-rules.md）

```html
<div id="root" data-composition-id="main" data-width=".." data-height=".." data-start="0" data-duration="N">
  <div class="scene clip <主题底类>" id="s1" data-start="0" data-duration="5" data-track-index="0">
    <div class="scene-content"> 内容 </div>
  </div>
  ...
</div>
<script>/* 一条 paused GSAP 时间轴 挂到 window.__timelines["main"] */</script>
```
- purple 底类 = `prem`；warm 底类 = `bg-dark` / `bg-cream`。
- `<head>` 顺序：gsap → hyperframe runtime → 主题 css → 主题 js → **内联 @font-face / Google Fonts**。

## 确定性铁律（违反则渲染不稳，必查）

- ❌ `Math.random()` / `Date.now()` / `requestAnimationFrame` / `repeat:-1`
- ✅ 用 `tl.fromTo`（不是 `tl.from`，避免回到初值闪烁）；yoyo+有限 `repeat`
- ✅ 颗粒用 **CSS radial-gradient**，不用 SVG filter / data-URL
- ✅ 字体在每个合成 **内联**（外链 css 的字体路径渲染时解析不到；purple 用本地 woff2，warm 用 Google Fonts `<link>`）
- ✅ 本地图片在 HF 里会 404 → 用 HTTPS 或 base64 data-URI（要放真实截图就走这条）

### 渲染翻车 · 症状 → 病因 → 修法（出问题先查这张表，别从头读规则）
> 用法：抽帧/试渲染看到症状，按「症状」列定位，照「一线修复」改；仍不好走「兜底」。配合 `ffmpeg -i out.mp4 -vf "select=eq(n\,80)" -vframes 1 f.png` 定位到具体帧。

| 症状 | 病因 | 一线修复 | 仍失败兜底 |
|---|---|---|---|
| **某一帧标题/元素闪一下**（入场处单帧跳） | 用了 `tl.from`（先跳终值再回起点） | 全部 `tl.from(sel,{...})` → `tl.fromTo(sel,{起},{终})` | 入场元素 inline `style="opacity:0"` 兜底初值 |
| **颗粒/噪点有锯齿、渲染抖** | 用了 SVG `<filter>` 或 data-URL 噪声 | 改 CSS `radial-gradient(...); background-size:3px 3px` | 直接去掉颗粒层，靠暗角+渐变营造质感 |
| **背景死板不漂移**（静止 hold） | 漏挂背景漂移（purple 漏 `PremKit.bgDrift(tl)`，warm 漏 orb 呼吸） | 加 `PremKit.bgDrift(tl, 4.4)` / `tl.to('#orb',{scale,yoyo:true,repeat:有限})` | 给场内任一元素加 yoyo 呼吸，保证有 mid-scene 活动 |
| **字体不生效/回退默认体** | @font-face 写在外链 css，渲染时路径解析不到 | 把 `@font-face`/Google Fonts `<link>` 内联到该合成自己的 `<head>` | purple 用本地 woff2 相对路径；warm 用 Google Fonts link |
| **图片 404 / 整块空白** | 本地 `<img src="./x.png">`，HF render 取不到 | 转 base64 data-URI，或换 HTTPS 直链 | 走 playwright 录屏管线（本地文件无 404） |
| **画面静止/视频是死的** | 时间轴没挂到 `window.__timelines["main"]`，或 `data-composition-id` 不对应 | 确认结尾 `window.__timelines["main"]=tl;` 且 id=`main` | 检查 `data-composition-id` 与 `__timelines` 键一致 |
| **渲染分辨率/画幅不对** | `--resolution` 传了 `1080x1920` 这种 WxH | 只传预设名 `portrait`/`landscape`/`square` | 同时核对 `data-width/height` 与预设一致 |
| **居中元素入场后跑偏** | 对 `translate(-50%,-50%)` 居中元素又用 GSAP 动了 `x`/`y` | 改 `top` 定位 + 只 `translateX(-50%)`，或只动 `scale` | 把居中交给 flex 父容器，子元素只做 transform 缩放 |

**改完必回归**：重新 `npx hyperframes render` → 抽同一帧确认症状消失（不是只看代码改对了）。

## 资产位置（相对合成目录调整路径）
- `assets/purple/kit.css` `kit.js` `fonts/`（紫色）
- `assets/warm/warm.css` `warm.js`（暖色，字体走 Google Fonts；已默认关暗角）
- pixel 无固定 css/js：精灵/像素字按 `asset-sourcing.md` 联网找并本地化（PIL 打包 data-URI 或 playwright 直引用）。
- ⭐ `references/claude-design-spec.md` —— HeyGen 官方「Claude Design」权威规范（骨架/动效模式库/**HyperShader 电影级转场**/反 AI 字体）。**做 warm 正片必读**，高级感就差这层。
- ⭐ `references/gsap-plugins.md` —— **GSAP 全家桶(付费插件现已全免费)**：SplitText 拆字 / DrawSVG 连线自绘 / MorphSVG 形状变形 / MotionPath 路径 / Flip 重排。按「你在讲什么」选插件（讲关系→DrawSVG、讲变化→MorphSVG），已实测可用，范例 `examples/gsap-plugins/`。

## 完整范例（`examples/` — 真片源工程，当模板用）
做新片**先看对应主题的范例**，照它的结构/分场/动效改内容。详见 `examples/README.md`：
- `examples/warm-transformer/` — Transformer 60s 竖屏，自带 `DESIGN.md`（warm 规范源头）。
- `examples/pixel-skill-adventure/` — SKILL 大冒险，含**真实 CC0 精灵图素材** + playwright 录屏管线。
- `examples/purple-product/` — 产品发布 demo，引用技能自带 `assets/purple/`。
- `examples/routeB-realistic-ui/` — **拟真界面动画**（非主题，是 `realistic-ui-and-web.md` 的 Route B）：扒真字体+真图标+子合成+接缝转场+假鼠标+音效，含真渲成片。

## 反 AI 套路自检（出片前过一遍）
- [ ] 无禁用字体（Inter/Roboto/Open Sans/Poppins/Fraunces…）
- [ ] 每场有 mid-scene 活动（脉冲/呼吸/计数/漂移），不是静止 hold
- [ ] 每场 ≥3 种 ease，速度/方向错开
- [ ] 主标题字号够大（竖屏 ≥110px；横屏按画幅比例放大）
- [ ] 无 Math.random/Date.now/repeat:-1、无 base64 占位、无 SVG filter 颗粒

### 🚫 红线黑名单（命中任一 = 必返工）
- 🚫 `tl.from` / `Math.random` / `Date.now` / `repeat:-1` / SVG `<filter>` 颗粒
- 🚫 外链 css 里 `@font-face`；`--resolution 1080x1920`（只认预设名）
- 🚫 新主题/联网素材没渲染验证就进库；素材未记来源/许可证
- 🚫 给 `translate(-50%,-50%)` 居中元素再用 GSAP 动 `x/y`；纯黑底冒充 purple
