# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| latest (`master`) | ✅ |

## Reporting a Vulnerability

请**不要**通过公开 Issue 报告安全问题。请通过以下方式私下报告：

- 在仓库 **Security → Report a vulnerability** 提交漏洞报告（推荐）
- 或发送邮件至 `liuhuakangk@163.com`

我们会尽快评估并回复。感谢你的负责任披露。

## Known Risks & Dependencies

本项目基于 Vue 2（官方已停止维护，EOL）。依赖审计使用：

```bash
npm audit --registry=https://registry.npmjs.org
```

当前审计已知风险如下，均如实披露：

| 依赖 | 风险 | 说明 |
| --- | --- | --- |
| `vue@2.7.x` | ReDoS（GHSA-5j4c-8p2g-v4jx） | Vue 2 已 EOL，无官方修复。仅在解析**不可信 HTML** 时可能触发；本项目不使用 `v-html`，不渲染外部 HTML，实际风险较低。 |
| `vue-template-compiler` | 构建期 XSS（GHSA-g3ch-rx76-35fx） | 仅用于**构建时**编译模板，产出的运行时产物不受该漏洞影响。 |
| `vitest` / `tinypool` | RCE（GHSA-5gmw-xhrv-c9v3 等） | **仅 devDependency**，只在本机/CI 测试环境运行，**不进入生产构建产物**。 |
| `axios@1.x` | 无已知漏洞 | — |

> 若后续将项目迁移至 Vue 3，以上 Vue 相关风险可彻底消除；迁移不在当前维护计划内，但欢迎贡献（见 [Roadmap](README.md#roadmap候选方向)）。

## Safe Usage

- 本项目使用 `v-text` / `v-model` 渲染用户输入，不使用 `v-html`。
- 上传的图片仅以 data URL 在前端展示，不触发服务端解析。
- 使用 `'remote'` 模式接入自己的后端时，请自行对服务端接口做好鉴权与输入校验。
