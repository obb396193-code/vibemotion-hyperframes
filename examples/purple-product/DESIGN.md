---
name: 高级包装套件 · 紫色镀铬
colors:
  bg0: "#0a0420"   # 最深底
  bg1: "#1c0c44"
  bg2: "#3c1c72"   # 极光高光
  vio: "#9a6cff"   # 主强调（紫）
  vio2: "#7a4cff"
  ink: "#eef0ff"   # 主文字
  muted: "#c9c4e8"
  dim: "#8a82b8"
typography:
  display: "AliPuHui (阿里巴巴普惠体 Heavy)"   # 标题/镀铬
  mono: "IBM Plex Mono"                        # 行号/代码/标签
  sans: "PingFang SC Light"                    # 正文注释
rounded: 30px
---

# 高级包装套件 设计规范

紫色极光 + 镀铬立体字 + 玻璃拟态。对标"电商/综艺级包装"，纯代码（Hyperframes）可复现 ~90%。

## 颜色
- 底：径向渐变 `bg2 → bg1 → bg0`（中心偏上亮）。
- 强调：`--vio #9a6cff`（紫），高亮/行号/边框发光都用它。
- 文字：主 `--ink`，注释 `--muted/--dim`。

## 字体（字重对比要狠）
- 标题：普惠体 Heavy（镀铬只在它上面做）。
- 行号/代码/英文标签：IBM Plex Mono。
- 正文注释：PingFang Light(300)。
- ⚠️ `@font-face` 必须**内联在每个合成的 index.html**（外链 CSS 的字体路径渲染时解析不到）。

## 组件（全在 kit.css）
| class | 是什么 | 关键 |
|---|---|---|
| `.prem` | 紫色极光舞台底 | 加在 `.scene` 上 |
| `.chrome` + `data-text` | 镀铬 3D 立体字 | kit.js 自动生成 4 层；金属面静态，靠呼吸辉光 |
| `.glass` | 玻璃拟态卡 | backdrop-blur + 顶部高光 + 内发光 |
| `.pill`(`.on`) | 玻璃胶囊按钮 | on=高亮态 |
| `.head-frame`(`.circle`) | 真人口播框 | 放视频时把 `background` 换成你的画面 |

## 动效（由 kit.js 提供）
- `PremKit.mountBG(scene)` 注入背景层
- `PremKit.chromeAll()` 把所有 `.chrome` 变镀铬
- `PremKit.bgDrift(tl)` 极光漂移
- `PremKit.chromeIn(tl,'#sel',t)` 标题入场 + 呼吸辉光
- 遵循 motion-principles：ease/时长/方向错开、`fromTo`、build-breathe-resolve。

## Do / Don't
- ✅ 紫色为主、银白镀铬为高光、克制用色。
- ✅ 镀铬只给**大标题**；正文别镀铬（小字看不出，发糊）。
- ❌ 别把 @font-face 放 kit.css；别用 `<img>` 引本地图（渲染 404，用内联 SVG 或 HTTPS）。
- ⚠️ 镀铬只能到 ~85%；要 100% 质感的大标题，**出 PNG 素材**叠上去（PS 图层样式 / AI 文生图 "chrome 3D text"）。
