DELETE FROM users;
INSERT INTO users (username, password)
VALUES ('bob', '1234'),
('Easy Computer', '1234');

INSERT INTO user_wallets (user_id, amount)
VALUES (1, 150);

DELETE FROM robot_parts;
INSERT INTO robot_parts (name, cost, damage, armor)
VALUES ('Basic Armor', 5.50, 0, 8),
('Saw Arm', 8.00, 10, 0),
('Laser Gun', 15.00, 12, 0),
('Reactive Armor', 19.00, 1, 14);

INSERT INTO user_inventory (user_id, part_id, quantity, used)
VALUES (1, 1, 2, 0),
(1, 2, 3, 0),
(1, 4, 1, 0);

INSERT INTO robots (user_id, name, body, weapon)
VALUES (2, 'Easy Robot', 1, 2),
(1, 'Annihilator', 3, 4);