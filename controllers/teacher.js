const db = require('../configs/db');

const registerStudents = async (req, res) => {
  try {
    const {teachers, students} = req

    await Promise.all(students && students.map(async student => {
      await db.query(
        `INSERT INTO teacher_student (teacher_id, student_id) 
        VALUES (?, ?)`, 
        [teachers[0].teacher_id, student.student_id]
      )
    }))

    res.status(204).send()
    
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

// Register new teacher
const registerTeacher = async (req, res) => {
  try {
    const first_name = req.body.first_name ? req.body.first_name.toLowerCase() : ''
    const last_name = req.body.last_name ? req.body.last_name.toLowerCase() : ''
    const email = req.body.email.toLowerCase()

    await db.query(
      `INSERT INTO teacher (first_name, last_name, email) 
      VALUES (?, ?, ?)`, 
      [first_name, last_name, email]
    )

    res.status(204).send()
    
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}


module.exports = {
  registerStudents,
  registerTeacher,
}