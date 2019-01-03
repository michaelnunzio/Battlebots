-- Wallet Query
SELECT U.username,
W.amount
FROM users U
INNER JOIN user_wallets W
ON U.id = W.user_id;

-- Inventory Query
SELECT U.username,
P.name,
I.quantity,
I.used
FROM users U
INNER JOIN user_inventory I
ON U.id = I.user_id
INNER JOIN available_robot_parts P
ON P.id = I.part_id;

-- Robot Query
SELECT U.id AS user_id,
U.username,
R.id AS robot_id,
R.name,
PP.position_id,
PP.description,
P.name,
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

-- Robot Stats Query
 SELECT * FROM vw_user_robot_stats;
 
 -- Robot Configuration Query
 SELECT * FROM vw_user_robot_configuration;
 
 -- User Inventory Query
 SELECT * FROM vw_user_inventory;