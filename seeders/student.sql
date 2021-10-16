create table if not exists student (
	student_id BIGINT AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	email VARCHAR(100) NOT NULL,
  status_id BIGINT NOT NULL,
  PRIMARY KEY (student_id),
  FOREIGN KEY (status_id) REFERENCES status(status_id),
  UNIQUE (email)
);

insert into student (first_name, last_name, email, status_id) values ('Blair', 'Gerling', 'bgerling0@hao123.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Beulah', 'Ruslin', 'bruslin1@ycombinator.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Aluino', 'Vamplew', 'avamplew2@illinois.edu', 1);
insert into student (first_name, last_name, email, status_id) values ('Rakel', 'Pickover', 'rpickover3@msn.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Kermie', 'Moir', 'kmoir4@reverbnation.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Kassie', 'Kattenhorn', 'kkattenhorn5@posterous.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Celinda', 'Trace', 'ctrace6@qq.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Dolly', 'McCaffery', 'dmccaffery7@yahoo.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Riki', 'Sorrie', 'rsorrie8@mysql.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Niki', 'Farlane', 'nfarlane9@alexa.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Cheryl', 'Jery', 'cjerya@nyu.edu', 1);
insert into student (first_name, last_name, email, status_id) values ('Eugen', 'Redwood', 'eredwoodb@deliciousdays.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Isaac', 'Tredget', 'itredgetc@comcast.net', 1);
insert into student (first_name, last_name, email, status_id) values ('Fionnula', 'Gumm', 'fgummd@php.net', 1);
insert into student (first_name, last_name, email, status_id) values ('Lorrie', 'Robuchon', 'lrobuchone@goo.ne.jp', 1);
insert into student (first_name, last_name, email, status_id) values ('Avie', 'Chaulk', 'achaulkf@mit.edu', 1);
insert into student (first_name, last_name, email, status_id) values ('Lowell', 'Kondrachenko', 'lkondrachenkog@narod.ru', 1);
insert into student (first_name, last_name, email, status_id) values ('Denys', 'Staddom', 'dstaddomh@jimdo.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Jacki', 'Guichard', 'jguichardi@cpanel.net', 1);
insert into student (first_name, last_name, email, status_id) values ('Eddy', 'Helian', 'ehelianj@bbc.co.uk', 1);
insert into student (first_name, last_name, email, status_id) values ('Trina', 'Gutierrez', 'tgutierrezk@lulu.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Jeri', 'Restill', 'jrestilll@who.int', 1);
insert into student (first_name, last_name, email, status_id) values ('Mollee', 'Burles', 'mburlesm@hhs.gov', 1);
insert into student (first_name, last_name, email, status_id) values ('Ossie', 'Waycott', 'owaycottn@storify.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Langston', 'Headan', 'lheadano@ning.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Merrick', 'Dominik', 'mdominikp@bluehost.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Abran', 'Wharby', 'awharbyq@imgur.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Bryant', 'Glyne', 'bglyner@google.de', 1);
insert into student (first_name, last_name, email, status_id) values ('Pooh', 'Pawel', 'ppawels@xrea.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Hyacinthia', 'Mephan', 'hmephant@quantcast.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Jacques', 'Prandy', 'jprandyu@stumbleupon.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Nero', 'Skepper', 'nskepperv@twitpic.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Earle', 'Mattessen', 'emattessenw@accuweather.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Ogden', 'Mulheron', 'omulheronx@infoseek.co.jp', 1);
insert into student (first_name, last_name, email, status_id) values ('Marla', 'Geelan', 'mgeelany@bloglovin.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Basile', 'Allison', 'ballisonz@soup.io', 1);
insert into student (first_name, last_name, email, status_id) values ('Dredi', 'Tilbury', 'dtilbury10@msn.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Ty', 'Stockoe', 'tstockoe11@sakura.ne.jp', 1);
insert into student (first_name, last_name, email, status_id) values ('Marylinda', 'Trass', 'mtrass12@cnbc.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Jody', 'Thoday', 'jthoday13@ow.ly', 1);
insert into student (first_name, last_name, email, status_id) values ('Early', 'Adamec', 'eadamec14@vk.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Kesley', 'Sings', 'ksings15@symantec.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Myrilla', 'Cawkwell', 'mcawkwell16@google.ca', 1);
insert into student (first_name, last_name, email, status_id) values ('Jared', 'Copcutt', 'jcopcutt17@nytimes.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Sher', 'Wellfare', 'swellfare18@mediafire.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Dre', 'Heasman', 'dheasman19@livejournal.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Tim', 'Darell', 'tdarell1a@alibaba.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Claudetta', 'Saltsberger', 'csaltsberger1b@mozilla.com', 1);
insert into student (first_name, last_name, email, status_id) values ('Janifer', 'Stillmann', 'jstillmann1c@youtu.be', 1);
insert into student (first_name, last_name, email, status_id) values ('Colette', 'Brobak', 'cbrobak1d@sphinn.com', 1);
