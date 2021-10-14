const db = require('../configs/db');
const {
  generateError,
  getCombinedArray,
} = require('../helper/utils');

// Function to check whether teachers are exists on the database
// Must able to validate single teacher input or multiple teacher input
const teachersExist = async (req, res, next) => {
  const teachersEmail = req.body.teacher? [req.body.teacher] : req.body.teachers // E.g. shawn@edu.com OR [shawn@edu.com]

  // 1. Validate whether email is exists on teacher database
  const validTeachers = [] // E.g. [{id: '1', name, email, etc...}]
  const invalidTeachers = [] // E.g. [shawn@edu.com]
  await Promise.all(teachersEmail && teachersEmail.map(async teacherEmail => {
    const [rows] = await db.query(`SELECT * FROM teacher WHERE email = ?`, [teacherEmail])
    if (rows.length > 0) validTeachers.push(rows[0])
    if (rows.length <= 0) invalidTeachers.push(teacherEmail)
  }))

  // 2. If found invalid teachers, send error message
  if(invalidTeachers.length > 0) {
    const invalidTeacherString = getCombinedArray(invalidTeachers)
    const error = generateError(400, `Teachers doesn't exist: ${invalidTeacherString}`)
    next(error)
  }

  //3. Otherwise, proceeds
  if (invalidTeachers.length <= 0) {
    req.teachers = validTeachers
    next()
  }
} 

module.exports = {
  teachersExist,
}