const express = require('express');

const {
  formCompleteness,
  validateEmails,
  catchError,
} = require('../middlewares/utils');
const {
  teachersExist,
} = require('../middlewares/teacher');
const {
  studentsExist,
  studentRegistered,
} = require('../middlewares/student');
const {
  registerStudents,
} = require('../controllers/teacher');
const {
  getStudentsByTeacher,
  suspendStudent,
} = require('../controllers/student');


const router = express.Router();

router
  .post('/register', 
    formCompleteness('body', ['teacher', 'students']),
    validateEmails('body', ['teacher', 'students']),
    teachersExist('body'), studentsExist('body'), // Validate input existance on the database
    studentRegistered, // Validate students duplicate registraction with teacher
    catchError, 
    registerStudents
  )
  .get('/commonstudents', 
    formCompleteness( 'query', ['teacher']), 
    validateEmails('query', ['teacher', 'students']),
    teachersExist('query'),
    catchError,
    getStudentsByTeacher
  )
  .post('/suspend', 
    formCompleteness('body', ['student']),
    validateEmails('body', ['student']),
    studentsExist('body'),
    catchError,
    suspendStudent)

  
module.exports = router;