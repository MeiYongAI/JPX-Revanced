# JPX-Revanced

JPX-Revanced 是适用于 [HentaiVerse](https://hentaiverse.org/) 的战斗辅助用户脚本，在 JPX 的基础上持续维护和调整。

## 安装

需要先安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)。

[点击安装 JPX-Revanced](https://raw.githubusercontent.com/MeiYongAI/JPX-Revanced/main/JPX-Revanced.user.js)

脚本管理器会根据脚本头部的 `@version` 自动检查更新。

## 主要功能

- 可配置的战斗规则与快捷键
- 自动进入下一轮、AJAX 换轮和自动结束战斗
- 技能与物品冷却、状态持续时间、怪物信息和生命值显示
- 战斗记录、收益统计和历史数据筛选
- 悬浮控制面板与深色界面

## 最近更新

### 26.07.30.2

- 同步上游 `2026.07.27`：点击统计表中的日期可回放对应战斗，物品单价与分项收益按最新缓存价格显示。
- 避免原生页面初始化事件导致战斗处理重复执行，降低统计记录重复的概率。
- 修正消耗品余额精度和每日精力额度为空时的计算。

## AJAX 换轮

- `自动下一轮`：当前轮次结束后自动进入下一轮。
- `AJAX 下一回合`：不刷新整个页面，仅更新战斗区域。
- 如果其他用户脚本无法适配 AJAX 更新后的页面，请关闭 `AJAX 下一回合`，恢复 HentaiVerse 原生跳转。

## 使用

安装后进入 HentaiVerse，通过页面上的 JPX 悬浮面板打开设置。首次使用建议先检查战斗模式、规则和快捷键，再按需开启自动功能。

## 问题反馈

发现问题时，请在 [GitHub Issues](https://github.com/MeiYongAI/JPX-Revanced/issues) 提交复现步骤、脚本版本、浏览器与脚本管理器信息。
