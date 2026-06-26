# 官方成片·可复用视觉配方（从 HeyGen 官方发布片提炼）

> 用途：官方 launches 成片之所以"贵/好看"，是**几套反复出现的视觉配方**。这里把它们拆成可复用 recipe——做新片时挑一个配方当起点。**配方是结构/技术，颜色按你选的主题 token 调（正交，别绑死）。**
> 出处样片：`别人的HF好片/heygen-hyperframes-launches/`（stripe / variables / spacex / timeline）。

## 官方"贵"的 5 条通用原则（先记这个，比配方更重要）
1. **大量留白**：一屏一个主体，周围空。别塞满。
2. **质感来自纹理+渐变+柔阴影**，不是堆元素：halftone 网点 / 渐变底 / 浮起卡的大柔阴影。
3. **超大字 + 逐字/逐词出**：标题占屏，`SplitText` 逐字/逐词揭示。
4. **强调色只点一两处**：全片克制，关键词/关键帧才上强调色（见正交：色来自主题 token）。
5. **真实 mockup**：浏览器窗/手机框/对话界面——真界面比抽象图形可信（接 `realistic-ui-and-web.md` Route B / `ui-library`）。

---

## 配方 1 · 质感发布片（stripe 款）
**何时用**：产品/功能发布、"高级感"包装、酷炫概念。
**关键配料**：
- 渐变底（stripe=橙→紫；**颜色按主题调**：紫色主题→紫蓝、暖色→橙米）。
- **halftone 网点颗粒**叠在渐变上 → ⚠️ 必须用 **CSS `radial-gradient` 网点**（`background-size:6px 6px`），**禁 SVG filter**（确定性铁律）。
- **浮起的白/玻璃窗口 mockup**（红绿灯条 + 大柔阴影 `0 40px 120px -40px`）。
- 窗口里：绿色终端命令(`> heygen video-agent create`) 或 分步骤**超大无衬线标题逐字出**(`SplitText`)。
- 大量留白。
**怎么搭**：主题 purple-glass 或 warm-serif 外壳 + halftone底 + Route B 窗口 mockup + SplitText 标题。

## 配方 2 · 卡点字幕口播（variables 款）
**何时用**：真人口播/UGC、讲解配画外音、抖音带货式。
**关键配料**：竖屏手机框 + 真人/视频素材 + **加粗逐词大字幕**（关键词上强调色 cyan/渐变）；可多框并排展示"批量/多版本"。
**怎么搭**：**素材重 → 走姊妹技能 `vibemotion-remotion`**；纯 HF 里要字幕 → registry `caption-highlight`/`caption-pill-karaoke`（喂 `{text,start,end}`）。

## 配方 3 · AI 对话演示（spacex 款）
**何时用**：讲 prompt/agent 交互、AI 工具科普（**对中文 AI 科普最对口**）。
**关键配料**：真实对话 UI（输入框打字 + 光标点击 + 气泡冒出 + thinking）。
**怎么搭**：直接用 `ui-library/claude-code-chat/` 现成界面，或按 Route B 扒/复刻。已有范例 `examples/routeB-realistic-ui/`。

## 配方 4 · Kinetic Typography 文字片（variables 文字段）
**何时用**：金句、观点、转折节拍、纯文字钩子。
**关键配料**：克制底（白/米/深）+ **逐词揭示**(`SplitText` type:words) + **关键词单独上强调色/渐变** + 干净节奏。
**怎么搭**：任意主题 + `gsap-plugins.md` 的 SplitText；强调色用主题 token。配合 `storyboard-pacing.md` 的"文字节拍"。

## 配方 5 · UI 功能演示（timeline 款）
**何时用**：演示某个工具/功能怎么用（也正是**录屏替代**的活）。
**关键配料**：真界面 + **高亮扫过/光标点击/逐行演示** 指出功能点。
**怎么搭**：`ui-library` 取对应界面（VS Code/编辑器/终端）+ 假鼠标 + mint 高亮逐行扫（见 `storyboard-pacing.md` 微指导）。

---

## 配方 6 · 竖屏分屏带货（may-shorts 款 —— 对你抖音最对口）
**何时用**：真人口播 + 要点卡的抖音/Reels 竖屏。
**关键配料**：**上半屏 = 可控 MG 卡**（tracked-caps eyebrow「WHAT THEY WANT」+ 编号 `01` + 图标 + 大字标签逐个出）；**下半屏 = 真人口播视频** + **加粗卡点字幕**（关键词单独上强调色 cyan）。上屏管"结构/清单"，下屏管"人味讲述"。
**怎么搭**：素材重(口播视频) → 走 `vibemotion-remotion`；上屏 MG 卡用任意主题；字幕用 registry `caption-*`。

## 配方 7 · 合集/目录漂浮卡（hypecard 款）
**何时用**：推荐合集、作品集、"N 个 X" 目录类（如"推荐 N 个 Skill"）。
**关键配料**：暗底上**一片漂浮卡片网格**（带真实纹理/封面，轻微 3D 景深错落）+ **一个 hero 物件**(唱片/主卡)聚焦中心。
**怎么搭**：purple-glass 或 warm 外壳 + 卡片用 Route B 真界面/真封面 + GSAP 漂浮(yoyo 有限) + 一个主体放大聚焦。

## 配方 8 · 技法菜单 / 编号片（sizzle 款）
**何时用**："N 个技巧/N 个要点/N 个 Skill"、快速建立审美锚点的合集片。
**关键配料**：**编号目录**，每段 3–5s demo 一个点；统一**标题母题 = `#01` tracked-caps eyebrow + 巨字(白 + 关键词强调色)**。
**怎么搭**：任意主题 + SplitText 巨字 + 每段一个硬切；编号母题贯穿全片当连续性装置。

> **反复出现的标题母题（记下来直接用）**：`#编号` tracked-caps 小标 + **巨字标题(主色白/墨 + 关键词单独强调色)** + 逐字/逐词出。官方几乎每条片都在用——它就是"贵且统一"的最小公约数。

> **别只用这 8 个**：配方是从现有成片提炼的**起点**，不是上限。看官方新片 / 自己做出好套路，就**新增配方**（先渲染验证）。挑配方 = 挑"画面长什么样的套路"，和选主题(颜色)、选技术(渲染方式)三者**各自独立、自由组合**。
