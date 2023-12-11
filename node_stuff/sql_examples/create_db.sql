DROP TABLE IF EXISTS characters;

CREATE TABLE characters (
    c_id INTEGER PRIMARY KEY,
    c_name TEXT NOT NULL,
    c_wit INTEGER, 
    c_strength INTEGER, 
    c_attack INTEGER, 
    c_defense INTEGER,
    c_magic INTEGER
);

INSERT INTO characters 
(c_id, c_name, c_wit, c_strength, c_attack, c_defense, c_magic)
VALUES
(0, "Archibald", 0, 7, 2, 1, 0);


INSERT INTO characters 
(c_id, c_name, c_wit, c_strength, c_attack, c_defense, c_magic)
VALUES
(1, "Henrik", 4, 3, 3, 1, 2),
(2, "Isadore", 2, 6, 4, 0, 4),
(3, "Lucinda", 4, 3, 1, 8, 1),
(4, "Dominic", 5, 2, 3, 3, 2);

CREATE TABLE equipment (
    equipment_id INTEGER PRIMARY KEY,
    equipment_name TEXT NOT NULL
);
CREATE TABLE quest (
    quest_id INTEGER PRIMARY KEY,
    quest_name TEXT NOT NULL
);
CREATE TABLE assigned_equipment (
    c_name TEXT NOT NULL,
    equipment_name TEXT NOT NULL
    
);
CREATE TABLE assigned_quests (
    c_name TEXT NOT NULL,
    quest_name TEXT NOT NULL
);

INSERT into equipment
(equipment_id, equipment_name)
VALUES
(0,'sword'),
(1,'shield'),
(2,'staff'),
(3,'potion'),
(4,'armor');

INSERT into quest
(quest_id, quest_name)
VALUES
(0,'kill the dragon'),
(1,'save the princess'),
(2,'find the treasure'),
(3,'defeat the evil wizard'),
(4,'find the magic sword');