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

CREATE TABLE robot_parts (
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    cost NUMERIC(18,2) NOT NULL,
    damage INT NULL,
    armor INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_wallets (
	id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    amount NUMERIC(18,2) DEFAULT 100 NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_inventory (
	id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    part_id INT NOT NULL,
    quantity INT DEFAULT 0 NOT NULL,
    used INT DEFAULT 0 NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(part_id) REFERENCES robot_parts(id) ON DELETE CASCADE
);

CREATE TABLE robots (
	id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    body INT NULL,
    weapon INT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (body) REFERENCES robot_parts(id) ON DELETE CASCADE,
    FOREIGN KEY (weapon) REFERENCES robot_parts(id) ON DELETE CASCADE
);

CREATE TABLE user_robots (
	id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    robot_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (robot_id) REFERENCES robots(id) ON DELETE CASCADE
);