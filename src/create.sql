create database Banking_System;
use Banking_System;
drop table customer;
select * from customer;
create table customer(
account_number varchar(10) not null primary key, 
email_id varchar(50),
name varchar(20),
account_balance int not null
);

insert into customer values('ACC123456','vishnuramesh@gmail.com','Vishnu Ramesh',1000);
insert into customer values('ACC654321','rahulvishwa@gmail.com','Rahul Vishwa',5000);
insert into customer values('ACC987654','anilreddy@gmail.com','Anil Reddy',1500);
insert into customer values('ACC123457','rohitshukla@gmail.com','Rohit Shukla',2500);
insert into customer values('ACC654320','varunshiva@gmail.com','Varun Shiva',1300);
insert into customer values('ACC123458','venkatsuhas@gmail.com','Venkat Suhas',1700);
insert into customer values('ACC987659','mohiyadeenshaikh@gmail.com','Mohiyadeen Shaikh',1600);
insert into customer values('ACC123460','mandeepsharma@gmail.com','Mandeep Sharma',2700);
insert into customer values('ACC654361','sureshchandran@gmail.com','Suresh Chandran',1900);
insert into customer values('ACC123462','vigneshashwin@gmail.com','Vignesh Ashwin',1200);

drop table transaction;
select * from transaction;
create table transaction(
sender_account_number varchar(10),
receiver_account_number varchar(10),
datetime varchar(50),
amount int not null,
primary key(sender_account_number,receiver_account_number,datetime)
);

insert into transaction values('ACC123456','ACC654321','2021-04-10T13:33:43Z',100);
insert into transaction values('ACC654321','ACC987654','2021-04-11T13:33:43Z',50);
insert into transaction values('ACC987654','ACC123456','2021-04-12T13:33:43Z',40);
insert into transaction values('ACC987654','ACC654321','2021-04-04T13:33:43Z',60);
insert into transaction values('ACC654321','ACC123456','2021-04-09T13:33:43Z',70);
insert into transaction values('ACC123456','ACC987654','2021-04-06T13:33:43Z',90);
insert into transaction values('ACC123457','ACC654320','2021-04-01T13:33:43Z',40);
insert into transaction values('ACC654320','ACC123457','2021-04-02T13:33:43Z',150);
insert into transaction values('ACC123457','ACC654321','2021-04-03T13:33:43Z',200);
insert into transaction values('ACC123457','ACC987654','2021-04-05T13:33:43Z',400);