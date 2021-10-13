const express = require('express');

const {
  registerStudents,
} = require('../controllers/teacher');

const router = express.Router();

router
  .post('/register', registerStudents)

  
module.exports = router;