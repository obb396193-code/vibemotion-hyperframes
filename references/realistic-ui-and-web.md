# 拟真界面 / 网页素材的高级感规范（taste · shadcn · reactbits · impeccable · Claude Design）

> ⚠️ **这不是第四套 HF 动画主题**。这几套是**网页/UI 设计系统**，强项是做好看的**静态界面/网页**。把它们用进视频的**已验证**方式 = 「**做高级 HTML → playwright 截图 → 合成进视频（浏览器/设备/App 框）**」。验证片：`常用Skill推荐`（用 taste/shadcn 做了落地页/Claude 对话/GitHub PR/仪表盘等拟真界面再合成）。
> 用途：视频里要**真实感的产品界面、网页、对话框、代码评审**当演示素材时走这条。

> ✅ **这些都是你已装的技能 —— 做拟真界面时主动调用它们生成，别只照下面提炼的几条**：
> `Skill: taste-skill`（高端网页审美）· `Skill: impeccable`（UI 评审 + 生产级实现）· `Skill: reactbits-animator`（网页微动效）· `Skill: frontend-design` · shadcn 走 `ui-ux-pro-max` 的 shadcn MCP。
> 让它们先写好 HTML（每次可不一样、可生成新风格）→ playwright 截图 → 合成进视频框。**下面的要点只是快速取舍参考，不替代去调用真技能。**

## 两条路线，按需求选
- **A · 截图合成**（下面这条）：写好看 HTML → playwright 截图 → 放进浏览器框。适合**一张静态界面亮个相**。
- **B · 真界面动画**（进阶，见下节）：把真界面**重写成动画 HTML**（矢量超清，不是截图），**扒真站的真字体+真图标**，每页一个子合成，接缝转场组装。适合**演一段操作/多状态流程**（对话→回复→任务列表）。HeyGen 官方 launches 就是这条，"像真"的天花板。

---

## 进阶 B · 真界面做成动画（扒真字体 + 真图标 + 子合成组装）
> 来源：拆 `源码参考/hyperframes-launches/spacex-launch/`。核心：**不截图，手写 HTML/CSS 把真界面复刻成动画**，所以又像真又**矢量超清**。音效 / 假鼠标是**可选加分项**（见末节，想用就用，非必须）。

### 0) 「规范」从哪来（颜色/字体/图标/版式 = 设计 token）
做某个产品的拟真界面，先得有它的**设计规范**。三种来源，按情况选：
- **A. 已有现成规范** → 直接用。例：「Claude 风」的暖橙 `#CC785C`+米底+衬线，技能里 `claude-design-spec.md` 已收录，不用再扒。
- **B. 扒真站**（产品有网页，但你没规范）→ 去真站扒四样：
  - **颜色/token**：devtools 读它的 CSS 变量(`:root{--xxx}`，很多产品色板直接在这)或 `getComputedStyle`；或截图吸管取色。工具:**chrome-devtools MCP** 的 `evaluate_script` 读样式、`Skill: firecrawl-scrape` 取它的 CSS。
  - **字体** → woff2（见下 ①）；**图标** → inline SVG（见下 ②）；**间距/圆角/阴影/版式** → 读它 CSS 或截图量。
- **C. 复刻**（产品是终端/CLI/桌面 App，没网页可爬）→ 照它**真实长相手复刻**：参考真实截图 + 已知特征，对齐色板/结构/字体。例：做 Claude Code 终端——没有规范文件，照真实 Claude Code（深色 + ✻Welcome + `⏺`工具调用 + 橙 `#D97757`）复刻，**字体扒了真 JetBrains Mono**。
> 换任何产品（Cursor / ChatGPT / VS Code…）都走这条：A 有现成就用，没有就 B 扒真站、C 复刻。**关键是颜色/字体/图标/版式都对齐到真产品，别凭感觉编。**

> **🔴 CHECKPOINT · 必停问用户「规范来源」**：做拟真界面**前**，先问用户两件事 → ①这是什么产品的界面？②规范从哪来（**A 技能已有** / **B 真站可爬** / **C 没网页要复刻**）？然后**带用户一步步把规范扒出来、列给 ta 确认，再动手搭**：
> - 选 **B**：我去开它网页 + chrome-devtools 读 CSS 变量/computed style → 把**色板 + 字体 + 图标**列出来给你确认；
> - 选 **C**：我照真实截图复刻 → 把**复刻的色板 + 扒到的字体**列出来给你确认；
> - 确认规范后才进「子合成 + 组装」。**别跳过这步直接凭感觉做**——上一版 Claude Code 终端就是没对齐真 token 才"不够像"。

