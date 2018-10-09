const mayi = require('../src/review/mayi');

test('1、字符串回', () => {
  expect(mayi.strBack('12344baab44321')).toBeTruthy();
});

test('2、返回所有素数的和', () => {
  expect(mayi.getPrimeAdd(8)).toBe(18);
});

test('3、返回想要的数据结构', () => {

});
