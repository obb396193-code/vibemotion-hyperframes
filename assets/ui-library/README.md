# UI 界面库（HyperFrames 真界面子合成）

从官方 HyperFrames 发布片源码里扒出来的 **真·产品界面** 子合成，清理到能独立渲染。
做视频时直接挑一个界面用，或在一个 master 里挂多个界面拼成一条片。

> **⚠ 这是常备的一批，不是全部。** 库里现成的不够用时，别将就，去这三个地方补：
> 1. **原始 107 个**：`~/Desktop/HF技能调研/源码参考/hyperframes-launches/` —— 里面还有没收进来的界面/变体，按下面「怎么扒新界面」自己挑。
> 2. **官方 registry**：`cd <项目> && npx hyperframes add <名>`（如 `code-snippet-*` 系列 VS Code 主题外壳、`shader-wipe` 转场等）。
> 3. **扒真站**：按本技能的 `ui-spec-standard.md` / `capture` 流程，把真实产品界面（Cursor / ChatGPT / Codex 网页版等）截下来重画。

---

## 0. 一分钟上手

每个文件是一个 HyperFrames `<template>` 子合成（不是完整 HTML 页面），结构契约：
```html
<template id="X-template">
  <div data-composition-id="X" data-width="1920" data-height="1080" data-duration="6.9">
    <style>… 字体用 Google Fonts <link>，UI 全是 CSS/SVG 画的 …</style>
    … DOM …
    <script> window.__timelines["X"] = gsap.timeline(...) </script>
  </div>
</template>
```
**不能直接双击打开看**（它是片段）。要看 / 要渲染，得用一个 master `index.html` 通过 `data-composition-src` 把它挂进去 —— 见 `example-master.html`（已验证可渲染，lint 0 错 0 警）。

> 例外：`batch-render-dashboard` / `variant-compare-config` / `code-editor-json-typing` / `inspector-editor-suite` 这 4 个是**完整 `<!doctype html>` 文档**（不是 `<template>` 片段），但内部同样有 `data-composition-id` div，照样能被 `data-composition-src` 挂载，也能 `npx hyperframes render <file>.html` 直接单独渲染。

**渲染一条片**：
```bash
cd <放了 index.html 和子界面的目录>
npx hyperframes render . -o out.mp4 -w 2 --resolution landscape   # 横屏 1920×1080
```

### ★ 三条铁律（踩了必白屏 / 必翻车）
1. **slot 的 `data-composition-id` 必须等于「被引用子界面内部那个 div 的 `data-composition-id`」**，不是随便起名。写错 = HF 找不到子时间线 = **整段白屏**。每个文件的内部 id 见下表「内部 id」列。
   ```html
   <!-- claude-composer-thinking.html 内部 id 是 chat-response，slot 就得写 chat-response -->
   <div data-composition-id="chat-response" data-composition-src="claude-code-chat/claude-composer-thinking.html" …></div>
   ```
2. **字体**：库里所有文件已把原来的本地 woff2（都是 Git-LFS 指针、没真下载）换成 **Google Fonts `<link>`**（Hanken Grotesk / Newsreader / Spline Sans Mono / Inter / JetBrains Mono / Fraunces / IBM Plex Mono / Archivo Black 都在 Google Fonts）。渲染机要能联网取字体。少数文件用系统字体栈（无需联网）。
3. **确定性**：HF 渲染禁 `Math.random` / `Date.now` / `requestAnimationFrame` 驱动动画 —— 这些源文件本来就是确定性的（GSAP 时间线 + `seek`），别往里加随机。

### ⚠ 重名内部 id
有几个文件**内部 id 相同**（来自不同发布片但 id 撞了）：
- `chat-response`：`claude-composer-thinking` 和 `grok-composer-thinking`
- `opener`：`claude-chat-dark-opener` 和 `claude-composer-prlink`

**同一个 master 里不能同时挂两个内部 id 相同的**（HF 按 id 绑时间线会冲突）。要都用，就打开其中一个文件，把 `<template id>` 和内部 `data-composition-id` 改成新名（如 `chat-response-2`），slot 也写新名。

---

## 1. 界面清单（按「科普/技术讲解最常用」排序）

