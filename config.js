/**
 * 大同项目配置，配置代理路由，并配合前端所需路由
 * @author  jinglf000
 */

// 代理服务配置
const	proxy = [
	{
		target: 'http://www.bjrbj.gov.cn',
		// pathRules: /(?!(.*\.css)|(.*\.png)|(.*\.jpg)|(.*\.js)|(.*\.gif))(\/uamsso.*)/
		pathRules: /(\/uamsso.*)|(\/personLogin.*)|(\/unitLogin.*)/
	}
];

// prod 服务地址
const	prod = {
	port: 9898
};

// web端的router，均指向index.html（配合前端路由）
const	web = {
	router: /^\/((login)|(index)|(search)|(infoDetail)|(danganPic)|)$/
}

module.exports.prod = prod;
module.exports.proxy = proxy;
module.exports.web = web;
