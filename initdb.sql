-- Ensure the database and schema names here match the databaes and schema
-- name in the `.env` file.
create database grocery_app;
create schema grocery_app;
\c grocery_app;


create table test(
    id serial primary key,
    name varchar(255) not null,
    birthday date
);

insert into test (name) values ('lara'), ('jack');