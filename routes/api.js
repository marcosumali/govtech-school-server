const express = require('express');

const {
  registerStudents,
} = require('../controllers/teacher');
const {
  formCompleteness,
  catchError,
} = require('../middlewares/utils');


const router = express.Router();

router
  .post('/register', formCompleteness(['teacher', 'students']), catchError, registerStudents)

  
module.exports = router;