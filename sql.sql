create database login;
use login;
create table user (
email varchar(50) not null unique comment 'e-mail'
username varchar(20) not null unique comment 'username',
password varchar(32) not null comment 'password with salt',
);