#### 已扒规范 · Claude Code 界面 token（实测自官方 `cloud-render-launch/opener.html`，下次=来源 A 直接用）
- **配色**：窗 `#1D1F1F`／输入框 `#2C2C2B`，边框 `#3a3a38`，正文 `#E6E2D6`／`#EFEADD`，次要 `#7C7B73`／`#8C8B83`；强调橙(caret/✻) `#D97757`，薄荷成功色 `#3CE6AC`，Auto 徽章 `#CAA43E` on `rgba(202,164,62,.16)`，spinner orb 蓝 `#5A9BE6`，红绿灯 `#FF5F57/#FEBC2E/#28C840`。
- **字体**：Hanken Grotesk（界面）；终端正文/代码可换 JetBrains Mono。
- **结构**：窗(红绿灯条)→ feed(右对齐用户气泡 + 左对齐 AI 回复)→ composer = 芯片行(Local/CC + SVG) + 输入框(文字 + 橙 caret `▏` + 右 `↵`) + 状态行(Auto · ＋ · Opus 4.8 · High · 旋转 orb)。
- **尺寸**：**全用 `cqw/cqh`**（容器百分比），别用 px——这是"比例精准、像真"的关键。
- **细节**：红绿灯用真 macOS 色；orb 是 CSS border 旋转环；caret 用 `steps(1)` yoyo 闪；要更生动可加像素吉祥物（`<video>` 贴输入框顶边 + 渐隐 mask）。

> 📦 **先翻界面库,别从零做**：`assets/ui-library/`（搬自官方 launches 的真界面，按类型分：claude-code-chat / terminal / vscode-editor / browser / github-pr / codex…）。**要的界面库里有就直接复用**（甚至多个界面用 `data-composition-src` 组合成一条片：开场 Claude Code 对话 → 切 VS Code → 切终端 → 浏览器揭示）；库里没有，才按 `ui-spec-standard.md` 的标准模板去**扒新界面**，扒完存进 `ui-library/<界面>/SPEC.md` 沉淀为「来源 A」。

### 1) 扒真站的「真字体」（字一模一样的关键）
- 找字体：打开真站 → 看它 CSS 里的 `@font-face{ src:url(...woff2) }`，或 devtools Network 面板筛 `font` 看加载了哪些 woff2。**可用 `Skill: firecrawl-scrape` 抓它的 CSS/HTML，或 chrome-devtools MCP 看 network。**
- 下下来：`curl -sL <woff2地址>`（**走代理**：`export all_proxy=http://127.0.0.1:12000 https_proxy=… http_proxy=…`）放进合成的 `fonts/`。
- 内联：把真站的 `@font-face` **原样照搬**进合成 `<head>`（连 `font-weight`/`unicode-range` 都抄）。例：Grok 用 `Hanken Grotesk`+`Newsreader`，就扒这俩。

### 2) 扒真站的「真图标」（用人家的，别自己生成）
- 在真站 DOM 里把每个图标的 inline `<svg>` **直接复制**（devtools 右键元素 → Copy → Copy outerHTML / Copy element），或下它的 svg 文件。
- 内联进合成 → 矢量超清、和真产品**一模一样**。
- ❌ **别用 lucide / 自画的近似图标充数**——要"像真"就得用人家原图标。SVG 才能任意分辨率不糊。

### 3) 每页一个子合成 → 顶层组装 + 接缝转场
- 每个界面状态写成独立的 `compositions/<名>.html`（自带它的 UI + CSS + GSAP 动效，结构同主合成契约）。
- 顶层 `index.html` 用 `data-composition-src` 引子合成，**只在顶层做接缝转场**：
```html
<div id="sec-chat" data-composition-id="chat" data-composition-src="compositions/chat.html"
     data-start="6.7" data-duration="6.9" data-track-index="2"></div>
```
- launches 的 3 种接缝转场（顶层时间轴上做）：
  - **crossfade**：`tl.to('#secA',{opacity:0},T); tl.to('#secB',{opacity:1},T)`
  - **inverse zoom-through**：旧场 `scale:.8,blur(20px)` 缩走 → 新场从 `scale:1.25,blur(20px),opacity:.15` 弹清(`expo.out`)
  - **cut-the-curve**：`xPercent:-13` 快速横移 + 压暗后硬切
