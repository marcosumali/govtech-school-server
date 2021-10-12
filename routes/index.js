const express = require('express');

const teacherRouter = require('./teacher');
const studentRouter = require('./student');

const router = express.Router();

router
  .use('/teachers', teacherRouter)
  .use('/students', studentRouter)

  
module.exports = router;