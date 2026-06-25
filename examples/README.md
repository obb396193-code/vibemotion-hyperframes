# 完整范例工程（每套主题一个真实可渲染的参考）

这些是**验证过的真片源工程**，当模板用：要做新片时，挑对应主题的范例，照它的结构/分场/动效改内容。

| 目录 | 主题 | 来源 / 成片 | 看点 |
|---|---|---|---|
| `warm-transformer/` | warm-serif | Transformer 注意力 60s 竖屏（`coding视频/ClaudeHF+gsap+claudedesgin+transformer-attention.mp4`） | 9 场结构、深↔米双底切换、counter、连线映射权重、`DESIGN.md` 完整规范 |
| `pixel-skill-adventure/` | pixel-arcade | SKILL 大冒险（`coding视频/SKILL大冒险.mp4`） | 横版平台跳跃、**联网找的 CC0 精灵图**(run/idle/jump + 地形 + 西瓜)、GSAP 帧动画 `steps()`、playwright 录屏(`record.js`) |
| `purple-product/` | purple-glass | 我们做的产品发布 demo | 镀铬标题 + 玻璃规格卡 + 图标点亮；含 **`DESIGN.md` 原始紫色规范** + `HOWTO.md` 搭法 + README，引用技能自带 `assets/purple/` |
| `gsap-plugins/` | 通用 | GSAP 付费插件实测 | **SplitText 拆字 + DrawSVG 自绘 + MorphSVG 圆→星**，已渲染验证；配 `references/gsap-plugins.md` |

## 怎么跑
- warm / purple（HF）：`cd <目录> && npx hyperframes render . -o out.mp4 -w 1 --resolution <portrait|landscape>`
- pixel（B 管线）：`cd pixel-skill-adventure && python3 -m http.server 8777` 浏览器看；出片用 `record.js`(playwright)。

## 注意
- `warm-transformer/` 自带 `DESIGN.md`（色板/字体/动效/反套路清单）——这就是 warm 主题规范的源头，值得细读。
- `pixel-skill-adventure/assets/` 里是**真实 CC0 素材**（Pixel Adventure / Zpix / Press Start 2P），可直接复用，来源与许可见其 `README.md`。
- 范例已剔除 node_modules（用到时 `npm i` 或走 npx）。
