# CloudCIA后台管理平台

## 目录说明:

### config 和 scripts
webpack的配置 (一般不改)

### public
静态资源

### build
打包之后的文件

### src
> 源码存放的地方

#### assets
需要编译的静态资源文件

#### components
存放公共组件的地方

#### configs
整个项目的配置

#### entrances
每个应用的入口，每个文件代表一个应用入口

#### layouts
整个项目的布局，用Layout为结尾 如: ``` baseLayout.js ```

#### mocks
每个应用的mock数据入口， 每个文件代表一个应用

#### routers
每个应用的路由入口， 每个文件代表一个应用

#### services
每个应用的api入口， 每个文件代表一个应用

#### utils
整个项目的一些公共的js文件

#### views
业务组件存放的地方

## 模块化css
必须采用命名*.module.less。 如: index.module.less， 不然是模块化css不会生效

## 快速启动

启动项目
```shell
npm run start
```
打开某个指定的项目
```shell
set START_ENV=项目名称(entrances下的某个文件名)&& node scripts/start.js
```

打包指定项目
```shell
set BUILD_ENV=项目名称(entrances下的某个文件名)&& node scripts/build.js
```