# purple-product —— 紫色镀铬玻璃 范例

产品发布 demo,用 `purple-glass` 主题(我们自己对照参考图扒出来的"原始规范")。

## 文件
- `index.html` —— 合成本体(镀铬标题 + 玻璃规格卡 + 图标点亮 + 极光漂移)。引用技能自带 `../../assets/purple/`(kit.css / kit.js / fonts)。
- `DESIGN.md` —— ⭐**原始紫色规范**(色板/字体/组件/动效),purple-glass 主题的源头,等同 warm 的 DESIGN.md。
- `HOWTO.md` —— 这套底板怎么搭一个合成(照抄步骤)。

## 跑
```bash
cd <本目录>   # 注意 index.html 里资产路径相对技能根:../../assets/purple/
npx hyperframes render . -o out.mp4 -w 1 --resolution landscape
```
> 资产引用是相对"合成目录到技能根"的;若把本范例拷出去单独跑,把 `../../assets/purple/` 改成你放 kit.css/kit.js/fonts 的相对路径。

## 关系
- 完整主题规范见 `references/theme-purple-glass.md`(本 DESIGN.md 的提炼+用法)。
- 通用结构/铁律见 `references/structure-and-rules.md`。
