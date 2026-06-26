# fonts/（故意留空）

原始发布片里所有字体（Hanken Grotesk / Newsreader / Spline Sans Mono / Inter / JetBrains Mono 等）
在源仓库里**都是 Git-LFS 指针**（~130 字节，没真下载），所以这里**没有真 woff2 可收**。

本库所有界面文件已改用 **Google Fonts `<link>`** 取字体（这些字族都在 Google Fonts 上），渲染机联网即可。
少数文件用系统字体栈（无需联网）。

如果以后拿到真 woff2，放这里，再把对应文件的 `<link>` 换回 `@font-face { src: url(../fonts/<file>) }` 即可。
