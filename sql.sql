create database login;
use login;
create table user (
password varchar(32) not null unique comment 'password with salt',
username varchar(20) not null unique comment 'username',
email varchar(50) not null comment 'e-mail'
);