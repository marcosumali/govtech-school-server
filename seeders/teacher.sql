create table if not exists teacher (
	teacher_id BIGINT AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	email VARCHAR(100) NOT NULL,
  PRIMARY KEY (teacher_id),
  UNIQUE (email)
);

insert into teacher (first_name, last_name, email) values ('Shea', 'Ransfield', 'sransfield0@booking.com');
insert into teacher (first_name, last_name, email) values ('Alexia', 'Hedin', 'ahedin3@yolasite.com');
insert into teacher (first_name, last_name, email) values ('Thatcher', 'Carnilian', 'tcarnilian5@virginia.edu');
insert into teacher (first_name, last_name, email) values ('Percy', 'Ommanney', 'pommanneyi@howstuffworks.com');
insert into teacher (first_name, last_name, email) values ('Delaney', 'Ledrun', 'dledrunj@shutterfly.com');
