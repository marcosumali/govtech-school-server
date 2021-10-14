const db = require('../configs/db');

const registerStudents = async (req, res) => {
  console.log('MASUK:')
  try {
    const teacherEmail = req.body.teacher
    const studentsEmail = req.body.students
    
    // const [rows] = await db.query(`SELECT * ROM teacher WHERE teacher.email = ?`, [teacherEmail])
    // res.status(204).json(rows)

  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}


module.exports = {
  registerStudents,
}