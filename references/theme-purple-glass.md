# 主题 · purple-glass（紫色极光 + 镀铬立体字 + 玻璃拟态）

电商/综艺级包装审美，纯代码可复现 ~90%。资产：`assets/purple/kit.css` + `kit.js` + `fonts/`。

## 色板
| token | hex | 用途 |
|---|---|---|
| `--bg0` | `#0a0420` | 最深底 |
| `--bg1` | `#1c0c44` | |
| `--bg2` | `#3c1c72` | 极光高光 |
| `--vio` | `#9a6cff` | 主强调(紫)·高亮/行号/边框发光 |
| `--vio-2` | `#7a4cff` | |
| `--ink` | `#eef0ff` | 主文字 |
| `--muted` `--dim` | `#c9c4e8` / `#8a82b8` | 注释/次要 |

底 = 径向渐变 `bg2 → bg1 → bg0`（中心偏上亮）。

## 字体（字重对比要狠）
- 标题/镀铬：**AliPuHui（阿里普惠 Heavy）** — 镀铬只在它上面做。
- 行号/代码/英文标签：**IBM Plex Mono**。
- 正文注释：**PingFang SC Light(300)**。
- ⚠️ `@font-face` 内联在合成 `<head>`：
  ```html
  @font-face{font-family:"AliPuHui";src:url("<相对路径>/AliPuHui.woff2") format("woff2");}
  @font-face{font-family:"Mono";font-weight:500;src:url("<相对路径>/IBMPlexMono-500.woff2") format("woff2");}
  ```

## 组件（全在 kit.css）
| class | 是什么 | 关键 |
|---|---|---|
| `.prem` | 紫色极光舞台底 | 加在 `.scene` 上 |
| `.chrome` + `data-text="标题"` | 镀铬 3D 立体字 | kit.js 自动生成 4 层；金属面静态，靠呼吸辉光 |
| `.glass` | 玻璃拟态卡 | backdrop-blur + 顶部高光 + 内发光；圆角 30px |
| `.pill`(`.on`) | 玻璃胶囊按钮 | on=高亮态 |
| `.head-frame`(`.circle`) | 真人口播框 | 放视频时把 background 换成画面 |

## 动效助手（kit.js → window.PremKit）
```js
var sc=document.getElementById('s1');
PremKit.mountBG(sc);              // 注入极光×3 + 光带 + 编织 + 扫描 + 暗角
PremKit.chromeAll();              // 把所有 .chrome 变镀铬
var tl=gsap.timeline({paused:true});
PremKit.bgDrift(tl, 4.4);         // 极光确定性漂移(yoyo)
PremKit.chromeIn(tl,'#s1 .chrome',0.3);   // 标题缩放去模糊入场 + 呼吸辉光
PremKit.F(tl,'#card',{autoAlpha:0,y:40,scale:.95},{autoAlpha:1,y:0,scale:1,duration:.6,ease:'back.out(1.5)'},1.0);
window.__timelines["main"]=tl;
```
- 卡片点亮：`tl.to('#card',{boxShadow:'0 0 56px rgba(154,108,255,.55), ...', borderColor:'rgba(190,170,255,.75)'}, t)`。
- 图标：用 Lucide 线性图标 inline（`<svg viewBox="0 0 24 24" stroke="currentColor" ...>`），不放 emoji/3D 图标。

## Do / Don't
- ✅ 一帧一个核心意思、留白足；技能芯片墙/玻璃卡/镀铬标题是招牌。
- ❌ 别堆成 PPT；别用纯黑底(底必须是紫色极光，要和全片一致)；别给元素叠太多发光。