字段说明：**画幅** 全是 1920×1080 横屏（cqw 响应式的可换 `--resolution portrait/square`，固定 px 的只适合横屏）；**删了的媒体** = 清理时删掉的 LFS 缺失 `<video>/<audio>`（界面本身不依赖它们，删了照样渲）。

### 🟢 claude-code-chat —— Claude Code 对话 / composer 输入界面（最常用，18 个）

| 文件 | 内部 id | 演什么 | 时长 | 画幅 | 删了的媒体 |
|---|---|---|---|---|---|
| `claude-composer-thinking.html` | `chat-response` | **暖色纸张主题** Claude composer（"How can I help you today?" + Tools 药丸 + Opus 4.8 选择器 + 橙色发送），打字→发送→缩成细条→thinking 指示器 | 6.9s | cqw | 无（自带内联 Lottie） |
| `grok-composer-thinking.html` | `chat-response` ⚠重名 | 同上的 **Grok/xAI 皮肤**（"Ask Grok" 占位 + SpaceX IPO 提问）；想要 xAI 风格用这个 | 6.9s | cqw | 无 |
| `claude-plus-menu-connectors.html` | `connector-morph` | Claude composer 的 **"+"菜单**（Add files / Skills / Connectors / Plugins / Web search✓ / Use style）→ Connectors 面板 + iOS 开关 | 6.7s | cqw | 无 |
| `claude-response-scroll.html` | `response-scroll` | Claude **markdown 回答逐行滚动浮现**（h2/h3/列表/粗斜体，Newsreader 衬线正文）+ 底部细 composer | 6.7s | cqw | 无 |
| `claude-response-followup.html` | `followup-type` | 同上的回答冻结在底部 + 光标回来在 composer **打追问**（"…make this into a video with HyperFrames?"）→ 点发送 | 6.0s | cqw | 无 |
| `claude-app-fullchrome.html` | `act2a-first-ask` | **最完整的 Claude 桌面 App 外壳**：顶栏（汉堡+星标 logo+项目名+"Claude Opus 4.7"药丸+头像）+ 对话气泡 + 底部 composer + "Claude can make mistakes"。纯系统字体，零外部依赖 | 4.0s | px | 无 |
| `claude-chat-dark-ask.html` | `ask` | **暗色** Claude 对话（用户/助手气泡 + composer + Auto/Opus 4.8/High 元行 + 加载球） | 4.0s | cqw | 像素吉祥物 mp4 + 3 音效 |
| `claude-chat-dark-responds.html` | `responds` | 暗色对话，全屏终端**morph 下沉成对话窗** + 更长的助手回复 + thinking | 5.0s | cqw | 吉祥物 mp4 + 2 音效 |
| `claude-chat-dark-opener.html` | `opener` ⚠重名 | 暗色 Claude Code 客户端开场（窗口 chrome morph + 消息流 + composer + thinking） | 6.0s | cqw | 吉祥物 mp4 + 5 音效 |
| `claude-chat-dark-finished.html` | `finished` | 暗色，渲染终端 morph 成对话 + "✓ Connected to HeyGen" 工具行 + "All 6 projects finished rendering" | 3.2s | cqw | 吉祥物 mp4 + 2 音效 |
| `claude-composer-prlink.html` | `opener` ⚠重名 | Claude composer + 用户气泡里带 **可点 GitHub PR 链接** + 光标点发送/点链接（带涟漪） | 5.2s | cqw | 吉祥物 mp4 + 6 音效 |
| `claude-composer-soundtrack.html` | `terminal-music` | Claude composer 变体（提问"find me a soundtrack…"），全屏 morph 成浮窗 + 回复行 + 发送 | ~6.8s | cqw | 吉祥物 mp4 ×2 |
| `claude-composer-sfx.html` | `terminal-sfx` | 同上**变体**（提问"add sound effects for the mouse clicks…"）。和 soundtrack 是双胞胎、只换文案，两个都留着方便挑文案 | ~6.8s | cqw | 吉祥物 mp4 ×2 |
| `claude-composer-cta.html` | `cta-outro` | CTA 收尾页，下半是真 Claude Code composer（打字 `use pr-to-video https://github.com/...`），上半 GitHub logo + 标题 | 4.4s | cqw | 6 音效 |
| `claude-chat-markdown-summary.html` | `summarize` | Claude 对话 + **长 markdown 总结自动滚动**（## TL;DR / ## What moved / By the numbers）+ composer | 3.0s | cqw | 3 音效 |
| `claude-terminal-use-skill.html` | `use-skill` | **Claude Code 终端**：用户命令"use pr-to-video to make a video for this pr" + thinking + 工具输出"Reading PR #1635 · 629 files" + composer | 3.8s | cqw | 3 音效 |
| `claude-chat-sessionlimit-modal.html` | `act2-merged-chat` | Claude 对话流（29 条提问灌入）+ composer + **"Session limit reached" 弹窗**。带 bell Lottie（`bell.json` 同目录，缺了也能渲） | 9.05s | px | 无（Inter 用 Google @import） |
| `claude-chat-spiral-modal.html` | `act2b-spiral` | 同上的另一写法（对话螺旋加速 + 会话上限弹窗），纯内联 SVG | 4.0s | px | 无 |

