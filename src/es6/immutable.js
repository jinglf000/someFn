const { fromJS, merge } = require('immutable');

const data = fromJS({
  one: {},
  age: ''
});

console.log(data);

const res = data.merge({ age: 12, one: { name: 'name' }});

console.log(data, res);
