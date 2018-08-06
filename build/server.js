/**
 * 为IE8而启动的开发服务（共用和dev时同样的代理配置），
 * 不包含代码变动浏览器自动刷新功能
 * @author jinglf000
 * @date ###### Mon May 28 09:22:52 CST 2018
 */

const express = require('express');
const path = require('path');
const cdr = require('child_process');
const proxy = require('http-proxy-middleware');
const conf = require('./dev-config');
const debug = require('./utils').debug;
const port = conf.dev.ie8Port || 10000;

const app = express();

console.log(process.env.PORT);

app.set('port', process.env.PORT || port);

app.use(express.static(path.join(__dirname, '../dist')));

conf.dev.proxy.forEach(item => {
  app.use(proxy(item.pathRules, {
    target: item.target,
    changeOrigin: true,
    logLevel: 'debug',
    logProvider: debug
  }));
});

app.listen(app.get('port'));

console.log(`server is running at ${port}`);

cdr.exec(`start http://localhost:${port}`);
