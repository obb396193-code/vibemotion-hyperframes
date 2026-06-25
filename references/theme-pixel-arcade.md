# 主题 · pixel-arcade（复古像素游戏风）✅已验证

游戏机/街机像素风。适合**游戏类比、目录/进度转场、对战/评分卡、技能栏**等"好玩、符号化"的段落。
验证片：`SKILL大冒险.mp4`（精灵图平台跳跃）、厨师/标准像素版（HF 数据URI）。

> **背景两选一**：
> 1. **自家游戏场景**（推荐做"游戏感"段）——天空渐变 + **联网找的 CC0 草地/地形瓦片**（Pixel Adventure 的 grass_top/dirt，CSS 平铺 + `image-rendering:pixelated`），像 SKILL 大冒险那样。范例见 `examples/pixel-skill-adventure/`。
> 2. **统一极光底**（想和全片背景一致时）——像素前景放紫黑/暖色极光上。
> 别默认套紫色：要游戏感就用游戏场景；纯黑只在确实要街机 CRT 感时用。

## 两条管线（按需求选）

### A. HF + 数据URI 精灵（做像素 UI / 对战 / 评分卡）—— 推荐做"卡片式"
- 用 **PIL** 在小网格(32px)上画精灵 / 阈值化渲染中文像素字 → 最近邻放大 → base64 打包 `sprites.js`。
- HF 合成里 `<img class="px" data-sp=..>` + `image-rendering:pixelated`，GSAP 用 `ease:"steps(n)"` 做步进动效。
- 背景挂 `prem`(紫) 或 `bg-dark`(暖) 保持全片一致。
- 例：厨师对战 / 好坏 Skill 评分卡。

### B. GSAP + 真实精灵图 + playwright 录屏（做角色平台跳跃 / 长转场）
- 联网找 **CC0 角色精灵图**（Pixel Adventure：run 12帧 / idle 11帧 / jump + 地形 + 道具，见 `asset-sourcing.md`）。
- CSS `steps(帧数)` 播 `background-position` 帧动画；GSAP 时间轴驱动小人跑位、节点点亮、台词弹出。
- **不是 HF render**，用 `record.js`（playwright-core）录屏出 mp4 → 本地素材无 404。
- 例：SKILL大冒险 横版闯关目录转场。

## 字体
- 英文/数字：**Press Start 2P**（街机感，`@fontsource/press-start-2p` 或 Google Fonts）。
- 中文：**Zpix**（git clone）；或 PIL 把普惠/思源字阈值化成像素 PNG（无字体依赖、最稳）。

## 视觉要点
- `image-rendering:pixelated`（所有精灵/图）。
- 步进动效：`ease:"steps(2~6)"`、待机弹跳 `yoyo+repeat`、VS 砸入 + 震屏（整场 `x` 抖几帧 `steps(1)`）。
- CRT 叠加（可选）：`repeating-linear-gradient` 扫描线 + 暗角。
- 星级/✓✗/奖杯等像素图标用 PIL 画或精灵图。

## 确定性
- 同共用铁律：`steps()` ease 允许；yoyo+有限 repeat；无 Math.random/Date.now。
- 帧动画的 `steps(N)` 必须等于精灵图帧数。

## Do / Don't
- ✅ 文字越少越带感；像素是"招牌动作"，用在比喻/转场，不堆正文。
- ❌ 别拿像素风讲一大段需要看清的代码/描述（那种用 purple/warm 的清爽卡）。
