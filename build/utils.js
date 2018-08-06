const chalk = require('chalk');
const browserSync = require('browser-sync').create();
const proxy = require('http-proxy-middleware');
const path = require('path');
const cheerio = require('cheerio');
const through2 = require('through2');
const artTem = require('art-template');

const conf = require('./conf');

const REG_EXCHANGE = /\\/g;
const REG_RESOURCE = /(?:href|src)[ ]*=[ ]*['"]([^'"]*)['"]/g;
const REG_PATH = /['"]([^'"]*)['"]/g;

/**
 * 输出linux的路径
 * @param {String} path 要转换的路径
 * @return {String} 转换后的路径
 */
const pathSep = path => path.replace(REG_EXCHANGE, '/');
const cache = {};
/**
 * 基于chalk 的彩色日志函数
 */
const debug = () => {
  return {
    info(text) {
      return console.log(
        chalk.bold.bgCyan(
          `[${new Date().toString().substring(16, 24)}] ---> ${text}`
        )
      );
    },
    debug(text) {
      return console.log(chalk.bgCyan.bold(text));
    },
    warn(text) {
      return console.log(chalk.yellow.bold(text));
    },
    error(text) {
      return console.log(chalk.red.bold(text));
    },
    silent(text) {
      return console.log(chalk.underline.blue(text));
    }
  };
};

const log = debug();
/**
 * 初始化服务和代理
 * @param {Object} dev 开发配置
 * @param {Array} dev.proxy 常规代理配置，通过glob语法
 * @param {String} dev.proxy.target 代理目标地址
 * @param {Array} dev.proxy.pathRules 代理路径 globs语法
 * @param {Object} dev.customerProxy 自定义函数代理配置，
 * @param {Function} dev.customerProxy.filter 代理函数，返回true，代理
 * @param {String} dev.customerProxy.target 代理目标地址
 */
function initServerProxy(dev) {
  let proxyList = [];
  customerProxy = dev.customerProxy;
  /* 配置globs代理 */
  dev.proxy &&
    dev.proxy.forEach(item => {
      if (item.pathRules && item.target) {
        proxyList.push(
          proxy(item.pathRules, {
            target: item.target,
            changeOrigin: true,
            logLevel: 'debug',
            logProvider: debug
          })
        );
      } else {
        debug.warn(`proxy配置错误：${item.target}}`);
      }
    });
  /* 自定义filter代理 */
  if (customerProxy) {
    proxyList.push(
      proxy(customerProxy.filter, {
        target: customerProxy.target,
        changeOrigin: true,
        logLevel: 'debug',
        logProvider: debug
      })
    );
  }
  browserSync.init({
    ghostMode: conf.browserSyncOption,
    server: {
      baseDir: conf.EVN_PRO,
      middleware: proxyList
    },
    logLevel: 'info',
    port: dev.port,
    logPrefix: dev.logPrefix
  });
}

/**
 * 抽取include 文件夹下的html，
 * 同时把src或者href ===> 转换为绝对路径
 * 并在cache._html 中缓存include>html
 * 并在cache._art 中缓存include>art,key均为路径
 */
function includeToAbsolutePath() {
  return through2.obj(function(chunk, enc, cb) {
    const f = pathSep(chunk.path),
      ext = path.extname(f);
    let res = null;
    // to html
    if (ext === '.html') {
      res = htmlToAbsolutePath(chunk);
      // to art
    } else if (ext === '.art') {
      res = artToAbsolutePath(chunk);
    }
    this.push(res);
    cb();
  });
}

/**
 * html 模板资源路径转换为决定路径
 * @param {Object} chunk 文件流块
 * @return {Object} 返回处理好的chunk
 */
function htmlToAbsolutePath(chunk) {
  const f = pathSep(chunk.path),
    dir = path.dirname(f),
    c = chunk.contents.toString('utf8'),
    $ = cheerio.load(c),
    $e = $('[src],[href]');
  // 转换
  $e.each((index, ele) => {
    const $ele = $(ele);
    const src = $ele.attr('src');
    const href = $ele.attr('href');
    if (src) {
      $ele.attr('src', pathSep(path.join(dir, src)));
    }
    if (href) {
      $ele.attr('href', pathSep(path.join(dir, href)));
    }
  });
  // gobal 缓存
  if (cache._html) {
    cache._html[f] = $;
  } else {
    cache._html = {
      [f]: $
    };
  }
  chunk.contents = Buffer.from(c, 'utf8');
  return chunk;
}

