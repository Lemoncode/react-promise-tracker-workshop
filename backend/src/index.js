require('@babel/register')({
  extensions: ['.ts'],
});

module.exports = require('./app');