- 子合成各设 `style` 初始可见性（首个可见，其余 `opacity:0`），顶层 `tl.set/to` 控接缝——和 HyperShader 那套同理。

### 4) 像素级细节（照真站量，别拍脑袋）
- 多层柔阴影：`box-shadow:0 2px 6px rgba(0,0,0,.05), 0 34px 80px -30px rgba(0,0,0,.32)`
- **cqw 响应单位**（容器宽百分比）写圆角/尺寸 → 换画幅自动缩放；999px 胶囊、50% 圆。
- 精确底色（Grok 是 `#030404`）、真实交互反馈（按钮点下 `scale:.94`+变色、加号转 45° 变 ×）。

### 可选加分项（想用就用，非必须 —— 不是每条片都得加）
> 核心是「扒真字体 + 真图标 + 子合成组装」；下面两样**加上更像真人在操作，不加也完全成立**。按这条片需不需要自己定。

- **假鼠标**（一个 SVG 光标，GSAP 演移动+点击）：
  ```js
  // 屏外滑入到按钮；transformOrigin 放指尖
  tl.fromTo('#cursor',{left:'5.7%',top:'115%'},{left:'5.7%',top:'51.9%',duration:.92,ease:'power3.out'},0.3);
  tl.to('#cursor',{scale:.84,duration:.10,transformOrigin:'21% 14%'},1.60); // 点击：缩一下
  tl.to('#cursor',{scale:1, duration:.22,transformOrigin:'21% 14%'},1.71);  // 再弹回
  ```
- **音效**（分轨 `<audio>`，卡到视觉点上）：点击配鼠标声、打字配键盘 loop、开关配低音、底铺低音量 BGM：
  ```html
  <audio src="mouse-click.mp3"     data-start="1.60" data-duration="0.30" data-track-index="100" data-volume="0.55"></audio>
  <audio src="keyboard-typing.mp3" data-start="7.80" data-duration="1.95" data-track-index="120" data-volume="0.24"></audio>
  <audio src="music-bed.mp3"       data-start="0"    data-duration="39.5" data-track-index="12"  data-volume="0.13"></audio>
  ```
  音效素材按 `asset-sourcing.md` 找 CC0 的（鼠标声/键盘声/BGM）。⚠️这里指 UI 音效，**不是** TTS 口播配音（那是另一回事）。

---

## 路线 A · 截图合成（管线 4 步）
1. 按下方「高级感规范」写一个**好看的 HTML 页**（1280×800 之类）。
2. `playwright` 截图：`page.goto(file)` → `waitUntil:'networkidle'`（等 Google Fonts）→ `screenshot({deviceScaleFactor:2})`。
3. PIL 压成 JPEG → base64 打包 `shots.js`（HF 渲染读不了本地图）。
4. HF 合成里放进**浏览器框/设备框**（三色灯 + 地址栏），GSAP 切换/推近，配标签。

### 第 2-3 步可直接抄的脚本（最易翻车的一步，照抄改路径）
```js
// shoot.mjs — playwright 截图。 npm i playwright 后 node shoot.mjs
import { chromium } from 'playwright';
const pages = [{ file: 'claude-chat.html', out: 'claude-chat.png' },
               { file: 'github-pr.html',   out: 'github-pr.png' }];   // 改成你的页
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 }); // DSF 必须在 context 上，不是 newPage
const p = await ctx.newPage();
for (const it of pages) {
  await p.goto('file://' + process.cwd() + '/' + it.file, { waitUntil: 'networkidle' }); // 等 Google Fonts
  await p.waitForTimeout(400);                                         // 字体/动效落定
  await p.screenshot({ path: it.out });
}
await b.close();
```
```python
# pack.py — PIL 压 JPEG + base64 打包 shots.js（HF 读不了本地图，必须内联）。 pip install pillow
import base64, io, json; from PIL import Image
shots = {}
for name in ['claude-chat', 'github-pr']:                              # 同上文件名（去 .png）
    im = Image.open(f'{name}.png').convert('RGB')
    buf = io.BytesIO(); im.save(buf, 'JPEG', quality=82)               # 82 够清晰又不爆体积
    shots[name] = 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()
open('shots.js', 'w').write('window.SHOTS = ' + json.dumps(shots) + ';')  # HF 里 <img src=SHOTS['claude-chat']>
```
> 翻车点：截图必须 `waitUntil:'networkidle'`+短 `waitForTimeout`（否则截到无字体的白页）；JPEG quality 82 是清晰与体积的平衡，PNG 直接 base64 会让合成体积爆掉。

