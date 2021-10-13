const express = require('express');

const apiRouter = require('./api');
const teacherRouter = require('./teacher');
const studentRouter = require('./student');

const router = express.Router();

router
  .use('/api', apiRouter)
  .use('/teachers', teacherRouter)
  .use('/students', studentRouter)

  
module.exports = router;