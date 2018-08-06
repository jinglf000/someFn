/**
 * gulp配置文件
 */

const devConf = require('./dev-config');

// 开发生产环境
const EVN_DEV = devConf.base.DEV ? devConf.base.DEV : 'src';
const EVN_PRO = devConf.base.PRO ? devConf.base.PRO : 'dist';

//路径变量
const globs = {};

// 资源路径
globs.assets = [
  '/**/*.css',
  '/**/*.js',
  '/**/*.jsp',
  '/**/*.*(doc|docx|xls|xlsx|ppt|pptx|pdf)',
  '/**/*.java',
  '/**/*.*(png|jpg|JPG|gif|eot|woff|ttf|svg|swf)'
];

globs.assets = globs.assets.map(item => EVN_DEV + item);
globs.include = EVN_DEV + '/**/include/*.{html,art}';
globs.html = [`${EVN_DEV}/**/*.html`, `!${EVN_DEV}/**/include/*.html`];
globs.scssEntry = `${EVN_DEV}/**/scss/index.scss`;
globs.scssOutputfileName = 'common';
globs.scss = `${EVN_DEV}/**/scss/*.scss`;

// 在疯狂的保存scss文件的时候，终端可能会出现如下错误
// File to import not found or unreadable，原因是
// scss文件保存时，编译无法读取到文件，因此加了延时
const SCSS_WAIT_TIME = 200;

// browserSync Sync同步配置 ghostMode
// clicks click事件同步
// scroll 滚动事件同步
// forms 表单同步，包括：表单输入，表单提交等（原生表单）
const browserSyncOption = {
  clicks: false,
  scroll: false,
  forms: false
};
const devSyncOption = devConf.dev.syncOption ? devConf.dev.syncOption : {};

module.exports.browserSyncOption = Object.assign(
  {},
  browserSyncOption,
  devSyncOption
);
module.exports.globs = globs;
module.exports.EVN_DEV = EVN_DEV;
module.exports.EVN_PRO = EVN_PRO;
module.exports.SCSS_WAIT_TIME = SCSS_WAIT_TIME;
