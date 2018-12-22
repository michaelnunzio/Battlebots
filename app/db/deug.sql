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
INNER JOIN robot_parts P
ON P.id = I.part_id;

-- Robot Query
SELECT U.username,
R.name robot_name,
B.name AS body_part,
W.name AS weapon_part
FROM users U
INNER JOIN robots R
ON U.id = R.user_id
INNER JOIN robot_parts B
ON R.body = B.id
INNER JOIN robot_parts W
ON R.weapon = W.id;

-- Robot Stats Query
SELECT RP.user_id,
RP.robot_name,
SUM(damage) total_damage,
SUM(armor) total_armor
FROM (
	SELECT R.user_id,
    R.id robot_id,
    R.name robot_name,
	P.name part_name,
	P.damage,
	P.armor
	FROM robots R
	INNER JOIN robot_parts P
	ON R.body = P.id
	GROUP BY R.user_id, R.id

	UNION ALL

	SELECT R.user_id,
    R.id robot_id,
    R.name robot_name,
	P.name part_name,
	P.damage,
	P.armor
	FROM robots R
	INNER JOIN robot_parts P
	ON R.weapon = P.id
	GROUP BY R.user_id, R.id
) RP
GROUP BY RP.user_id, RP.robot_id