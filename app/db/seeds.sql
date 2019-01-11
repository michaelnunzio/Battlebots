DELETE FROM users;
INSERT INTO users (username, password)
VALUES ('bob', '$2a$10$Ejaj5BuG2WGh8GtUPWwWl.hMNFCN5VDnEzYgwqNec0FZMKA5fxS9u'),
('Computer', '1234');

INSERT INTO user_wallets (user_id, amount)
VALUES (1, 150),
(2, 0);

INSERT INTO user_battle_results (user_id, wins, losses)
VALUES (1,0,0);

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
('Laser Gun', 40.00, 20, 0, 1),
('Flamethrower', 26.00, 14, 0, 1),
('Reactive Armor', 19.00, 1, 14, 0),
('Radiant Armor', 32.00, 0, 22, 0),
('Nanotech Sword', 80.00, 22, 0, 1),
('Nanotech Armor', 120.00, 0, 24, 0),
('Sword of a Thousand Truths', 250, 30, 4, 1),
('Indestructible Armor', 300, 2, 28, 0);

INSERT INTO user_inventory (user_id, part_id, quantity, used)
VALUES (1, 1, 2, 0),
(1, 2, 3, 0),
(1, 4, 1, 0);


INSERT INTO robots (user_id, name)
VALUES (1, 'Annihilator'),
(2, 'Easy Robot'),
(2, 'Medium Robot'),
(2, 'Hard Robot');

INSERT INTO user_robot_parts (user_id, robot_id, position_id, part_id)
VALUES (1, 1, 1, 2),
(1, 1, 3, 1),
(2, 2, 1, 3),
(2, 2, 3, 1),
(2, 3, 1, 3),
(2, 3, 2, 7),
(2, 3, 3, 5),
(2, 3, 4, 5),
(2, 4, 1, 7),
(2, 4, 2, 9),
(2, 4, 3, 8),
(2, 4, 4, 10);