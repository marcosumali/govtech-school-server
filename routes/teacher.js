const express = require('express');

const {
  validateRequestContentType,
  formCompleteness,
  validateEmails,
  validateEmailsOnString,
  catchError,
} = require('../middlewares/utils');
const {
  registerTeacher,
} = require('../controllers/teacher');

const router = express.Router();

router
  .post('/register',
    validateRequestContentType('application/json'), 
    formCompleteness('body', ['email']),
    validateEmails('body', ['email']),
    catchError,
    registerTeacher
  )


module.exports = router;