### 🟢 terminal —— 终端 / CLI（4 个）

| 文件 | 内部 id | 演什么 | 时长 | 画幅 | 删了的媒体 |
|---|---|---|---|---|---|
| `terminal-render-progress.html` | `worker` | **`$ hyperframes render` CLI 会话**：✓状态行 + 帧计数 + ASCII 进度条 75% + fps/elapsed/ETA + GPU/worker 状态 + 队列 | 4.6s | px | 1 音效 |
| `claude-terminal-permission.html` | `connect` | **Claude CLI 权限确认框**（最像真 Claude Code）：对话 + `>_ Bash command / hyperframes auth login / Do you want to proceed? 1.Yes 2.… 3.No` + 光标点 Yes | 6.4s | cqw | 吉祥物 mp4 + 8 音效 |
| `terminal-install-flow.html` | `terminal` | 3 个连续 macOS 终端窗口（Stripe→HeyGen CLI 安装流：`stripe projects add` / `curl … \| bash` / `heygen video-agent create`）+ 进度条 + "ready" LED。背景换成了 Stripe 紫渐变（原 bg 图是 LFS 指针） | 14.1s | cqw | bg 图 mp4 |
| `cloud-fleet-dashboard.html` | `fleet` | **云渲染 fleet 仪表盘**："HeyGen Cloud Render · 6 projects" + 6 个 worker 行（帧范围 + 薄荷→青渐变进度条 + ✓done） | 3.6s | cqw | 2 音效 |

### 🟢 vscode-editor —— VS Code / 代码编辑器（3 个）

| 文件 | 内部 id | 演什么 | 时长 | 画幅 | 删了的媒体 |
|---|---|---|---|---|---|
| `code-editor-diff-player.html` | `feature-code` | **暗色代码编辑器 + 视频播放器外壳**：traffic lights + "hyperframes-pr-1635.mp4" + scene 1/6 + 文件头 `fetch-pr.mjs +164 −0` + **语法高亮 JS + 行号** + 橙色 diff 高亮带 + scrubber | 2.4s | cqw | 无 |
| `code-editor-json-typing.html` | `scene-05` | 代码编辑器面板，**逐字打出 `data-composition-variables='[…]'` JSON 数组** + 闪烁光标（语法高亮，JetBrains Mono） | 6.0s | px | 无 |
| `ide-terminal-preview.html` | `cta` | **两栏 IDE 工作台**："Terminal — zsh" 窗口，左=终端打 `npx hyperframes init` + 脚手架输出，右=实时 Preview 面板（迷你画布 + 时间轴 + 流式代码 + Ready 徽标） | 5.28s | px | 无 |

### 🟢 browser —— 浏览器 mockup / 网页揭示（1 个）

