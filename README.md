# react-ssr-dome
这个是一个react服务器渲染的 学习项目

## 工程命令

### 本地启动工程

``` bash
# 安装依赖
yarn install

# 初次配置需要执行，生成 vendor.dll 文件
yarn run dll

# 启动工程
yarn run dev
```

### 执行打包

```bash
# 使用生产环境配置打包
yarn run build

# 启动工程
yarn start
```

# 目录结构
```html
react-ssr-dome   -主工程目录
|---build   - 工程构建目录，包含了，开发，上线中所用到的构建脚本及插件
    |---plugins   - 构建中所用到的自定义插件
    |---utils.js  - 打包常用方法
    |---webpack-base-config.js    - 通用 webpack 配置
    |---webpack-dev-config.js     - 客户端开发环境 webpack 配置
    |---webpack-prod-config.js    - 客户端生产环境 webpack 配置
    |---webpack-dll-config.js     - 客户端 webpack dll 配置
    |---webpack-server-config.js  - 服务端 webpack 配置
|---config  - 构建配置文件，包含静态资源路径，接口代理地址等
|---node_modules    - 项目依赖目录
|---server  - 工程启动目录
    |---dev-server.js    - 开发环境配置文件
    |---index.js         - 工程启动文件
    |---renderer.js      - 服务端生成 html 配置文件
|---client
    |---.eslintrc.js      - 项目代码 eslint 配置文件
    |---server.ejs        - 模板文件
    |---entry-client.js   - 客户端打包入口
    |---entry-server.js   - 服务端打包入口
|---static-dll  - 不参与webpack打包的静态资源
    |---js  - 不参与webpack打包的静态js (第三方通用组件)
|---.babelrc.js           - babel 配置文件
|---.editorconfig         - 编辑器 配置文件
|---.eslintrc.js          - 工程代码 eslint 配置文件
|---.gitignore            - git 提交配置
|---postcss.config.js     - postcss 配置文件
|---package.json          - node node配置文件
|---README.md             - 项目说明文件
```

## 待解决问题
```
1、暂时不支持css热更新
    原因： mini-css-extract-plugin 不支持
    解决方案：开发时不使用 mini-css-extract-plugin 使用 style-loader
    (暂未解决)
  
2、代码错误时不能把错误覆盖到DOM上显示
    原因 未知  (大概就 webpack-hot-middleware 的问题)
```

## 已解决问题 (之前使用webpack都没解决的问题)
```
1、在 webpack.mode 配置为 production 模式时 打包失败
     原因 使用babel7.x的全家桶时, @babel/preset-env 不能编译部分es6的语法
     解决方案：targets: 设置 "chrome": "58", "ie": "11" 把es6解析成es5
```
