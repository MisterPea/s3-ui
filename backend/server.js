const express = require('express');

const app = express();
const PORT = 3200;
const cors = require('cors');
const routes = require('./routes');

function errorHandler(err, req, res, next) {
  return res.status(404).json(err);
}

app.use(cors());
app.use('/', routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Connection running on Port: ${PORT}`));