| 文件 | 内部 id | 演什么 | 时长 | 画幅 | 删了的媒体 |
|---|---|---|---|---|---|
| `designmd-to-website.html` | `scene-02-diagnosis` | **DESIGN.md 文档面板**（## Style Prompt / Colors 带色块 / Typography / Components）**morph 成网页/浏览器 mockup**（chrome 栏 + `brand.com` URL + 导航 + Get started CTA + hero + 3 卡特性栅格）。⚠ 镜头运动重，真界面只在特定时刻清晰 | 12.4s | px | 无 |

### 🟢 github-pr —— GitHub PR / 代码评审（3 个）

| 文件 | 内部 id | 演什么 | 时长 | 画幅 | 删了的媒体 |
|---|---|---|---|---|---|
| `pr-browser-files-changed.html` | `pr-scroll` | **GitHub PR 浏览器窗口**：chrome + URL 栏（`github.com/heygen-com/hyperframes/pull/1635`）+ Conversation 38 / Commits 4 / Files changed 629 标签 + 评审活动行（头像用 CSS 首字母替代）+ 文件 diff 列表急滚 | 3.2s | cqw | 3 音效（头像 PNG 已用 CSS 首字母替代） |
| `pr-review-conversation.html` | `feature-discussion` | 视频播放器窗 + **PR 评审/对话面板**：reviewer 行（CodeQL/jrusso/miguel… 徽章 security·bot/changes requested/author + 状态药丸 open→resolved）+ 绿色 "ready to merge" 横幅 | 2.0s | cqw | 无（头像已 CSS 化） |
| `pr-credits-roster.html` | `feature-credits` | 视频播放器窗 + **PR 贡献者名册**：头像分组 COMMITTED/REVIEWED/BUILT WITH + 虚线连接 + 名字/角色 + "PR #1635 ✓ ready to merge" | 2.6s | cqw | 无（头像已 CSS 化） |

### 🟡 codex —— Codex 界面
官方源码里 **没有独立的 Codex 子合成**。Codex 界面（连同 Cursor / Claude Code / Gemini CLI）都在 `misc/devtools-coldopen-4ui.html` 里。要单独的 Codex 界面，从那个文件里抠 `.term-codex` 面板，或按「怎么扒新界面」扒真站。

### 🟡 misc —— 其它有复用价值的真界面（9 个）

| 文件 | 内部 id | 演什么 | 时长 | 画幅 | 删了的媒体 |
|---|---|---|---|---|---|
| `devtools-coldopen-4ui.html` | `act-1-cold-open` | **4 个 AI 编码工具界面同屏**：Claude Code 终端 / **Cursor IDE** agent 面板 / **Codex IDE**（New thread/Let's build/GPT 药丸）/ **Gemini CLI**。窗口堆叠扇出。logo 已内联（SVG）/ 用字母替代（缺的 PNG）。**想要 Cursor/Codex 界面就从这抠** | 12.0s | px | 无 |
| `inspector-editor-suite.html` | `inspector-launch-v1` | **最丰富的源**（45s 多场景）：液态玻璃视频播放器 + Claude App 外壳 + **取色器 + 字体选择器 + 编辑器工具栏 + 时间轴 + 字幕编辑器 + 缓动曲线卡**。当"零件仓库"用，抠单个面板复用。HF logo 已内联 | 45s | px | 无 |
| `timeline-editor-clips.html` | `act3-not-anymore` | **视频/时间轴编辑器**：时间刻度尺（0:00–0:30）+ 绿色播放头 + 4 条彩色轨道片段 + 光标拖拽。⚠ 前半是叙事字幕，真编辑器在后半 | 7.5s | px | 无 |
| `batch-render-dashboard.html` | `scene-08` | **批量渲染队列仪表盘**：50 行 `variant-NNN.mp4` 文件名 + 彩色进度条 + 实时百分比 + 自动滚动 | 3.5s | px | 无 |
| `variant-compare-config.html` | `scene-04` | 三个并排"变体"卡，每个带暗色代码浮层显示只读 JSON 配置（hookText/accentColor/creatorClip）数值交换对比（A/原/B）。视频画面已删，只剩配置浮层 | 10.5s | px | 3 个 hook 视频 |
| `compose-tasklist-player.html` | `compose-tasklist` | HeyGen compose app：**7 步任务清单**（dot→play→done+删除线 + 进度条 + x/7 计数）→ **CSS 视频播放器**（SpaceX IPO explainer，$1.0T 硬币爆发，全 CSS 无图） | 10.0s | cqw | 无 |
| `compose-app-full.html` | `compose-ui` | 完整 compose app：Initializing 闪屏 → 任务清单 → CSS 视频播放器（含 scrub/播放/时间）→ 卡片抬起露出 composer 打更正。⚠ 原 Tesla 图是 LFS 缺失，已用 CSS 色块/字母替代（播放器画面会简化） | 13.3s | cqw | 2 个 LFS 图 |
| `compose-app-full-grok.html` | `compose-ui` ⚠重名 | 同上的 **Grok/SpaceX 皮肤**，Tesla SVG 已内联（自带画面），比 claude 版更完整无缺图 | 13.3s | cqw | 无 |
| `captions-overlay-track.html` | `captions` | **字幕/subtitle 叠加轨道**：8 条底部字幕淡入淡出，透明背景，专门叠在视频上用 | 38.7s | px | 无 |

