# Lottie 动画零件（直接用设计师 AE 导出的 .json 精致动画）

> HF 原生支持 Lottie。可把 AE/设计师做好导出的 `.json` 动画当**现成精致零件**贴进片。**两个技能都能用**：HF 里想贴一两个就用下面这套(已验证)；素材重/要批量 → 走姊妹技能 `vibemotion-remotion`。

## 已备（`assets/lottie/`）
| 文件 | 是啥 | 科普用途 |
|---|---|---|
| `claude-thinking.json` ⭐ | **真·Claude 思考动画**(橙色星芒,20KB) | AI thinking/loading 节拍,讲"AI 在想/在跑"直接用 |
| `Robot.lottie` | 机器人 | AI/agent 拟人 |
| `bell.lottie` | 铃铛 | 提醒/通知节拍 |
> 验证范例:`examples/lottie-thinking/`（真渲出画的完整工程，照它改）。

## 怎么用（确定性安全，已实测）
1. 加载 lottie-web：`<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js"></script>`
2. 加载动画——**用 `animationData` 内联 JSON，别用 `path`**：
```js
var anim = lottie.loadAnimation({container:el, renderer:'svg', loop:false, autoplay:false, animationData: <把 .json 内容直接内联进来>});
anim.goToAndStop(0,true);
```
3. GSAP 逐帧驱动（autoplay:false 杀掉 rAF，GSAP 成唯一时间源 → 可 seek、确定性）：
```js
var proxy={f:0}, total=animData.op||91;
tl.to(proxy,{f:total*2,duration:5,ease:'none',onUpdate:function(){anim.goToAndStop(proxy.f % total,true);}},0.2); // %total = 循环 2 圈
```

## 红线（违反 = 白屏/抖动）
- ❌ **别用 `path:'assets/x.json'`**——本地文件在 HF render 会 404(`.lottie` 是 zip 同理)。**JSON 必须内联成 `animationData`**。
- ❌ `autoplay` 必须 `false`、`loop` 必须 `false`——循环/时序全交给 GSAP `goToAndStop` 控。
- ✅ `renderer:'svg'`（lottie 画进 SVG DOM，HF 合成器正常截）。

## 拿更多
- **LottieFiles**(lottiefiles.com)找 CC0/免费的：loading、✓勾选、箭头、庆祝、图标 reveal、思考点……（科普常用）。下 .json 后内联即可。
- ⚠️ AE 有些特效 Bodymovin 不支持，导出后**先在浏览器里验证 JSON** 再用。
> 备的这 3 个只是起点——缺什么去 LottieFiles 找/让设计师导出，别只用现成的。
