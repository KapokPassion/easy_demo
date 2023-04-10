create database login;
use login;
create table user (
username varchar(20) not null unique comment 'username',
password varchar(32) not null comment 'password with salt',
email varchar(50) not null comment 'e-mail'
);