## 高级感规范（5 套合并提炼）

### 颜色（impeccable 为准，最硬）
- **对比度必达**：正文 ≥4.5:1，大字 ≥3:1；占位符也要 4.5:1。**最常见翻车 = 浅灰正文压在暖白底上**——拿不准就把正文往墨色端压。
- OKLCH 描述；先定**策略**再选色：克制(中性+1 强调≤10%) / 承诺(1 个饱和色占 30–60%) / 全色板 / 浸染。
- ⚠️ **奶油/米色底是 2026 的 AI 默认**（L 0.84–0.97, C<0.06, hue 40–100，叫 cream/sand/paper 都算）。要"暖"就用强调色+字体+图片承载，别让正文底默认发暖。

### 字体（impeccable + taste）
- 配对走**对比轴**：衬线+无衬线 / 几何+人文；别配两个相似无衬线。或一个家族多字重（taste 的 300 vs 900）。
- 正文行宽 65–75ch；display 上限 ~96px；字间距下限 ≥-0.04em；h1–h3 加 `text-wrap:balance`，长正文 `text-wrap:pretty`。
- premium 字（浏览器联网加载，系统字兜底）：Plus Jakarta Sans / Instrument Serif（衬线）/ JetBrains Mono / Geist。**避开** Inter/Roboto/Open Sans。

### 表面 / 组件（shadcn vs taste —— 按场景选，别反射）
- **shadcn 路线（克制·产品感）**：中性 token、发丝边 `1px`、`rounded-lg/xl`、muted 表头、柔和扩散阴影、徽章圆角小。适合仪表盘/表格/后台。
- **taste 路线（奢华·品牌感）**：双层 bezel 嵌套卡（外壳 ring + 内核 inset 高光、同心圆角）、玻璃拟态、巨字距留白。适合落地页/品牌/hero。
- 两条都好看，但**别混着堆**；一个素材选一条路走到底。

### 动效（只在"录交互"时才需要；静态截图忽略）
- ease-out 指数曲线（quart/quint/expo）；**禁** bounce/elastic。
- reactbits 思路 = 克制的网页微动效（scroll reveal / 磁吸 hover / stagger）；reveal 必须是"已可见之上的增强"，别用 class 门控可见性（headless 渲染不触发→截图空白）。
- `@media (prefers-reduced-motion)` 兜底。

### Claude Design（= 本技能 warm 主题的底）
- 暖橙 `#CC785C` + 米/深底 + 衬线；做"Claude 风"的界面素材时用这套色，和 warm 视频主题同源、可呼应。

## 🚫 反 AI 味红线（impeccable 的 ban —— 反射式用 = 一眼假）
- 🚫 **渐变文字**（`background-clip:text`+渐变）当装饰；🚫 **默认玻璃**到处糊
- 🚫 **hero 大数字模板**（巨数字+小标签+渐变）；🚫 **千篇一律等大卡片网格**、卡里套卡
- 🚫 **每段都顶一个 tracked 大写 eyebrow**；🚫 **每段都 01/02/03 编号**（除非真是有序流程）
- 🚫 **侧边色条**（border-left/right >1px 当强调）
- 自检：**"光看这界面能不能一口咬定 AI 做的?" 能 = 没过**。能从品类直接猜出配色/版式 = 第一反射，重做。

> 注意张力：上面的 taste 爱「玻璃/渐变字/eyebrow」，impeccable 把它们列 ban。**不矛盾**——一次**刻意**的品牌选择是声音，**每处反射式**地用就是 AI 语法。按 brief 选，别凭惯性。

## 来源
taste-skill(soft-skill) · impeccable · shadcn/ui · ReactBits · Claude Design（暖橙官方色）
