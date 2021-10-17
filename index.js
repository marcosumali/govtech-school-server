require('dotenv').config();
const express = require('express');
const cors = require('cors');

const rootRouter = require('./routes');
const {generateError} = require('./helper/utils')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`));

app.use('/', rootRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = generateError(404, 'Path not found')
  next(error);
});

// Error handler
app.use((err, req, res, next) => {
  if (err) {
    const {code, error} = err
    res.status(code).json({message: error.message})
  }

  res.status(500).json({message: 'Internal server error'})
});


module.exports = app;