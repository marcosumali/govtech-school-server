create table if not exists student (
	student_id BINARY(16) NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	email VARCHAR(100) NOT NULL,
  status_id BIGINT NOT NULL,
  PRIMARY KEY (student_id),
  FOREIGN KEY (status_id) REFERENCES status(status_id),
  UNIQUE (email)
);

insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Blair', 'Gerling', 'bgerling0@hao123.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Beulah', 'Ruslin', 'bruslin1@ycombinator.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Aluino', 'Vamplew', 'avamplew2@illinois.edu', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Rakel', 'Pickover', 'rpickover3@msn.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Kermie', 'Moir', 'kmoir4@reverbnation.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Kassie', 'Kattenhorn', 'kkattenhorn5@posterous.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Celinda', 'Trace', 'ctrace6@qq.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Dolly', 'McCaffery', 'dmccaffery7@yahoo.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Riki', 'Sorrie', 'rsorrie8@mysql.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Niki', 'Farlane', 'nfarlane9@alexa.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Cheryl', 'Jery', 'cjerya@nyu.edu', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Eugen', 'Redwood', 'eredwoodb@deliciousdays.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Isaac', 'Tredget', 'itredgetc@comcast.net', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Fionnula', 'Gumm', 'fgummd@php.net', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Lorrie', 'Robuchon', 'lrobuchone@goo.ne.jp', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Avie', 'Chaulk', 'achaulkf@mit.edu', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Lowell', 'Kondrachenko', 'lkondrachenkog@narod.ru', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Denys', 'Staddom', 'dstaddomh@jimdo.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Jacki', 'Guichard', 'jguichardi@cpanel.net', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Eddy', 'Helian', 'ehelianj@bbc.co.uk', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Trina', 'Gutierrez', 'tgutierrezk@lulu.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Jeri', 'Restill', 'jrestilll@who.int', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Mollee', 'Burles', 'mburlesm@hhs.gov', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Ossie', 'Waycott', 'owaycottn@storify.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Langston', 'Headan', 'lheadano@ning.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Merrick', 'Dominik', 'mdominikp@bluehost.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Abran', 'Wharby', 'awharbyq@imgur.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Bryant', 'Glyne', 'bglyner@google.de', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Pooh', 'Pawel', 'ppawels@xrea.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Hyacinthia', 'Mephan', 'hmephant@quantcast.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Jacques', 'Prandy', 'jprandyu@stumbleupon.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Nero', 'Skepper', 'nskepperv@twitpic.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Earle', 'Mattessen', 'emattessenw@accuweather.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Ogden', 'Mulheron', 'omulheronx@infoseek.co.jp', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Marla', 'Geelan', 'mgeelany@bloglovin.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Basile', 'Allison', 'ballisonz@soup.io', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Dredi', 'Tilbury', 'dtilbury10@msn.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Ty', 'Stockoe', 'tstockoe11@sakura.ne.jp', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Marylinda', 'Trass', 'mtrass12@cnbc.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Jody', 'Thoday', 'jthoday13@ow.ly', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Early', 'Adamec', 'eadamec14@vk.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Kesley', 'Sings', 'ksings15@symantec.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Myrilla', 'Cawkwell', 'mcawkwell16@google.ca', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Jared', 'Copcutt', 'jcopcutt17@nytimes.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Sher', 'Wellfare', 'swellfare18@mediafire.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Dre', 'Heasman', 'dheasman19@livejournal.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Tim', 'Darell', 'tdarell1a@alibaba.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Claudetta', 'Saltsberger', 'csaltsberger1b@mozilla.com', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Janifer', 'Stillmann', 'jstillmann1c@youtu.be', 1);
insert into student (student_id, first_name, last_name, email, status_id) values (UUID_TO_BIN(UUID()), 'Colette', 'Brobak', 'cbrobak1d@sphinn.com', 1);
