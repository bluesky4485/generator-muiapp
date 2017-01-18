# generator-muiapp [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> muiapp archtype

## Installation

First, install [Yeoman](http://yeoman.io) and generator-muiapp using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g bluesky4485/generator-muiapp
```

Then generate your new project:

```bash
yo muiapp
```

### Install form local
```
git clone https://github.com/bluesky4485/generator-muiapp.git
cd generator-muiapp
npm install
npm link
yo muiapp
```

## 整合进度
2017-1-18
完善`yo generator`的`index.js`中的处理，已经能完整生成一个安卓项目了。

template目录中base目录中的内容是会被作为模版处理后放到指定位置的。目前关于安卓的配置文件是否有必要包含不确定，至少本机测试是包含进去没啥问题。


2017-1-17
仅包括generator的结构和app的项目代码，还未在js中对app的项目代码进行处理

### app包含功能
mui的示例工程，就是将mui的示例工程做了Android Studio的离线打包，并增加扫码和自定义第三方插件的示例。后续会更新更多的常用功能进去。

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [黄科]()


[npm-image]: https://badge.fury.io/js/generator-muiapp.svg
[npm-url]: https://npmjs.org/package/generator-muiapp
[travis-image]: https://travis-ci.org/bluesky4485/generator-muiapp.svg?branch=master
[travis-url]: https://travis-ci.org/bluesky4485/generator-muiapp
[daviddm-image]: https://david-dm.org/bluesky4485/generator-muiapp.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/bluesky4485/generator-muiapp
