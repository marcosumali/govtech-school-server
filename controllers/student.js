const db = require('../configs/db');
const {getConditionQueries} = require('../helper/utils');

// Function to generate registered students by teacher input
const getStudentsByTeacher = async (req, res) => {
  try {
    const {teacher} = req.query
    const isString = typeof teacher === 'string'
    const teacherEmails = isString? [teacher] : teacher
    
    // 1. Get students data based on registered teacher on conjunction table
    const teacherKeys = teacherEmails && teacherEmails.map(() => 't.email')
    const teacherQueries = getConditionQueries(teacherKeys)
    let students = []
    
    // If only one teacher, return student registered to them
    if (teacherEmails.length <= 1) {
      const [rows] = await db.query(
        `SELECT s.email FROM teacher_student ts
        LEFT JOIN teacher t ON ts.teacher_id = t.teacher_id
        LEFT JOIN student s ON ts.student_id = s.student_id
        WHERE ${teacherQueries}`, 
        teacherEmails
      )
      students = [...rows]
    }

    // If more than one teacher, find students that is registed on all teachers
    // by checking if student email count is more than one rows
    if (teacherEmails.length > 1) {
      const [rows] = await db.query(
        `SELECT s.email FROM teacher_student ts
        LEFT JOIN teacher t ON ts.teacher_id = t.teacher_id
        LEFT JOIN student s ON ts.student_id = s.student_id
        WHERE ${teacherQueries}
        GROUP BY s.email
        HAVING COUNT(*) >1`, 
        teacherEmails
      )
      students = [...rows]
    }  

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
      WHERE student_id = ?`,
      [status_id, student_id]
    )
    res.status(204).send()

  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

// Function to retrive students that able to receive notifications
// Students that are eligible to receive notification must follow ALL criteria:
// - Students are not suspended (active status)
// - Registered students for related teacher OR mentioned in the notification
// List of retrived students must be unique
const getStudentsForNotification = async (req, res) => {
  try {
    const {teachers} = req
    const teacher_id = teachers[0].teacher_id
    const mentionedStudents = req.students // Mentioned students are obtained from previous middleware

    // 1. Get mentioned students that is active
    const activeMentionedStudents = []
    await Promise.all(mentionedStudents && mentionedStudents.map(async student => {
      const [activeStudents] = await db.query(
        `SELECT student.email AS email FROM student 
        LEFT JOIN status ON student.status_id = status.status_id
        WHERE student.student_id = ? AND status.name = ?
        `, 
        [student.student_id, 'Active']
      )

      if (activeStudents.length > 0) activeMentionedStudents.push(activeStudents[0])
    }))

    // 2. Get registered students from related teachet that is active as well
    const [activeRegisterStudents] = await db.query(
      `SELECT student.email AS email FROM teacher_student 
      LEFT JOIN student ON teacher_student.student_id = student.student_id
      LEFT JOIN status ON student.status_id = status.status_id
      WHERE teacher_student.teacher_id = ? AND status.name = ?
      `, 
      [teacher_id, 'Active']
    )

    // 3. Get total recipients from active mentioned and registered students
    const recipients = activeMentionedStudents
      .concat(activeRegisterStudents) // Combine both students
      .map(student => student.email) // Restructure to array of emails
      .filter((student, index, arr) => { // Filter out dupliucate emails
        const firstIndex = arr.findIndex(obj => obj.student_id === student.student_id)
        if (index === firstIndex) return student
      })

    res.status(200).json({recipients})

  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}


module.exports = {
  getStudentsByTeacher,
  suspendStudent,
  getStudentsForNotification,
}