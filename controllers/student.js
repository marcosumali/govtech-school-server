const db = require('../configs/db');
const {getConditionQueries} = require('../helper/utils');

// Function to generate registered students by teacher input
// What considered as valid response is all students that registered all to teachers
// So we don't return student that is only registed to a specific teacher
// There's 3 possible scenario from our [Search queries]
// [Scenario 1]: target teacher doesn't exist from result on [Search queries]
// meaning some of target teacher doesn't have any student
// -> return empty students bcs no students that is registered to all teachers
// [Scenario 2]: more than one teacher is specified as target 
// -> return duplicate resuts bcs duplicates mean the student exists more than one row (registered to all teachers)
// [Scenario 3]: only one teacher is specified as target 
// -> return results bcs all students are registered to the teacher
const getStudentsByTeacher = async (req, res) => {
  try {
    const {teacher} = req.query
    const isString = typeof teacher === 'string'
    const teacherEmails = isString? [teacher] : teacher
    
    // 1. Get students data based on registered teacher on conjunction table
    const teacherKeys = teacherEmails && teacherEmails.map(() => 't.email')
    const teacherQueries = getConditionQueries(teacherKeys)
    let students = []
    
    // [Search queries]
    const [rows] = await db.query(
      `SELECT s.email AS student_email, t.email AS teacher_email FROM teacher_student ts
      LEFT JOIN teacher t ON ts.teacher_id = t.teacher_id
      LEFT JOIN student s ON ts.student_id = s.student_id
      WHERE ${teacherQueries}`, 
      teacherEmails
    )

    // 2. Return valid student email
    const teacherWithStudentEmails = rows && rows
      .map(row => row.teacher_email) // Return teacher email
      .filter((email, index, arr) => arr.indexOf(email) === index) // Filter unique
    
    let existScore = 0
    teacherEmails && teacherEmails.map(target => {
      if (teacherWithStudentEmails.indexOf(target) >= 0) existScore++
    })

    // [Scenario 1]
    if (existScore < teacherEmails.length) {
      students = []
    } else {
      // [Scenario 2]
      if (teacherEmails.length > 1) {
        students = rows && rows
        .map(row => row.student_email) // Return student email
        .filter((email, index, arr) => arr.indexOf(email) !== index) // Filter duplicate
      }
      // [Scenario 3]
      if (teacherEmails.length <= 1) {
        students = rows && rows
          .map(row => row.student_email) // Return student email
          .filter((email, index, arr) => arr.indexOf(email) === index) // Filter unique
      }
    }

    res.status(200).json({students})
    
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
      .filter((email, index, arr) => arr.indexOf(email) === index) // Filter unique

    res.status(200).json({recipients})

  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

// Register new student
const registerStudent = async (req, res) => {
  try {
    const first_name = req.body.first_name ? req.body.first_name.toLowerCase() : ''
    const last_name = req.body.last_name ? req.body.last_name.toLowerCase() : ''
    const email = req.body.email.toLowerCase()

    await db.query(
      `INSERT INTO student (first_name, last_name, email, status_id) 
      VALUES (?, ?, ?, ?)`, 
      [first_name, last_name, email, 1]
    )

    res.status(204).send()
    
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

// Get list of suspended students
const getSuspendedStudents = async (req, res) => {
  try {
    const [students] = await db.query(
      `SELECT s.student_id, s.first_name, s.last_name, s.email, sa.name AS status FROM student s
      LEFT JOIN status sa ON s.status_id = sa.status_id
      WHERE sa.name = ?`, 
      ['Suspended']
    )

    res.status(200).send({students})
    
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}


module.exports = {
  getStudentsByTeacher,
  suspendStudent,
  getStudentsForNotification,
  registerStudent,
  getSuspendedStudents,
}