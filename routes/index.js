const express = require('express');

const apiRouter = require('./api');
const teacherRouter = require('./teacher');
const studentRouter = require('./student');

const router = express.Router();
const version = '0.0.2';

router
  .get('/', (req, res) => res.send(`Version: v${version}`))
  .use('/api', apiRouter)
  .use('/teachers', teacherRouter)
  .use('/students', studentRouter)

  
module.exports = router;