DELETE FROM users;
INSERT INTO users (username, password)
VALUES ('bob', '1234'),
('Easy Computer', '1234');

INSERT INTO user_wallets (user_id, amount)
VALUES (1, 150);

DELETE FROM robot_part_positions;
INSERT INTO robot_part_positions (position_id, description)
VALUES (1, 'Weapon 1 Slot'),
(2, 'Weapon 2 Slot'),
(3, 'Body Slot'),
(4, 'Head Slot');

DELETE FROM available_robot_parts;
INSERT INTO available_robot_parts (name, cost, damage, armor, weapon)
VALUES ('Basic Armor', 5.50, 0, 8, 0),
('Saw Arm', 8.00, 10, 0, 1),
('Laser Gun', 15.00, 12, 0, 1),
('Reactive Armor', 19.00, 1, 14, 0);

INSERT INTO user_inventory (user_id, part_id, quantity, used)
VALUES (1, 1, 2, 0),
(1, 2, 3, 0),
(1, 4, 1, 0);


INSERT INTO robots (user_id, name)
VALUES (2, 'Easy Robot'),
(1, 'Annihilator');

INSERT INTO user_robot_parts (user_id, robot_id, position_id, part_id)
VALUES (1, 2, 1, 2),
(1, 2, 3, 4),
(2, 1, 1, 3),
(2, 1, 3, 1);