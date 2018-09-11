/**
 * 通过服务器配置缓存
 */
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const port = 3001;


app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <title>Document</title>
  </head>
  <body>
      Http Cache Demo
      <script src="/demo.js"></script>
  </body>
  </html>`);
});

app.get('/demo.js', (req, res) => {
  const demoPath = path.resolve(__dirname, './demo.js');
  const context = fs.readFileSync(demoPath);
  // const status = fs.statSync(demoPath);
  /* 强制缓存 */
  // res.setHeader('Expires', getUTCtime(1)); expires 设置缓存 http1.0
  // res.setHeader('Cache-Control', 'public, max-age=10');//cache-control http1.1设置过期时间
  /* 协商缓存 */
  // const lastModified = status.mtime.toUTCString(); //lastModified 和 if-modified-since 控制
  // if (lastModified === req.headers['if-modified-since']) {
  //   res.writeHead(304, 'Not Modified');
  //   res.end();
  // } else {
  //   res.setHeader('Cache-Control', 'public,max-age=5');
  //   res.setHeader('Last-Modified', lastModified);
  //   res.writeHead(200, 'OKOKOK');
  //   res.end(context);
  // }
  let etag =  md5(context);
  console.log(req.headers['if-none-match']);
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, 'not Modified');
    res.end();
  } else {
    res.setHeader('ETag', etag);
    res.writeHead(200, 'can go');
    res.end(context);
  }

});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

/**
 * 获取两分钟后的UTC时间串
 * @param {Number} minute 分钟
 */
function getUTCtime(minute) {
  const m = new Date().getTime();
  const addTime = minute * 60 * 1000;
  return new Date(m + addTime).toUTCString();
}
