// 1、判断字符串回？（）形如12321、12344321、abccba为符合规则的
/**
 * 判断字符串是否满足特定格式
 * @param {String} str
 */
function strBack(str) {
  return str === str.split().reverse().join('');
}

// 2、输入一个值返回小于这个值的所有素数的和
/**
 * 返回所有素数的和
 * @param {Number} num 数值
 */
function getPrimeAdd(num) {
  let res = 0;
  for (let i = 1; i <= num; i++) {
    if (isPrime(i)) {
      res += i;
    }
  }
  return res;
}

/**
 * 判断是否是素数
 * @param {Number} num
 */
function isPrime(num) {
  console.log(num);
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

module.exports.strBack = strBack;
module.exports.getPrimeAdd = getPrimeAdd;

// console.log(getPrimeAdd(8));
// console.log(isPrime(4));
