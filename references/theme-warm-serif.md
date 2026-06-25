# 主题 · warm-serif（Claude 暖橙 + 米/深双底 + 衬线）

**这就是 Claude Design**：官方暖橙 `#CC785C` + 米色/暖深双底 + 衬线。适合科普、知识、人文、沉静叙事。资产：`assets/warm/warm.css` + `warm.js`。源自 transformer-attention 60s 竖屏片（已验证）。

## 色板（颜色有叙事角色）
| token | hex | 用途 |
|---|---|---|
| `--bg-dark` | `#1A1410` | 暖深底 |
| `--bg-cream` / `--bg-cream-2` | `#F5EFE6` / `#EBE3D5` | 米色底（渐变） |
| `--ink` / `--ink-soft` | `#2C2620` / `#5C5249` | 暖黑文字 / 副文字（米底上） |
| `--ink-cream` | `#F5EFE6` | 浅文字（深底上） |
| `--accent` | `#CC785C` | **Claude 暖橙** — 核心强调（焦点/关键词/连线） |
| `--accent-2` / `--accent-dim` | `#E8A07A` / `#8B4A36` | 亮橙数字 / 暗橙阴影 |
| `--muted` / `--muted-line` | `#8B7E72` / `#C9BFB1` | 次要 / 分隔线 |
| `--glow` | `rgba(204,120,92,.45)` | 橙光晕 |

**角色铁律**：🟠 橙=焦点/attention本身 · ⚪ 灰=旧/失效/静默 · 🟡 米=升华/收束。深↔米双底按叙事切换。

## 字体（在 index.html `<head>` 放 Google Fonts `<link>`）
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;500;700&family=IBM+Plex+Mono:wght@300;500&family=Noto+Sans+SC:wght@300;500;900&family=Noto+Serif+SC:wght@300;700;900&display=swap" rel="stylesheet"/>
```
- 中文标题 **思源宋体 Noto Serif SC** + 英文 **DM Serif Display**；字重对比 **300 vs 900**。
- 数字/标签 **IBM Plex Mono** + `tabular-nums`。
- ✅ 全部避开 HF 黑名单（Inter/Roboto/Open Sans/Poppins/Fraunces…）。

## 组件（warm.css）
| class | 是什么 |
|---|---|
| `.bg-dark` / `.bg-cream` | 双底舞台（加在 `.scene` 上） |
| `.display-xl/-lg/-md/-thin` | 标题梯队（140/110/84/92px，900 或 300） |
| `.sub` / `.sub-cream` | 说明文字（Light 42px） |
| `.label` / `.label-dim` / `.tag` | eyebrow / 章节标 / 徽章（Mono） |
| `.num` | 暖橙等宽数字 |
| `.orb` `.grain` `.vig` | 暖橙光球 / 颗粒 / 暗角 |
| `.scene-content` | 9:16 安全区（上下 100px 内边距、居中） |

## 动效助手（warm.js → window.WarmKit）
```js
var sc=document.getElementById('s1');
WarmKit.mountBG(sc, [{x:-120,y:-160,size:560,op:.5}]);  // 颗粒+暗角(+可选暖橙光球)
var tl=gsap.timeline({paused:true});
WarmKit.charIn(tl,'#s1-title',0.2,{stagger:.04});       // 钩子标题逐字升起
WarmKit.F(tl,'#s1-sub',{y:40,autoAlpha:0},{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},1.8);
tl.to('#orb',{scale:1.18,duration:2,yoyo:true,repeat:1,ease:'sine.inOut'},0.5); // mid-scene 呼吸
window.__timelines["main"]=tl;
```
- counter（如 0→72%）：`tl.to(obj,{val:72,duration:1.2,ease:'power2.out',onUpdate:...})`，末段可加反弹更"落定"。
- 连线/边粗细映射权重：SVG `<line>` + `strokeDashoffset` 动画 + `stroke-width` 映射数值。

## 节奏与转场（来自 9 场 60s 范式）
- 每场 5–9s；入场 0.3–0.8s、长 hold 1.5–3s；每场必有 mid-scene 活动。
- **电影级转场 = warm 高级感的关键**：用 HyperShader（calm 选 `cross-warp-morph`/`light-leak`/`cinematic-zoom`），只在 1–3 处叙事跃迁，其余硬切。**接法见 `structure-and-rules.md` 第 5 节**，权威全文见 `claude-design-spec.md`。
- 竖屏主标题 ≥110px；上下 100px 安全区。

> **warm = Claude Design**：本主题就是 HeyGen 官方「Claude Design」暖色系的落地。做正片务必读 `claude-design-spec.md`（骨架/动效模式库/反 AI 字体清单/自检表）。
> **暗角默认关**：`warm.js` 已不注入 `.vig`（用户不喜欢周围发黑）。要边缘压暗只在确有电影需求时手动加，且要很轻。
