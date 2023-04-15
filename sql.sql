create database healthcare;
use healthcare;
create table user (
username varchar(20) not null unique comment 'username',
email varchar(50) not null unique comment 'e-mail',
password varchar(32) not null comment 'password with salt'
);

create table cancer_prediction_data (
id int(11) not null unique auto_increment,
mean_radius float not null,
mean_texture float not null,
mean_perimeter float not null,
mean_area float not null,
mean_smoothness float not null,
diagnosis varchar(2) not null
);

