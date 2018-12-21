DROP DATABASE IF EXISTS battlebots_db;
CREATE DATABASE battlebots_db;
USE battlebots_db;

CREATE TABLE users (
	id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(80) NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ix_username ON users(username);

INSERT INTO users (username, password)
VALUES ('bob', '1234');