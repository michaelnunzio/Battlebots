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

CREATE TABLE available_robot_parts (
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    cost NUMERIC(18,2) NOT NULL,
    damage INT NULL,
    armor INT NULL,
    weapon BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE robot_part_positions (
	id INT AUTO_INCREMENT NOT NULL,
    position_id INT NOT NULL,
    description VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    INDEX(position_id)
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
    FOREIGN KEY(part_id) REFERENCES available_robot_parts(id) ON DELETE CASCADE
);

CREATE TABLE robots (
	id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_robot_parts (
	id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    robot_id INT NOT NULL,
    position_id INT NOT NULL,
    part_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (robot_id) REFERENCES robots(id) ON DELETE CASCADE,
    FOREIGN KEY (position_id) REFERENCES robot_part_positions(position_id) ON DELETE CASCADE,
    FOREIGN KEY (part_id) REFERENCES available_robot_parts(id) ON DELETE CASCADE
);

-- Robot Stats View
CREATE VIEW vw_user_robot_stats AS
SELECT U.id AS user_id,
U.username,
R.id AS robot_id,
R.name,
SUM(P.damage) AS total_damage,
SUM(P.armor) AS total_armor
FROM users U
INNER JOIN robots R
ON U.id = R.user_id
LEFT JOIN user_robot_parts RP
ON R.id = RP.robot_id
LEFT JOIN robot_part_positions PP
ON RP.position_id = PP.position_id
LEFT JOIN available_robot_parts P
ON RP.part_id = P.id
GROUP BY U.id, U.username, R.id, R.name;

-- Robot configuration view
CREATE VIEW vw_user_robot_configuration AS
SELECT U.id AS user_id,
U.username,
R.id AS robot_id,
R.name AS robot_name,
PP.position_id,
PP.description,
P.name AS part_name,
P.damage,
P.armor
FROM users U
INNER JOIN robots R
ON U.id = R.user_id
INNER JOIN user_robot_parts RP
ON R.id = RP.robot_id
INNER JOIN robot_part_positions PP
ON RP.position_id = PP.position_id
INNER JOIN available_robot_parts P
ON RP.part_id = P.id;