---

## 2. 怎么组合成一条片（多界面拼接）

在一个 master `index.html` 里用 `data-composition-src` 挂多个不同界面，顶层时间线只管**接缝转场**。
完整可渲染示例见 **`example-master.html`**（已验证出画）。核心结构：

```html
<div id="stage" data-composition-id="ui-demo" data-width="1920" data-height="1080" data-duration="18">
  <!-- ⚠ data-composition-id 必须 = 子界面内部 id（见上表「内部 id」列） -->
  <div id="sec-chat"    data-composition-id="chat-response" data-composition-src="claude-code-chat/claude-composer-thinking.html"
       data-start="0"    data-duration="5.0" data-track-index="1"></div>
  <div id="sec-editor"  data-composition-id="feature-code"  data-composition-src="vscode-editor/code-editor-diff-player.html"
       data-start="4.6"  data-duration="3.0" data-track-index="2"></div>
  <div id="sec-term"    data-composition-id="worker"        data-composition-src="terminal/terminal-render-progress.html"
       data-start="7.3"  data-duration="4.6" data-track-index="3"></div>
  <div id="sec-browser" data-composition-id="pr-scroll"     data-composition-src="github-pr/pr-browser-files-changed.html"
       data-start="11.6" data-duration="3.2" data-track-index="4"></div>
</div>
<script>
  // 顶层只做接缝转场；子界面内部动画 HF 自动驱动
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({paused:true});
  tl.set(['#sec-editor','#sec-term','#sec-browser'], {opacity:0}, 0);
  // 接缝：旧场缩+模糊推走，新场交叉淡入 / zoom-through
  tl.to('#sec-chat',  {opacity:0,scale:.96,filter:'blur(8px)',duration:.45,ease:'power2.in'}, 4.45);
  tl.to('#sec-editor',{opacity:1,duration:.42,ease:'power2.out'}, 4.6);
  // …(每个接缝照此，见 example-master.html)…
  window.__timelines["ui-demo"] = tl;
</script>
```

**示例编排**（example-master.html 就是这条）：开场 Claude Code 对话 → 切 VS Code 编辑器 → 切终端跑命令 → 收尾浏览器揭示 PR。

**接缝转场套路**（顶层时间线）：
- **交叉淡入**：旧场 `opacity:0 + scale:.96 + blur(8px)`，新场 `opacity:1`，错开 ~0.15s。
- **zoom-through 穿越**：旧场 `scale:1.08 + blur(14px)` 退，新场 `fromTo scale:.97→1, opacity:0→1, ease:expo.out`。
- **下沉揭示**：旧场 `yPercent:-4 + blur`，新场 `fromTo yPercent:3→0`。
- 每段子界面 `data-duration` 比顶层切换点略长 0.3~0.5s，留出转场重叠（接缝处两层同时在画面上）。
- `data-track-index` 大的在上层（后出现的盖前面的）。

**画幅**：cqw 响应式的文件能换 `--resolution portrait`（竖屏）/`square`；固定 px 的只保证横屏。一条片里尽量混同画幅类型的，或都用横屏。

