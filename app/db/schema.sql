DROP DATABASE IF EXISTS battlebots_db;
CREATE DATABASE battlebots_db;
USE battlebots_db;

CREATE TABLE users (
	id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(80) NULL,
    PRIMARY KEY (id),
    INDEX(username)
);

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
    user_id INT UNIQUE NOT NULL,
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

CREATE TABLE user_battle_results (
	id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    wins INT DEFAULT 0 NOT NULL,
    losses INT DEFAULT 0 NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
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
COALESCE(SUM(P.damage), 0) AS total_damage,
COALESCE(SUM(P.armor), 0) AS total_armor
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
SELECT A.user_id,
A.username,
A.robot_id,
A.robot_name,
PP.position_id,
PP.description,
COALESCE(P.name, 'Empty') AS part_name,
COALESCE(P.damage, 0) AS damage,
COALESCE(P.armor, 0) AS armor
FROM robot_part_positions PP
CROSS JOIN
	(SELECT U.id AS user_id,
	U.username,
	R.id AS robot_id,
	R.name AS robot_name
	FROM users U
	INNER JOIN robots R
	ON U.id = R.user_id) A
LEFT JOIN user_robot_parts RP
ON A.robot_id = RP.robot_id
AND RP.position_id = PP.position_id
LEFT JOIN available_robot_parts P
ON RP.part_id = P.id;

-- User Inventory View
CREATE VIEW vw_user_inventory AS
SELECT I.user_id,
RP.id AS part_id,
RP.name,
RP.damage,
RP.armor,
I.quantity - COALESCE(UP.part_used,0) AS available 
FROM user_inventory I 
INNER JOIN available_robot_parts RP
ON I.part_id = RP.id
LEFT JOIN (SELECT user_id, part_id, COUNT(part_id) AS part_used
	FROM user_robot_parts
    GROUP BY user_id, part_id) UP
ON I.part_id = UP.part_id
AND I.user_id = UP.user_id
WHERE (I.quantity - COALESCE(UP.part_used, 0)) > 0;