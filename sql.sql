create database healthcare;
use healthcare;
create table user (
username varchar(20) not null unique comment 'username',
email varchar(50) not null unique comment 'e-mail',
password varchar(32) not null comment 'password with salt'
);