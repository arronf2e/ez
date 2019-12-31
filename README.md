<div align="center">

# Ez

![download](https://img.shields.io/npm/dm/@ez-fe/cli)
![version](https://img.shields.io/npm/v/@ez-fe/cli)

</div>

### Ez 是什么?

Ez 是一个极速零配置的前端脚手架.

### Ez 有哪些特点?

1. 集成了 `webpack` 的各种优化, 配置了项目开发常用到的 `loader` 和 `plugin`, 原则上可实现零配置开发.
2. 使用 `webpack-chain` 的方式进行配置, 可以更加灵活的对 `webpack` 配置进行修改.
3. 可拔插的生产环境、测试环境、开发环境切换(开发服务自动重启).
4. 完善的 `typescript` 支持(包含配置文件).

## 安装

<details open=“open”>

 <summary>安装</summary><br/>

```bash
# npm 全局安装
npm i -g @ez-fe/cli
# npm 本地安装
npm i @ez-fe/cli -D
```

```bash
# yarn 全局安装
yarn global add @ez-fe/cli
# yarn 本地安装
yarn add @ez-fe/cli -D
```

</details>

<details open=“open”>

 <summary>配置/使用</summary><br/>

```bash
ez init <project-name> # 创建项目
ez dev # 开发项目
ez build # 构建项目
ez info # 查看项目及系统配置
```

</details>

## Features

### Init

可选择的初始化模板

- [x] app (后台管理项目 react-admin)
- [x] package (包)
- [x] readme

### Dev

```bash
# 基于测试环境启动开发服务
ez dev --target test
```

### Build

```bash
# 构建生产环境代码
ez build --target production
```

## Contributing

欢迎提出请求。 对于重大更改，请先打开一个问题以讨论您要更改的内容。

请确保适当更新测试。

## License

[MIT](https://choosealicense.com/licenses/mit/)
