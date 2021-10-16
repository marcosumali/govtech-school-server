const request = require('supertest');
const chai = require('chai');

const server = require('../../index')
const db = require('../../configs/db');

const expect = chai.expect;

describe('Test API #1 - Register students to a teacher', () => {
  const invalidTeacher = 'john@doe.com'
  const invalidStudents = ['student@example.com']
  const validTeacher = 'sransfield0@booking.com'
  const validRegisteredStudents = ['bgerling0@hao123.com']
  const validateStudents = ['bruslin1@ycombinator.com']

  before(async () => {
    // Prepare for test scenarios for teacher and registered students
    // Student: 'bgerling0@hao123.com' must be registed to teacher 'sransfield0@booking.com' 
    const [rows] = await db.query(
      `SELECT teacher_student_id, teacher.teacher_id, student.student_id FROM teacher_student 
      LEFT JOIN student ON teacher_student.student_id = student.student_id
      LEFT JOIN teacher ON teacher_student.teacher_id = teacher.teacher_id
      WHERE teacher.email = ? AND student.email = ?`, 
      [validTeacher, validRegisteredStudents[0]]
    )
    if (rows.length <= 0) {
      // Create new connect to register students based on scenario
      const [teachers] = await db.query(
        `SELECT teacher_id FROM teacher WHERE teacher.email = ?`, 
        [validTeacher]
      )
      const teacher = teachers[0]
      const [students] = await db.query(
        `SELECT student_id FROM student WHERE student.email = ?`, 
        [validRegisteredStudents[0]]
      )
      const student = students[0]
      await db.query(
        `INSERT INTO teacher_student (teacher_student_id, teacher_id, student_id) 
        VALUES (UUID_TO_BIN(UUID()), ?, ?)`, 
        [teacher.teacher_id, student.student_id]
      )
    }
  })

  after(async () => {
    // Delete recently uploaded data to database
    // 1. Get recently created teacher_student_id
    const [rows] = await db.query(
      `SELECT teacher_student_id FROM teacher_student 
      LEFT JOIN student ON teacher_student.student_id = student.student_id
      LEFT JOIN teacher ON teacher_student.teacher_id = teacher.teacher_id
      WHERE teacher.email = ? AND student.email = ?`, 
      [validTeacher, validateStudents[0]]
    )
    // 2. Delete the new row
    if (rows.length > 0) {
      const teacherStudentId = rows[0].teacher_student_id
      await db.query(
        `DELETE FROM teacher_student WHERE teacher_student_id = ?`, 
        [teacherStudentId]
      )
    }
  });

  it('formCompleteness(): Submit with empty payload should return proper error message', (done) => {
    request(server)
      .post('/api/register')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).to.be.equal(400)
        expect(JSON.parse(res.text).message).to.be.equal('Form has missing request payload')
        return done();
      });
  })
  it('formCompleteness(): Submit with incorrect payload should return proper error message', (done) => {
    request(server)
      .post('/api/register')
      .send({teacher: invalidTeacher})
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).to.be.equal(400)
        expect(JSON.parse(res.text).message).to.be.equal('Form has missing fields or empty value: students')
        return done();
      });
  })
  it('validateEmail(): Submit with incorrect email should return proper error message', (done) => {
    request(server)
      .post('/api/register')
      .send({teacher: 'johndoe.com', students: invalidStudents})
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).to.be.equal(400)
        expect(JSON.parse(res.text).message).to.be.equal('Form has invalid emails: johndoe.com')
        return done();
      });
  })
  it('TeacherExists(): Submit with unidentified teacher should return proper error message', (done) => {
    request(server)
      .post('/api/register')
      .send({teacher: invalidTeacher, students: invalidStudents})
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).to.be.equal(404)
        expect(JSON.parse(res.text).message).to.be.equal(`Teachers don't exist: john@doe.com`)
        return done();
      });
  })
  it('StudentExists(): Submit with unidentified student should return proper error message', (done) => {
    request(server)
      .post('/api/register')
      .send({teacher: validTeacher, students: invalidStudents})
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).to.be.equal(404)
        expect(JSON.parse(res.text).message).to.be.equal(`Students don't exist: student@example.com`)
        return done();
      });
  })
  it('StudentRegistered(): Submit with registered student should return duplicate error message', (done) => {
    request(server)
      .post('/api/register')
      .send({teacher: validTeacher, students: validRegisteredStudents})
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).to.be.equal(409)
        expect(JSON.parse(res.text).message).to.be.equal(`Following students have been registed to the related teacher: bgerling0@hao123.com`)
        return done();
      });
  })
  it('Successful request', (done) => {
    request(server)
      .post('/api/register')
      .send({teacher: validTeacher, students: validateStudents})
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).to.be.equal(204)
        return done();
      });
  })
})