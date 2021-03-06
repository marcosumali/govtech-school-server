const db = require('../configs/db');
const {
  generateError,
  getCombinedArray,
  getConditionQueries,
} = require('../helper/utils');

// Function to check whether students are exists on the database
// Must able to validate single student input or multiple student input
// request field: represent type of request field that need to be check
// e.g. req.body => {student: shawn@edu.com}
const studentsExist = requestField => {
  return async (req, res, next) => {
    const payload = req[requestField]
    const studentsEmail = typeof payload.student === 'string'? [payload.student] : (payload.student || payload.students) // E.g. shawn@edu.com OR [shawn@edu.com]

    // 1. Validate whether email is exists on student database
    const validStudents = [] // E.g. [{id: '1', name, email, etc...}]
    const invalidStudents = [] // E.g. [shawn@edu.com]
    await Promise.all(studentsEmail && studentsEmail.map(async studentEmail => {
      const [rows] = await db.query(`SELECT student_id, first_name, last_name, email FROM student WHERE email = ?`, [studentEmail])
      if (rows.length > 0) validStudents.push(rows[0])
      if (rows.length <= 0) invalidStudents.push(studentEmail)
    }))

    // 2. If found invalid student, send error message
    if(invalidStudents.length > 0) {
      const invalidStudentString = getCombinedArray(invalidStudents)
      const error = generateError(404, `Students don't exist: ${invalidStudentString}`)
      next(error)
    }

    //3. Otherwise, proceeds
    if (invalidStudents.length <= 0) {
      req.students = validStudents
      next()
    }
  }
}

// Function to validate whether certain student has been registered to certain teacher
const studentRegistered = async (req, res, next) => {
  const {teachers, students} = req
  const teacherId = teachers[0].teacher_id
  // 1. Check if any student has been registered to related teacher
  const registeredStudents = []
  await Promise.all(students && students.map(async student => {
    const data = {teacher_id: teacherId, student_id: student.student_id}
    const keys = ['teacher_id', 'student_id']
    const values = [teacherId, student.student_id]
    const queries = getConditionQueries(keys, 'AND')

    const [rows] = await db.query(
      `SELECT teacher_student_id, teacher_id, student_id  
      FROM teacher_student 
      WHERE ${queries}`, 
      values,
    )

    if (rows.length > 0) registeredStudents.push(student)
  }))

  // 2. If students has been registered then send error
  // Otherwise proceed to next
  if (registeredStudents.length <= 0) next()
  if (registeredStudents.length > 0) {
    const invalidStudentString = getCombinedArray(registeredStudents.map(student => student.email))
    const error = generateError(409, `Following students have been registed to the related teacher: ${invalidStudentString}`)
    next(error)
  }
}


module.exports = {
  studentsExist,
  studentRegistered,
}