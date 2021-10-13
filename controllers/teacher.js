const db = require('../configs/db');

const registerStudents = async (req, res) => {
  const teacherEmail = req.body.teacher
  const studentsEmail = req.body.students

  // db.query(`SELECT * FROM teacher WHERE teacher.email = ?`, [teacherEmail], (err, results, fields) => {
  //   // console.log('---0', err)
  //   console.log('---1', results)
  //   res.status(200).json(results)
  //   // console.log('---2', test)
  // })

  const [rows] = await db.query(`SELECT * FROM teacher WHERE teacher.email = ?`, [teacherEmail])
  console.log('--', rows)
  res.status(200).json(rows)

}


module.exports = {
  registerStudents,
}