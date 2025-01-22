INSERT INTO `funside`.`user` (`username`, `password`, `name`, `surname`, `type`) VALUES
('jdoe', 'password123', 'John', 'Doe', 'client'),
('asmith', 'securepass', 'Alice', 'Smith', 'admin'),
('bwhite', 'pass2021', 'Bob', 'White', 'client'),
('mjohnson', 'mypassword', 'Mary', 'Johnson', 'client'),
('rthompson', 'adminpass', 'Robert', 'Thompson', 'admin'),
('emiller', 'safe2022', 'Emily', 'Miller', 'client'),
('dwilliams', 'passchange', 'David', 'Williams', 'client'),
('lgarcia', 'newpass', 'Laura', 'Garcia', 'client'),
('klee', 'password', 'Kevin', 'Lee', 'client'),
('nmartin', 'mypass', 'Nancy', 'Martin', 'client');

INSERT INTO `funside`.`address` (`user`, `add`) VALUES
('jdoe', '123 Main Street, Springfield'),
('asmith', '456 Elm Street, Shelbyville'),
('bwhite', '789 Oak Avenue, Capital City'),
('mjohnson', '101 Maple Drive, Ogdenville'),
('rthompson', '202 Pine Street, North Haverbrook'),
('emiller', '303 Cedar Court, Brockway'),
('dwilliams', '404 Walnut Lane, Springfield'),
('lgarcia', '505 Birch Road, Shelbyville'),
('klee', '606 Aspen Circle, Capital City'),
('nmartin', '707 Spruce Avenue, Ogdenville');


INSERT INTO `funside`.`producttype` (`type`, `description`, `image`) VALUES
('boardgame', 'A family-friendly board game', 'boardgame.jpg'),
('cardgame', 'A challenging card game', 'cardgame.jpg'),
('puzzle', 'A complex jigsaw puzzle', 'puzzle.jpg'),
('outdoor', 'Outdoor sports equipment', 'outdoor.jpg'),
('videogame', 'An exciting video game', 'videogame.jpg'),
('toy', 'Fun and educational toys', 'toy.jpg'),
('strategy', 'Strategy-based board games', 'strategy.jpg'),
('action', 'Action-packed video games', 'action.jpg'),
('educational', 'Educational games and puzzles', 'educational.jpg'),
('party', 'Games designed for parties', 'party.jpg');


INSERT INTO `funside`.`product` (`name`, `price`, `description`, `brand`, `type`, `image`) VALUES
('Chess', 29.99, 'Classic chess set', 'GameMaster', 'boardgame', 'chess.jpg'),
('Uno', 9.99, 'Fun card game', 'Mattel', 'cardgame', 'uno.jpg'),
('Rubik Cube', 15.49, '3x3 Rubik cube', 'Rubik', 'puzzle', 'rubik.jpg'),
('Frisbee', 12.00, 'Outdoor frisbee', 'Wham-O', 'outdoor', 'frisbee.jpg'),
('Monopoly', 34.99, 'Board game of property trading', 'Hasbro', 'boardgame', 'monopoly.jpg'),
('FIFA 25', 59.99, 'Soccer video game', 'EA Sports', 'videogame', 'fifa.jpg'),
('LEGO City', 49.99, 'LEGO city building set', 'LEGO', 'toy', 'lego.jpg'),
('Catan', 39.99, 'Strategy board game', 'Catan Studios', 'strategy', 'catan.jpg'),
('Mario Kart', 54.99, 'Racing video game', 'Nintendo', 'videogame', 'mario.jpg'),
('Jenga', 14.99, 'Tower building game', 'Hasbro', 'party', 'jenga.jpg');

