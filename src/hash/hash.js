/**
 * 解析hash
 * @param {String} str hash字符串，以#开头
 * @return {Object} {path<string>, query<Object>, queryStr<String>}返回hash解析后的对象
 */
function parseHash(str) {
  if (str[0] !== '#') return;
  const _str = decodeURIComponent(str.substr(1));
  const arr = _str.split('?');
  const res = {
    path: arr[0],
    query: {},
    queryStr: arr[1]
  };
  if (res.queryStr) {
    res.queryStr.split('&').forEach(item => {
      const _item = item.split('=');
      res.query[_item[0]] = _item[1];
    })
  }
  return res;
}

/**
 * 把hash路由转换成
 * @param {Object} obj 描述hash路由的对象
 * @param {String} obj.path 路径，不包含#
 * @param {Object} object.query 查询参数
 */
function formatHash(obj = {}) {
  const query = obj.query;
  const queryStr = Object.keys(query).reduce((prev, item) =>
    prev + `${item}=${query[item]}`, '?');
  return encodeURIComponent(`#${obj.path}${queryStr}`);
}

var str = '#3434?23';

var res = parseHash(str);

console.log(res);

console.log(formatHash({
  path: '/index/helpp',
  query: {
    a: 1,
    nn: 3,
    cc: '中文字符哈哈哈😁'
  }
}));
