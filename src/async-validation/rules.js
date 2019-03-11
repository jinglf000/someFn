const schema = require('async-validator');

// ====> rules Function
const descriptorFn = {
  name: [
    {
      validator(rules, value, callback, source, options) {
        console.log('method 1 running');
        setTimeout(() => {
          callback(2);
          console.log('method 1 running 20~~');
        }, 20);
      }
    },
    {
      validator(rules, value, callback, source, options) {
        // console.log(rules, value, callback, source, options);
        const errors = [];
        errors.push(new Error('类型错误'));
        callback(errors);
        console.log('method 2 running');
      }
    }
  ]
};

const validator = new schema(descriptorFn);

validator.validate({ name: 'jing@baidu.com' }, (errs, fields) => {
  console.log(errs, fields);
});