/**
 * art-template 模板资源缓存（路劲转换在最后一步）
 * @param {Object} chunk 文件流块
 * @return {Object} 返回处理好的chunk
 */
function artToAbsolutePath(chunk) {
  const f = pathSep(chunk.path),
    dir = path.dirname(f),
    c = chunk.contents.toString('utf8');
  // 替换路径
  // const res = c.replace(REG_RESOURCE, (match, p1) => {
  // 	return match.replace(p1, pathSep(path.join(dir, p1)));
  // });
  // 缓存
  const renderFn = artTem.compile(c);
  if (cache._art) {
    cache._art[f] = renderFn;
  } else {
    cache._art = {
      [f]: renderFn
    };
  }
  chunk.contents = Buffer.from(c, 'utf8');
  return chunk;
}

/**********  在html中解析include，script[typef='include'] *************/
/**
 * _n_file...为当前文件路径
 * _i_file...为include文件路径
 * 转换include标签为实际内容
 * 把html文件中引用include的部分转换为真实文件
 */
function exchangeInclude() {
  return through2.obj(function(chunk, enc, cb) {
    // 变量
    const c = chunk.contents.toString('utf8'),
      p = pathSep(chunk.path),
      dir = path.dirname(p),
      $ = cheerio.load(c, {
        decodeEntities: false
      }),
      $i = $('include, script[type="include"]');
    // 转换
    $i.each((index, ele) => {
      resolveIncludeFile($(ele), p);
    });
    chunk.contents = Buffer.from($.html(), 'utf8');
    this.push(chunk);
    cb();
  });
}

/**
 * _n_file...为当前文件路径
 * _i_file...为include文件路径
 * 处理include file，包含art 和 html
 * @param {Object}  $ele cheerio Element
 * @param {String} _n_absPath 当前文件路径，非include路径
 */
function resolveIncludeFile($ele, _n_absPath) {
  const src = $ele.attr('src'),
    _n_dir = path.dirname(_n_absPath),
    _i_absPath = pathSep(path.join(_n_dir, src)),
    _i_ext = path.extname(_i_absPath);
  let $in;
  // for html
  if (_i_ext === '.html') {
    $in = cache._html[_i_absPath];
    if (!$in) {
      log.error(
        `include html文件无法找到，源文件${_n_absPath}，include文件：${_i_absPath}`
      );
    } else {
      const $replace = cheerio.load($in.html());
      resourceToRelative($replace, _n_dir);
      $ele.replaceWith($replace('head > *, body > *'));
    }
    // for art
  } else if (_i_ext === '.art') {
    $in = cache._art[_i_absPath];
    if (!$in) {
      log.error(
        `include art文件无法找到，源文件${_n_absPath}，include文件：${_i_absPath}`
      );
    } else {
      let htmlStr,
        data = getRenderData($ele);
      // 处理模板编译问题
      try {
        htmlStr = $in({
          data
        });
      } catch (e) {
        log.error(
          `art模板编译错误，源文件${_n_absPath}，include文件：${_i_absPath},`
        );
        log.error(`传入的数据为${JSON.stringify(data, '', '  ')}`);
        log.error(e);
        htmlStr = `<p style="color:red">模板编译错误，源文件${_n_absPath}，include文件：${_i_absPath}</p>`;
      }
      const $ = cheerio.load(htmlStr);
      artPathExchange($, _n_dir, path.dirname(_i_absPath));
      $ele.replaceWith($('head > *, body > *'));
    }
  }
}

/**
 * 获取art模板render数据
 * @param {Object}  $ele cheerio Element
 * @return {Object} 返回数据
 */
