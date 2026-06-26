# 界面规范标准（扒任何真界面都照这份填）

> 用途：要做某个产品的拟真界面而**库里没有**时，按这份**标准模板**把它的规范「扒全」并填成一份 spec —— 四样（色/字/图标/版式）都对齐到真产品，才会「一眼像真」。模板结构仿官方 launches 的 `DESIGN.md` + 实测 `opener.html` 的 token 心得。
> 配合 `realistic-ui-and-web.md` 的「0) 规范从哪来」用：先选来源(A 已有 / B 扒真站 / C 复刻)，再用这份模板把规范落成文。

---

## 一份界面 spec 必含的 8 块

### 0. 元信息
- 产品名 / 界面类型（对话·终端·编辑器·浏览器·PR…）/ 来源（网址 or 截图来源）/ 目标画幅（横/竖/方）。

### 1. 配色 token（最关键，逐个标用途，用 hex）
按层级扒全，别只取两三个色：
| 类 | 要扒的 | Claude Code 实测样板 |
|---|---|---|
| 背景层级 | 窗/页 · 面板/卡 · 输入框 | `#1D1F1F` · — · `#2C2C2B` |
| 边框 | 默认 · hover | `#3a3a38` |
| 文字 | 主 · 次 · 弱/占位 | `#E6E2D6` · `#7C7B73` · `#8C8B83` |
| 强调 | 主强调(caret/链接/品牌) | 橙 `#D97757` |
| 状态 | 成功 · 警告 · 错误 | 薄荷 `#3CE6AC` · 琥珀 `#CAA43E` · — |
| 特殊 | 红绿灯 · spinner · 徽章底 | `#FF5F57/#FEBC2E/#28C840` · `#5A9BE6` · `rgba(202,164,62,.16)` |
> 怎么扒：devtools 看它 `:root{--xxx}` CSS 变量（很多产品色板直接在这）或 `getComputedStyle(el).color/backgroundColor`；没网页就截图用吸管逐处取。**chrome-devtools MCP `evaluate_script` 能批量读。**

### 2. 字体
- 家族：latin 主字体 + CJK 兜底（字体栈按字形回退，如 `'Hanken Grotesk','Noto Sans SC'`）；代码区单独的等宽。
- 字重：实际用到的（400/500/700…）。
- 来源：`@font-face` 的 woff2（下成本地，见 `realistic-ui-and-web.md` ①）/ Google Fonts `<link>`。
- 用途：标题 / 正文 / 代码 / 数字各用哪个。
> Claude Code 样板：界面 = Hanken Grotesk；终端/代码 = JetBrains Mono。

### 3. 图标
- 来源：真站 DOM 复制 inline SVG / 它用的图标库（Phosphor·Lucide·Octicons·自家）。
- 清单：列出要用到的（发送·加号·麦克风·勾·spinner·文件夹…）+ viewBox。
- ❌ 不自己画近似图标。

### 4. 尺寸体系（**用 `cqw`/`cqh`，不用 px**——比例精准的关键）
- 把容器设 `container-type:size`，所有宽高/圆角/字号/间距用 `cqw`（=容器宽 1%）。换画幅自动缩放。
- 圆角刻度：小(徽章) · 中(按钮/输入) · 大(卡/窗)。
- 字号刻度：正文 · 次要 · 标题 · 大标题。
- 间距刻度：紧 · 默认 · 段落 · 区块。

### 5. 阴影 / 效果
- box-shadow 层次（卡/窗的柔阴影 hex+rgba）；克制原则（很多产品「边框 > 阴影」）。
- backdrop-filter（毛玻璃）/ 选区色 / 描边宽度。

### 6. 结构 / 布局（界面由哪些区块拼成）
- 自上而下列区块 + 各自定位/层级。例（Claude Code）：窗(红绿灯条) → feed(右对齐用户气泡 + 左对齐 AI 回复) → composer = 芯片行(Local/CC) + 输入框(文字+橙 caret`▏`+右`↵`) + 状态行(Auto·＋·Opus 4.8·High·旋转 orb)。

### 7. 动效 / 交互（让它「活」+「像真人用」）
- 入场：各区块怎么进（cut-in / fade / stagger）。
- micro-interaction：打字逐字、按钮点击缩弹、spinner→check、caret 闪（`steps(1)` yoyo）。
- 假鼠标（可选）：SVG 光标 + GSAP，**用 `getBoundingClientRect` 精确落到目标键上**（别估坐标）。
- 转场：界面之间用接缝（crossfade / zoom-through / cut-the-curve）。

---

## 扒法速查（每块怎么拿到）
| 要扒 | 怎么拿 |
|---|---|
| 色板 | devtools 读 `:root` CSS 变量 / `getComputedStyle` / 截图吸管；chrome-devtools `evaluate_script` 批量读 |
| 字体 | devtools Network 筛 font 看 woff2 / CSS 里 `@font-face` → `curl` 下（走代理） |
| 图标 | DOM 右键元素 Copy outerHTML / 找它图标库 |
| 间距·圆角·阴影 | 读 CSS / devtools Computed 面板 / 截图量 |
| 结构 | 看 DOM 层级 / 截图拆区块 |

## 质量自检（扒完过一遍）
- [ ] 色板**逐层**扒全了（背景层级/文字三档/边框/强调/状态/特殊），不是只抓两三个色？
- [ ] 字体是**真的**（woff2/Google Fonts），不是系统字凑？
- [ ] 图标用**真 SVG**，没自己画近似？
- [ ] 尺寸用 **`cqw`** 不是 px？
- [ ] 凭这份 spec，**不看原图也能复刻出「一眼像真」**？四样（色/字/图标/版式）齐了吗？

> 填好的 spec 就存进 `ui-library/<界面>/SPEC.md`，下次同界面=「来源 A 已有」直接用，不用再扒。
