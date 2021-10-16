require('dotenv').config();
const express = require('express');
const cors = require('cors');

const rootRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`));

app.use('/', rootRouter);


module.exports = app;