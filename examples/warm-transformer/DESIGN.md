# Design System · Transformer Attention 60s

基于 Claude Design 暖色衍生，针对 9:16 纵屏深 / 浅双底切换。

## Color Palette

| Token | Hex | 用途 |
|-------|-----|------|
| `--bg-dark` | `#1A1410` | 暖深底（S1/S4/S5/S6/S9）|
| `--bg-cream` | `#F5EFE6` | 米色底（S2/S3/S7/S8）|
| `--bg-cream-2` | `#EBE3D5` | 米底渐变端 |
| `--ink` | `#2C2620` | 暖黑主文字（深色 on 米底）|
| `--ink-soft` | `#5C5249` | 副文字 |
| `--ink-cream` | `#F5EFE6` | 浅文字（米色 on 深底）|
| `--accent` | `#CC785C` | Claude 暖橙 — 核心强调色（attention、关键词、connection）|
| `--accent-2` | `#E8A07A` | 亮橙 — 数字标签 |
| `--accent-dim` | `#8B4A36` | 暗橙 — orb 阴影 |
| `--muted` | `#8B7E72` | 灰褐 — 次要 |
| `--muted-line` | `#C9BFB1` | 分隔线 |
| `--glow` | `rgba(204,120,92,0.45)` | 橙色光晕 |

## Typography

权重对比拉到极致（300 vs 900），完全避开 HyperFrames 黑名单（Inter / Roboto / Open Sans / Poppins / Outfit / Playfair / Fraunces / Nunito / PT Sans）。

| Class | Font | Weight | Size | 用途 |
|-------|------|--------|------|------|
| `display-xl`   | Noto Serif SC + DM Serif Display | 900 | 140px | S1 主钩子 |
| `display-lg`   | Noto Serif SC + DM Serif Display | 900 | 110px | S2 强调 |
| `display-md`   | Noto Serif SC | 700 | 84px | 次级标题 |
| `display-thin` | Noto Serif SC | 300 | 92px | S1 副句、S6 主句 |
| `sub` / `sub-cream` | Noto Sans SC + DM Sans | 300 | 42px | 说明文字 |
| `label` / `label-dim` | IBM Plex Mono | 500/300 | 28px | eyebrow / 章节标 |
| `tag` | IBM Plex Mono | 500 | 32px | head 徽章 / 类目标签 |

中文主字体 **思源宋体（Noto Serif SC）** + 英文 **DM Serif Display**。
数字与等宽统一 **IBM Plex Mono** + `font-variant-numeric: tabular-nums`。

## Spacing & Layout

- Canvas: **1080 × 1920** (9:16)
- 安全区: 上下 100px 内边距
- Scene 内主元素竖向 gap: 60–120px（视场景层级而定）
- Token chip 间距: 14–24px（横向）

## Motion Principles

- **每场必有 mid-scene activity**：glow pulse / 缓慢呼吸 / 漂浮 / counter / 旋转
- **缓动多样化**：每场至少 3 种 ease（power2.out / back.out / sine.inOut / expo.out）
- **入场 0.3–0.8s**，长 hold 1.5–3s
- **角色对位**：橙色 = attention 本身；灰色 = 旧 / 失效 / 静默；米色 = 升华 / 收束

## Shader Transitions

仅在两处叙事跃迁使用：

1. **S1 → S2** · `cinematic-zoom` 0.6s（从黑暗钩子推进入米色具体场景）
2. **S6 → S7** · `cross-warp-morph` 0.6s（从信息密集 → 升华静定）

其余 7 处采用硬切，保持节奏紧凑。

## 反 AI 套路检查

- ✓ 无 Inter / Roboto 等被禁字体
- ✓ 无 SVG filter data URL（用 CSS radial-gradient grain）
- ✓ 无 `Math.random()` / `Date.now()` / `repeat: -1`
- ✓ 无 base64 媒体 / 占位 URL
- ✓ 字号符合纵屏最小标准（main headlines ≥ 110px）
