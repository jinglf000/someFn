const schema = require('async-validator');

// ===> rules Object
const descriptor = {
  name: { typpe: 'string', required: true }
};

const validator = new schema(descriptor);

validator.validate({ xx: 'x12' }, (errs, fields) => {
  if (errs) {
    console.log(errs);
  }
});
