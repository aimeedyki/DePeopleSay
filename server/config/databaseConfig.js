module.exports = {
  development: 'mongodb://localhost/peoplesay',
  test: 'mongodb://localhost:27017/peoplesaytest',
  production: process.env.PRODUCTION_DB
};
