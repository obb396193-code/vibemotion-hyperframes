# Transformer 注意力机制 · 60s 抖音科普

HyperFrames + GSAP 制作的 60 秒纵屏（1080×1920，9:16）AI 科普短视频。

**主题**：用一句日常话「猫坐在垫子上 因为它累了」，讲清 Transformer 的 Attention 机制为什么取代了 RNN。

**视觉**：Claude Design 暖色系（warm orange + cream + 衬线）。

---

## 项目结构

```
transformer-attention-video/
├── index.html      # 主合成（结构 + 内联样式）
├── script.js       # GSAP 时间轴 + SVG 边图形
├── preview.html    # HyperFrames 播放器壳
├── meta.json
├── README.md       # 本文件
└── DESIGN.md       # 色板 / 字体 / 间距规范
```

---

## 本地预览

### 路线 1 · 简单浏览器预览（无需安装）

直接在浏览器里打开 `index.html`，会自动播放 GSAP 时间轴。适合快速看动效。

```bash
open index.html
# 或
python3 -m http.server 8000   # 然后 http://localhost:8000/index.html
```

### 路线 2 · HyperFrames Studio（推荐 — 帧准确 + HMR）

```bash
# 需要 Node 22+ 与 ffmpeg
brew install ffmpeg
npx hyperframes preview
```

浏览器自动打开 `http://localhost:3002`，支持逐帧 scrub 与热重载。

---

## 导出 MP4

```bash
npx hyperframes render index.html -o transformer-attention.mp4 \
    --resolution 1080x1920 --fps 30
```

抖音上传建议：

- 1080×1920 / 30fps / H.264 / 8–12 Mbps
- 封面用 S5 中段（"它 → 猫 72%"）或 S9 slogan 帧

---

## 9 场结构

| # | 时间 | 时长 | 钩子 | 动效 |
|---|------|------|------|------|
| S1 | 0–5 | 5s | 你以为 ChatGPT 在「读」你的话？ | char stagger + glow |
| S2 | 5–12 | 7s | 例句出现，「它」高亮闪烁 | drop + pulse |
| S3 | 12–19 | 7s | 旧 RNN：读到结尾忘了开头 | 连线 + 词褪色 |
| S4 | 19–28 | 9s | Transformer：每个词同时看所有词 | 6 节点全连接 fan-out |
| S5 | 28–37 | 9s | 「它」72% 关心猫 | counter + 边粗细映射权重 |
| S6 | 37–45 | 8s | 多头注意力 — 4 种视角 | 4 head 切换 + 色差 |
| S7 | 45–52 | 7s | 它不是在记，是同时看见一切 | dramatic + sweep |
| S8 | 52–57 | 5s | READ → SEE | 左右对比 + glow |
| S9 | 57–60 | 3s | Slogan + 账号 | char stagger |

Shader 转场 2 处：S1→S2、S6→S7。其余硬切。

---

## 还可以做什么（Claude Code 后续打磨）

- **配音**：S1 钩子如果配上口播会更冲，可上 Seedance / ElevenLabs / 火山方舟 TTS
- **BGM**：参考 Audio First Edit 方法论，先选 BGM 反向调节奏（S3 卡点最关键）
- **细节**：S5 的 counter 现在是 0→72 线性，可换 power2.out + 末段反弹更有"落定"感
- **抖音改写**：S1 改 "ChatGPT 凭什么懂你 90% 的话" 更带数字钩子
- **二刷副本**：S6 多头部分如果想再拆细，可以拉出来做 P02 单集
