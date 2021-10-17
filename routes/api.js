const express = require('express');

const {
  validateRequestContentType,
  formCompleteness,
  validateEmails,
  validateEmailsOnString,
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
  getStudentsForNotification,
} = require('../controllers/student');

const router = express.Router();

router
  .post('/register', 
    validateRequestContentType('application/json'),
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
    validateRequestContentType('application/json'),
    formCompleteness('body', ['student']),
    validateEmails('body', ['student']),
    studentsExist('body'),
    catchError,
    suspendStudent
  )
  .post('/retrievefornotifications', 
    formCompleteness('body', ['teacher', 'notification']),
    validateEmails('body', ['teacher']),
    teachersExist('body'),
    validateEmailsOnString('body', ['notification'], 'students'),
    studentsExist('body'),
    catchError,
    getStudentsForNotification
  )

  
module.exports = router;