**音频**（可选加分）：在 master 里挂 `<audio src="bgm.mp3" data-start data-duration data-volume>`（文件要真存在，否则 lint 报错）。原片的打字声/点击声/BGM 都是 LFS 缺失，自己找 CC0 音效补。

---

## 3. 怎么扒新界面 / 补充

库里没有的常见界面（**得靠扒真站补**）：
- **Cursor 完整界面**（库里只有 cold-open 里的一个 agent 面板状态）
- **ChatGPT 网页版 / 桌面版**（完全没有）
- **Codex 网页版真界面**（只有 cold-open 里的简化 IDE 卡）
- **VS Code 真编辑器全貌**（侧栏/标签页/状态栏 —— 库里是"播放器里嵌代码"的包装版；官方 registry `code-snippet-*` 有纯编辑器外壳，可 `npx hyperframes add` 拿）
- Figma / Linear / Notion / Slack 等具体 SaaS 界面

补的办法：
1. `~/Desktop/HF技能调研/源码参考/hyperframes-launches/` 里再挑（107 个，本库只收了真界面的一部分，叙事场景全跳过了）。
2. `npx hyperframes add <名>` 从官方 registry 拿现成块（注意：`code-snippet-*` 系列在本次调研时 registry 暂时拉不到，可重试）。
3. 按本技能 `ui-spec-standard.md` + `npx hyperframes capture <url>` 截真站重画。

---

## 4. 清理做了什么（诚实记录）

- **字体**：原文件全部依赖本地 `fonts/*.woff2`，但那些 woff2 在源仓库里**全是 Git-LFS 指针（~130 字节，没真下载）**。所以本库**没有真字体文件**，`fonts/` 目录留空 —— 全部改用 Google Fonts `<link>`（涉及的字族都在 Google Fonts 上）。少数文件本就用系统字体栈。
- **删掉的 LFS 媒体**：像素吉祥物 `pet-typing.mp4`、各种 `sfx/*.mp3`、背景 `bg-*.mp4`、内容图 `*.webp/*.png/*.jpg` —— 这些在源仓库也是 LFS 指针/缺失。界面本身是 CSS 画的，删了照常渲染（见各文件「删了的媒体」列）。
- **图片替代**：缺失的头像 PNG → CSS 彩色圆圈 + 首字母；缺失的背景图 → CSS 渐变；真实存在的 SVG logo（claude/codex/HF/tesla）→ 内联成 base64 data URI（自包含）。
- **保留**：HF 结构契约（`<template>` / `data-composition-id` / `window.__timelines[id]` / `cqw` 尺寸）原样不动；GSAP/Lottie/CustomEase 的 CDN `<script>` 保留。

### 渲染验证状态
**已出帧确认是真界面**（非白屏）：`claude-composer-thinking`、`claude-plus-menu-connectors`、`claude-app-fullchrome`、`claude-chat-dark-ask`、`claude-terminal-permission`、`terminal-render-progress`、`terminal-install-flow`、`cloud-fleet-dashboard`、`code-editor-diff-player`、`ide-terminal-preview`、`pr-browser-files-changed`、`pr-credits-roster`、`timeline-editor-clips`、`batch-render-dashboard`、`code-editor-json-typing`、`inspector-editor-suite`、`devtools-coldopen-4ui`（Cursor/Codex 面板）、`designmd-to-website`，以及 **4 界面拼接的 `example-master.html`**（整条 18s 出画）。

**已渲染出内容但未逐帧目检**（render 成功、帧体积正常）：其余 claude-code-chat 变体（responds/opener/finished/summary/use-skill/cta/soundtrack/sfx/sessionlimit/spiral）、`grok-composer-thinking`、`pr-review-conversation`、`compose-*`、`variant-compare-config`、`captions-overlay-track`。

**注意点**：
- 很多文件有**入场动画**（元素从 opacity:0 揭示），渲染要**从子界面自己的 t=0 正向播放**才出画；不能靠负 `data-start` 跳帧（`fromTo` 揭示跳不过去）。
- 长文件（inspector 45s、compose 13s、captions 38s、designmd 12s）是多场景/镜头运动的，真界面只在**部分时间段**清晰，挑用时先渲出来看哪一段是你要的界面。
