const db = require('../configs/db');

const registerStudents = async (req, res) => {
  try {
    const teachers = req.teachers
    const students = req.students

    await Promise.all(students && students.map(async student => {
      await db.query(
        `INSERT INTO teacher_student (teacher_student_id, teacher_id, student_id) 
        VALUES (UUID_TO_BIN(UUID()), ?, UUID_TO_BIN(?))`, 
        [teachers[0].teacher_id, student.student_id]
      )
    }))

    res.status(204).send()
    
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}


module.exports = {
  registerStudents,
}