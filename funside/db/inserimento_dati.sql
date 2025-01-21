INSERT INTO `funside`.`user` (`username`, `password`, `name`, `surname`, `type`) VALUES
('john_doe', 'password123', 'John', 'Doe', 'client'),
('jane_smith', 'securepass', 'Jane', 'Smith', 'client'),
('alice_brown', 'mypassword', 'Alice', 'Brown', 'client'),
('bob_jones', 'pass1234', 'Bob', 'Jones', 'client'),
('charlie_lee', 'lee_secure', 'Charlie', 'Lee', 'client'),
('danielle_white', 'white_pass', 'Danielle', 'White', 'client'),
('eva_green', 'green123', 'Eva', 'Green', 'client'),
('frank_harris', 'harris2021', 'Frank', 'Harris', 'client'),
('george_young', 'young4me', 'George', 'Young', 'client'),
('helen_turner', 'turnerpass', 'Helen', 'Turner', 'admin');

INSERT INTO `funside`.`address` (`user`, `add`) VALUES
('john_doe', '123 Main Street, Springfield'),
('jane_smith', '456 Oak Avenue, Greenfield'),
('alice_brown', '789 Pine Road, Redtown'),
('bob_jones', '101 Maple Drive, Bluetown'),
('charlie_lee', '202 Cedar Street, Yellowville'),
('danielle_white', '303 Birch Lane, White City'),
('eva_green', '404 Elm Avenue, Green Hills'),
('frank_harris', '505 Spruce Way, Clearwater'),
('george_young', '606 Cherry Blvd, New City'),
('helen_turner', '707 Willow Court, Central Town');

INSERT INTO `funside`.`producttype` (`type`, `description`) VALUES
('Board Game', 'A game played on a flat surface using pieces and dice.'),
('Card Game', 'A game played using a deck of cards.'),
('Puzzle', 'A game or problem that tests ingenuity.'),
('Role-playing Game', 'A game where players assume roles in a fictional setting.'),
('Educational Game', 'A game designed to teach skills or knowledge.');

INSERT INTO `funside`.`product` (`name`, `price`, `description`, `brand`, `avgrating`, `minnumplayers`, `maxnumplayers`, `numpages`, `type`) VALUES
('Monopoly', 29.99, 'Classic real-estate trading game.', 'Hasbro', 4.5, 2, 8, NULL, 'Board Game'),
('Catan', 45.99, 'Strategy game involving resource management.', 'Kosmos', 4.7, 3, 4, NULL, 'Board Game'),
('Uno', 12.99, 'A popular family card game.', 'Mattel', 4.6, 2, 10, NULL, 'Card Game'),
('Chess', 19.99, 'Classic game of strategy.', 'Classic Games', 4.9, 2, 2, NULL, 'Board Game'),
('Pandemic', 39.99, 'Cooperative board game to stop global disease outbreaks.', 'Z-Man Games', 4.8, 2, 4, NULL, 'Board Game'),
('Scrabble', 24.99, 'Word-forming board game.', 'Hasbro', 4.3, 2, 4, NULL, 'Board Game'),
('Exploding Kittens', 19.99, 'Humorous card game for all ages.', 'Exploding Kittens LLC', 4.5, 2, 5, NULL, 'Card Game'),
('Ticket to Ride', 34.99, 'Railway adventure board game.', 'Days of Wonder', 4.6, 2, 5, NULL, 'Board Game'),
('Carcassonne', 29.99, 'Tile-placement game.', 'Z-Man Games', 4.7, 2, 5, NULL, 'Board Game'),
('Pictionary', 22.99, 'Draw and guess game for teams.', 'Mattel', 4.4, 3, 8, NULL, 'Board Game');
