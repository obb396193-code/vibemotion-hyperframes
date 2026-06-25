# SKILL 大冒险 — 像素闯关时间轴 Demo

横版像素游戏风格的开场/转场动画：粉色小人沿地面奔跑，依次通过 5 个知识点节点
（是什么 / 区别 / 创建 / 安装 / 写好·邪修），每到一个节点就升旗、点亮、吃掉漂浮西瓜、
弹出搞笑台词，最后 LEVEL CLEAR。用于视频里的"目录/进度"转场。

## 运行
```
cd skill-timeline-demo
python3 -m http.server 8777
# 浏览器打开 http://localhost:8777/index.html
```
全部资源已本地化，离线可跑（适合录屏）。1920×1080，自动缩放适配窗口。
点右下角 ↻ REPLAY 重播。

## 录屏建议
- 浏览器全屏（F11），用 QuickTime / OBS 录 1920×1080 区域。
- 想要纯净画面：F12 控制台 `document.getElementById('replay').style.display='none'` 后重播。

## 怎么改
- 节点文字 / 台词：`index.html` 里的 `NODES` 数组。
- 节奏：每个节点停留时长 = timeline 里的 `tl.to({},{duration:1.35})`；跑速 = `tl.to(hero,{...duration})`。
- 换角色：替换 `assets/run.png`（12帧）、`idle.png`（11帧）、`jump.png`，并改 CSS 里对应的
  `background-size` 和 `steps()` 帧数。

## 素材来源（均为免费 / CC0 系）
- 角色 Pink Man / 地形 / 西瓜：Pixel Adventure 资源包
  （github.com/quindipc/pixel-adventure，源自 itch.io PixelFrog "Pixel Adventure"，CC0）
- 中文像素字体 Zpix（github.com/SolidZORO/zpix-pixel-font，MIT/OFL）
- 英文像素字体 Press Start 2P（Google Fonts，OFL）
- 动画库 GSAP 3.12（GreenSock，免费标准许可）
