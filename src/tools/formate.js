/**
 * @author jinglf000
 * @description 序列化金额
 * ###### Fri Feb 9 15:20:36 CST 2018
 */

/**
 * @description 格式化money
 * @argument {String} str
 * @return {String} 格式化后的money
 */
function formate(str) {
  const reg = /\d{3}/g;
  const val = str.toString();
  const valNeed = val
    .split('')
    .reverse()
    .join('')
    .replace(reg, '$&,')
    .split('')
    .reverse()
    .join('');
  return valNeed.charAt(0) === ',' ? valNeed.substr(1) : valNeed;
}

module.exports.formate = formate;
