const formate = require('../src/formate').formate;

test('金额格式化', () => {
  expect(formate(1991993998)).toBe('1,991,993,998');
  expect(formate(12)).toBe('12');
  expect(formate(6)).toBe('6');
  expect(formate(126)).toBe('126');
  expect(formate(1269)).toBe('1,269');
  expect(formate(21269)).toBe('21,269');
  expect(formate(621269)).toBe('621,269');
  expect(formate(9621269)).toBe('9,621,269');
});