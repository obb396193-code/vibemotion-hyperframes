# GSAP 全家桶（付费插件现已全免费）· 在 vibemotion 里怎么用得好

GSAP 2024 底被 Webflow 收购后，**原 Club 付费插件全部免费**。已在 HF 渲染里**实测确定性可用**（见 `examples/gsap-plugins/`）。

> **别把下面当全集**：插件会更新/还有更多（Observer、Physics2D、CustomEase、Inertia、CustomBounce…）。**做片前先去 `github.com/greensock/GSAP` 的 README/`dist/` 或 gsap.com 文档看当前有哪些**，按这条片要讲的内容挑。下面只给科普最常用的几个 + 选用方法。

## 接法（CDN + registerPlugin）
`<head>` 里在 hyperframe runtime **之前**加（版本钉 3.13）：
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MorphSVGPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MotionPathPlugin.min.js"></script>
```
脚本里、建时间轴**之前**：`gsap.registerPlugin(SplitText, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin);`

## 核心思路：按「你在讲什么」选插件，不是按好看选
> 科普片的动效应该**就是解释本身**——线画出来 = 在讲关系，形状变形 = 在讲"变成"。别拿插件当装饰。

| 你在讲… | 用 | 为什么贴 |
|---|---|---|
| **关系 / 连接 / 流程**（A 关注 B、X→Y、注意力连线） | **DrawSVG** | 边说边把线"画"出来——线的出现就是关系的建立。原 transformer 的"连线映射权重"正是这个 |
| **变化 / 升级 / 一物变另一物**（旧 RNN→Transformer、圆→星、概念 A morph 成 B） | **MorphSVG** | 形状真的**变形**过去，"变成"被演出来，不是切换 |
| **钩子标题入场**（冲击力） | **SplitText** | 拆字/词逐个升起；支持中文（按字拆）。比手搓 charIn 稳 |
| **过程 / 循环 / 数据流动**（迭代闭环、数据沿管道走） | **MotionPath** | 小球/图标沿真实路径走，把"流动/循环"画出来 |
| **重排 / 整理 / 前后对比**（乱→整、卡片换位） | **Flip** | 记录前态→改 DOM→`Flip.from()` 自动补间，演"重组" |

## 抄即用片段（确定性安全）
```js
// 1) SplitText —— 标题拆字(中文可)。必须在建时间轴前同步 split
var split = new SplitText("#title", { type: "chars" });
tl.from(split.chars, { y: 90, autoAlpha: 0, duration: .6, ease: "back.out(1.5)", stagger: 0.06 }, 0.6);

// 2) DrawSVG —— 连线/箭头自绘（讲关系）
tl.fromTo("#edge", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.0, ease: "power2.out" }, 1.6);

// 3) MorphSVG —— 圆→星 / A→B（讲变化）；两者都得是 <path>
tl.to("#shape", { morphSVG: "#targetPath", duration: 1.0, ease: "power3.inOut" }, 2.6);

// 4) MotionPath —— 沿路径运动（讲流动/循环）
tl.to("#dot", { motionPath: { path: "#flowPath", align: "#flowPath", autoRotate: true }, duration: 2.0, ease: "none" }, 1.0);

// 5) Flip —— 布局重排（讲整理/对比）
var st = Flip.getState(".card");           // 改 class/DOM 顺序后…
Flip.from(st, { duration: .7, ease: "power3.inOut", stagger: .05 });
```

## 三套主题怎么搭
- **warm-serif（科普主力）**：SplitText 做衬线标题逐字升起；**DrawSVG 画连线/图表**（Claude Design 动效库里"SVG stroke draw / 连线映射"现在用真插件实现）；MorphSVG 做概念变形。最受益。
- **purple-glass**：DrawSVG 做发光强调线；MorphSVG 做图标互变。⚠️镀铬 `.chrome` 是多层结构，**别对它用 SplitText**（会拆乱分层）——拆字用普通文字标题。
- **pixel-arcade**：SplitText 配 `ease:"steps(n)"` 做块状逐字；DrawSVG/Morph 用得少（像素靠精灵图）。

## 确定性铁律（HF 渲染必守）
- ✅ `SplitText` 在**页面加载时同步** new 出来，再 tween `split.chars`（别异步、别渲染中再 split）。
- ✅ stagger 用 `from:"start"/"center"/"end"`，**禁 `from:"random"`**。
- ✅ DrawSVG/MorphSVG/MotionPath 都是在时间轴上补间数值 → 可 seek、确定性。MorphSVG 两端必须是 `<path>`。
- ✅ `registerPlugin` 在建 `tl` 之前；插件脚本在 hyperframe runtime 之前加载。
- ❌ 不用 `ScrollTrigger`（滚动触发，渲染视频用不上）。

> 上面 5 个只是科普最常用的**起点**，不是上限。要更花的物理/缓动/形状，**主动去 `greensock/GSAP` 仓库或 gsap 文档挑当前可用的**，照同样的"按你在讲什么选"思路用即可。
