# Contributing to quick-form-h5

感谢你愿意贡献！欢迎提交 Issue、PR，或在讨论区提出问题。

## 环境要求

- Node.js ≥ 18，npm ≥ 9

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务（默认内嵌 mock，无需后端）
npm run dev

# 需要本地 mock 服务器时（另开一个终端）
npm run mock
```

## 代码规范

项目使用 ESLint + Prettier，请保持格式统一：

```bash
# 检查代码规范
npm run lint

# 自动格式化
npm run format
```

提交前请确保 `npm run lint` 通过。

## 测试

```bash
# 运行单元测试
npm test

# 监听模式（开发时）
npm run test:watch
```

新增逻辑请尽量补充测试（测试文件与被测模块同名，如 `utils/device.test.js`）。

## 构建验证

```bash
npm run build   # 生产构建
```

## 提交信息约定

请使用 [Conventional Commits](https://www.conventionalcommits.org/) 风格，例如：

```
feat: add date picker to form components
fix: correct phone validation on page3
docs: update deployment instructions
refactor: extract image upload into the api layer
```

## 提交流程

1. Fork 本仓库并新建特性分支：`git checkout -b feat/your-feature`
2. 完成修改，运行 `npm run lint`、`npm test`、`npm run build` 全部通过
3. 提交并推送你的分支
4. 发起 Pull Request，描述改动内容与验证方式

## Issue 规范

提交 Bug 时请附上：复现步骤、期望结果、实际结果、运行环境（Node 版本、浏览器）。功能建议请说明使用场景。

## License

参与即代表同意以 [MIT](LICENSE) 许可贡献你的代码。
