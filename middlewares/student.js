const db = require('../configs/db');
const {
  generateError,
  getCombinedArray,
} = require('../helper/utils');

// Function to check whether students are exists on the database
// Must able to validate single student input or multiple student input
const studentsExist = async (req, res, next) => {
  const studentsEmail = req.body.student? [req.body.student] : req.body.students // E.g. shawn@edu.com OR [shawn@edu.com]

  // 1. Validate whether email is exists on student database
  const validStudents = [] // E.g. [{id: '1', name, email, etc...}]
  const invalidStudents = [] // E.g. [shawn@edu.com]
  await Promise.all(studentsEmail && studentsEmail.map(async studentEmail => {
    const [rows] = await db.query(`SELECT BIN_TO_UUID(student_id) AS student_id, first_name, last_name, email FROM student WHERE email = ?`, [studentEmail])
    if (rows.length > 0) validStudents.push(rows[0])
    if (rows.length <= 0) invalidStudents.push(studentEmail)
  }))

  // 2. If found invalid student, send error message
  if(invalidStudents.length > 0) {
    const invalidStudentString = getCombinedArray(invalidStudents)
    const error = generateError(400, `Students doesn't exist: ${invalidStudentString}`)
    next(error)
  }

  //3. Otherwise, proceeds
  if (invalidStudents.length <= 0) {
    req.students = validStudents
    next()
  }
} 

module.exports = {
  studentsExist,
}