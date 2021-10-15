create table if not exists teacher_student (
	teacher_student_id BINARY(16) NOT NULL,
  teacher_id BIGINT NOT NULL,
  student_id BINARY(16) NOT NULL,
  PRIMARY KEY (teacher_student_id),
  FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
  FOREIGN KEY (student_id) REFERENCES student(student_id)
);
