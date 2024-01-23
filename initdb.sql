-- Ensure the database and schema names here match the databaes and schema
-- name in the `.env` file.
create database grocery_app;
create schema grocery_app;
\c grocery_app;


create table users(
    id serial primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    name varchar(255) not null,
    birthday date 
);

create table shopping_list(
    id serial primary key,
    list_name varchar(255) not null,
    users_id int references users(id)
);

create table shopping_item(
    id serial primary key,
    item_name varchar(255) not null,
    shopping_list_id int references shopping_list(id)
);

insert into users (username, password, name, birthday) 
values ('lara00', 'secret123', 'lara', '2000-01-01'), ('jack123', 'secret123', 'jack', '1990-02-02');

insert into shopping_list (list_name, users_id) 
values('birthday cake', 1 ), ('healthy salad', 2);

insert into shopping_item (item_name, shopping_list_id) 
values ( 'flour', 1), ('sugar', 1), ('egg', 1), ('lettuce', 2), ('tomato', 2), ('kale', 2), ('raisins', 2);

