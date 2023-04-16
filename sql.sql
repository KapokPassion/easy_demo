create database healthcare;
use healthcare;

drop table user;

create table user (
username varchar(20) not null unique comment 'username',
email varchar(50) not null unique comment 'e-mail',
password varchar(32) not null comment 'password with salt',
failed_times int not null default 0,
block_time int default 0,
token varchar(32),
token_start_time int
);

drop table cancer_prediction_data;

create table cancer_prediction_data (
id int(11) not null unique auto_increment,
mean_radius float not null,
mean_texture float not null,
mean_perimeter float not null,
mean_area float not null,
mean_smoothness float not null,
diagnosis varchar(2) not null
);

