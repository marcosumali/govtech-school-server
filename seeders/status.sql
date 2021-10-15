create table if not exists status (
  status_id BIGINT AUTO_INCREMENT NOT NULL,
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY (status_id)
);

insert into status (name) values ('Active');
insert into status (name) values ('Suspended');

