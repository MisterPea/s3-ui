const express = require('express');
const dotenv = require('dotenv');

const app = express();
const PORT = 5001;
const cors = require('cors');
const routes = require('./routes');
const uploadRoutes = require('./routes/uploadRoutes');

const corsOptions = {
  methods: 'GET, POST, DELETE',
  exposedHeaders: 'Content-Disposition',
};

dotenv.config();

function errorHandler(err, req, res, next) {
  return res.status(404).json(err);
}

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'dev') {
  app.use('/api', routes);
  app.use('/api/upload', uploadRoutes);
} else {
  app.use('/', routes);
  app.use('/upload', uploadRoutes);
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Connection running on Port: ${PORT}`));
