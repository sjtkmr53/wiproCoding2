const express = require('express');

const routes = require('./routes');
const { ValidationError, NotFoundError } = require('./lib/errors');

const utils = require ("./test/utils")

const app = express();

app.use(express.json({ limit: '100kb' }));
app.use('/', routes);
app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});

app.listen(4002, function(){
  console.log("app is running on port 4002")
})

module.exports = app;