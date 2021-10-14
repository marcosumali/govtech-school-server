const express = require('express');

const {
  formCompleteness,
  catchError,
} = require('../middlewares/utils');
const {
  teachersExist,
} = require('../middlewares/teacher');
const {
  studentsExist,
} = require('../middlewares/student');
const {
  registerStudents,
} = require('../controllers/teacher');


const router = express.Router();

router
  .post('/register', formCompleteness(['teacher', 'students']), teachersExist, studentsExist, catchError, registerStudents)

  
module.exports = router;