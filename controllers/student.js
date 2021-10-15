const db = require('../configs/db');
const {getConditionQueries} = require('../helper/utils');

// Function to generate registered students by teacher input
const getStudentsByTeacher = async (req, res) => {
  try {
    const {teacher} = req.query
    const isString = typeof teacher === 'string'
    const teacherEmails = isString? [teacher] : teacher

    // 1. Get teachers data based on their email
    const emailData = {}
    teacherEmails && teacherEmails.map(email => emailData.email = decodeURIComponent(email))
    const {conditionQueries, values} = getConditionQueries(emailData)
    const [teachers] = await db.query(`SELECT * FROM teacher WHERE ${conditionQueries}`, [values])

    // 2. Get students data based on registered teacher on conjunction table
    const teacherData = {}
    teachers && teachers.map(teacher => teacherData.teacher_id = teacher.teacher_id)
    const teacherCondition = getConditionQueries(teacherData)
    const [students] = await db.query(
      `SELECT student.email FROM teacher_student 
      RIGHT JOIN student ON teacher_student.student_id = student.student_id
      WHERE ${teacherCondition.conditionQueries}`, 
      [teacherCondition.values]
    )
    const studentEmails = students && students.map(student => student.email)
    res.status(200).json({students: studentEmails})
    
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const suspendStudent = async (req, res) => {
  try {
    const {students} = req
    const {student_id} = students[0]
  
    const [statuses] = await db.query(`SELECT * FROM status WHERE name = ?`, ['Suspended'])
    const {status_id} = statuses[0]
  
    await db.query(
      `UPDATE student SET status_id = ?
      WHERE student_id = UUID_TO_BIN(?)`,
      [status_id, student_id]
    )
    res.status(204).send()

  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const getStudentsForNotification = async (req, res) => {
  console.log('--MASUK')
}


module.exports = {
  getStudentsByTeacher,
  suspendStudent,
  getStudentsForNotification,
}