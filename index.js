const	express = require('express');
const	proxy = require('http-proxy-middleware');
const 	path  = require('path');
const	config = require('./config.js');

// 声明服务器实例
const 	app = express();
app.set('port', process.env.PORT || config.prod.port);


// 配置代理
config.proxy.forEach((item) => {
	app.use(item.pathRules, proxy({
		target: item.target,
		changeOrigin: true,
		logLevel: 'debug'
	}));
});


// express.use 方法第一个参数可以使用`string`来设置路径，和正则表达式来设置，但是不能通过glob语法来表示
// 代理是changeOrigin 要设置为true，把接口中请求头header里的参数host（源`host`）改为目标源，达到欺骗代理是从原域过来的

// 静态路径
app.use(express.static(path.join(__dirname, 'src')));

// 前端路由路由
app.get(config.web.router, function (req, res) {
	// res.send('hello');
	res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(app.get('port'), () => {
	console.log("server is runing at " + app.get('port'));
});


