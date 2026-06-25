# 素材联网采办（Agent 去找真实优质素材 / logo / 字体 / 精灵图）

有时候不该全靠生成——真实的品牌 logo、游戏精灵图、像素字体、图标，**联网找现成的更像真的、更好看**。这是把"Agent 主动联网找好素材"沉淀成方法。

## 何时联网找
- 需要**真实品牌 logo**（Claude/OpenAI/GitHub…）→ 不要自己画。
- 需要**游戏精灵图/角色帧动画**（像素小人、地形、道具）→ 找 CC0 资源包。
- 需要**特定字体**（像素字、衬线、等宽）→ 字体平台。
- 需要**真实界面/网页**当演示 → 自己写好看的 HTML 再 playwright 截图（见 clip-recommend 做法）。

## 可靠来源（按"代理友好度"排序）
> 经验：**npm install / git clone 比 curl 稳**（curl 走代理常 000/卡死）。jsdelivr 给浏览器(playwright/HF)直连一般可用，给 curl 不一定。

| 类型 | 来源 | 取法 |
|---|---|---|
| 品牌 logo | `simple-icons`、`gilbarbara/logos` | `npm i simple-icons`；或 `<img src=jsdelivr/gh/gilbarbara/logos/...>` |
| 线性图标 | `lucide-static` | `npm i lucide-static` → 抠 svg inner 内联 |
| 像素游戏精灵 | itch.io **PixelFrog "Pixel Adventure"**(CC0)、**Kenney.nl**(CC0)、OpenGameArt(CC0) | git clone 镜像仓库 / 下载包，本地化到 assets/ |
| 英文像素字 | **Press Start 2P**（Google Fonts / `@fontsource/press-start-2p`）| npm 或 `<link>` |
| 中文像素字 | **Zpix**（github SolidZORO/zpix-pixel-font，OFL）| git clone / 下载 ttf |
| 中文/英文优质字 | Google Fonts（Noto Serif SC、DM Serif、Plus Jakarta、Instrument Serif…）| `<link>` 放合成 `<head>` |
| 照片/纹理 | Unsplash(HTTPS 直链) | 谨慎热链；或自己生成 |

## 许可证铁律
- 优先 **CC0 / 免费可商用 / OFL**。
- **在工程 README 记下每个素材的来源 + 许可证**（SKILL大冒险 就是范例）。
- 不用来源不明、可能侵权的图（尤其真人/截图/他人作品）。

## 本地化 & 渲染适配（重要）
- 找到后**下载进 `assets/`**，离线可跑（录屏/复现都稳）。
- **HF render**：本地 `<img src="./x.png">` 会 404 → 转 **base64 data-URI** 或用 HTTPS。字体本地 woff2 用内联 `@font-face`。
- **playwright 录屏**（SKILL大冒险 那条管线）：本地文件直接能用，无 404 问题。
- 精灵图帧动画：CSS `steps(帧数)` + `background-position`，帧数必须和图对上。

## 取法示例
```bash
npm i lucide-static simple-icons @fontsource/press-start-2p   # 图标/logo/英文像素字
git clone --depth 1 <zpix-repo> assets/zpix                   # 中文像素字（git 比 curl 稳）
# 像素游戏素材：clone 资源包仓库 → 复制 run/idle/jump/terrain 到 assets/
```
然后：HF 用 → PIL/脚本把 png 转 data-URI 打包 `sprites.js`；playwright 用 → 直接相对路径引用。
