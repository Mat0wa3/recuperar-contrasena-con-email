DROP DATABASE IF EXISTS productosAlimenticiosDb;
CREATE DATABASE productosAlimenticiosDb;
USE productosAlimenticiosDb;

CREATE table users(
	userID binary(16) PRIMARY KEY NOT NULL,
    name varchar(50) NOT NULL,
    last_name varchar(50),
    email varchar(100) NOT NULL,
    password varchar(60) NOT NULL,
    disabled boolean default 0
);

CREATE TABLE verifyUser(
	userID binary(16) PRIMARY KEY NOT NULL,
    name varchar(50) NOT NULL,
    last_name varchar(50),
    email varchar(100) NOT NULL,
    password varchar(60) NOT NULL,
    verificationCode int NOT NULL
);

CREATE TABLE products (
    productID binary(16) PRIMARY KEY NOT NULL,
    product VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    disabled boolean DEFAULT 0
);