function getRenderData($ele) {
  const ele = $ele[0],
    tag = ele.tagName.toLowerCase();
  let data,
    dataStr = tag === 'script' ? $ele.html() : '';
  if (!dataStr || tag === 'include') {
    dataStr = $ele.attr('data');
  }

  // 假定为JSON
  try {
    data = JSON.parse(dataStr);
  } catch (e) {}
  // 假定为对象
  if (!data) {
    try {
      eval(`data=${dataStr}`);
    } catch (e) {}
  }
  // 空对象
  if (!data) {
    data = {};
  }
  return data;
}

/**
 * 把include文件中的src href路径，改为相对路径
 * 如果元素上含有 exchange-to-relative="off"，则不对路径进行转换
 * @param {Object} $ cheerio DOM 对象
 * @param {String} r 当前html的文件路径
 * @return {Object} 返回修改后的cheerio DOM 对象
 */
function resourceToRelative($, r) {
  $('[src],[href]').each((index, ele) => {
    const $ele = $(ele);
    const src = $ele.attr('src');
    const href = $ele.attr('href');
    const flag = $ele.attr('exchange-to-relative') === 'off';
    if (flag) return;
    if (src) {
      const resPath = pathSep(path.relative(r, src));
      $ele.attr('src', resPath);
    }
    if (href) {
      $ele.attr('href', pathSep(path.relative(r, href)));
    }
  });
}

/**
 * 把编译好的art文件中的资源路径转换为正确的相对路径
 * 如果元素上含有 exchange-to-relative="off"，则不对路径进行转换
 * @param {Object} $ cheerio DOM 对象
 * @param {String} _n_dir 当前html文件路径
 * @param {String} _i_dir include文件路径
 * @return {Object} 返回修改后的cheerio DOM 对象
 */
function artPathExchange($, _n_dir, _i_dir) {
  $('[src],[href]').each((index, ele) => {
    const $ele = $(ele),
      src = $ele.attr('src'),
      href = $ele.attr('href');
    const flag = $ele.attr('exchange-to-relative') === 'off';
    if (flag) return;
    if (src) {
      const resPath = pathSep(
        path.relative(_n_dir, pathSep(path.join(_i_dir, src)))
      );
      $ele.attr('src', resPath);
    }
    if (href) {
      const resPath = pathSep(
        path.relative(_n_dir, pathSep(path.join(_i_dir, href)))
      );
      $ele.attr('href', resPath);
    }
  });
}

/**
 * 在pipe中显示详情
 */
function showDetail() {
  return through2.obj(function(chunk, enc, cb) {
    console.log(chunk.contents);
    console.log(chalk.bold.bgCyan(chunk.path));
    this.push(chunk);
    cb();
  });
}

/**
 * 记录原始scss文件路径
 */
function recordPath() {
  return through2.obj(function(chunk, enc, cb) {
    chunk.__originPath = chunk.path;
    this.push(chunk);
    cb();
  });
}

/**
 * 改变文件路径
 */
function changeOuput() {
  return through2.obj(function(chunk, enc, cb) {
    let str = chunk.__originPath;
    const REG_FILENAME = /([^\\]+)(?=\.scss)/g;
    const REG_SCSS = /scss/g;
    if (!str) {
      debug.warn('changePath 函数需要配合recordPath使用');
    } else {
      str = str.replace(REG_FILENAME, conf.globs.scssOutputfileName);
      str = str.replace(REG_SCSS, 'css');
      chunk.path = str;
    }
    this.push(chunk);
    cb();
  });
}

/**
 * gulp任务等待
 * @param {Number} num 等待时长ms
 */
function wait(num = 500) {
  return through2.obj(function(chunk, enc, cb) {
    let timer = setTimeout(() => {
      timer = null;
      log.info(`Wait:Waited ${num}ms`);
      this.push(chunk);
      cb();
    }, num);
  });
}

module.exports.recordPath = recordPath;
module.exports.changeOuput = changeOuput;
module.exports.showDetail = showDetail;
module.exports.debug = debug;
module.exports.initServerProxy = initServerProxy;
module.exports.includeToAbsolutePath = includeToAbsolutePath;
module.exports.exchangeInclude = exchangeInclude;
module.exports.browserSync = browserSync;
module.exports.wait = wait;
