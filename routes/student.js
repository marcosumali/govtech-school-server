const express = require('express');

const {
  validateRequestContentType,
  formCompleteness,
  validateEmails,
  catchError,
} = require('../middlewares/utils');
const {
  registerStudent,
  getSuspendedStudents,
} = require('../controllers/student');

const router = express.Router();

router
  .post('/register',
    validateRequestContentType('application/json'), 
    formCompleteness('body', ['email']),
    validateEmails('body', ['email']),
    catchError,
    registerStudent
  )
  .get('/suspended', getSuspendedStudents)


module.exports = router;