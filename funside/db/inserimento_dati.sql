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
('nicho', 'pass', 'Nicholas', 'Ricci', 'client'),
('nichoA', 'passA', 'NicholasA', 'RicciA', 'admin'),
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
('Boardgame', 'A family-friendly board game', 'boardgame.jpg'),
('Cardgame', 'A challenging card game', 'cardgame.jpeg'),
('Puzzle', 'A complex jigsaw puzzle', 'puzzle.jpg'),
('Outdoor', 'Outdoor sports equipment', 'outdoor.jpeg'),
('Videogame', 'An exciting video game', 'videogame.jpeg'),
('Toy', 'Fun and educational toys', 'toy.jpeg'),
('Strategy', 'Strategy-based board games', 'strategy.jpeg'),
('Action', 'Action-packed video games', 'action.jpg'),
('Educational', 'Educational games and puzzles', 'educational.jpeg'),
('Party', 'Games designed for parties', 'party.jpg');


INSERT INTO `funside`.`product` (`name`, `price`, `description`, `brand`, `type`, `image`) VALUES
('Chess', 29.99, 'Classic chess set', 'GameMaster', 'Boardgame', 'chess.jpg'),
('Uno', 9.99, 'Fun card game', 'Mattel', 'Cardgame', 'uno.jpg'),
('Rubik Cube', 15.49, '3x3 Rubik cube', 'Rubik', 'Puzzle', 'rubik.jpg'),
('Frisbee', 12.00, 'Outdoor frisbee', 'Wham-O', 'Outdoor', 'frisbee.jpg'),
('Monopoly', 34.99, 'Board game of property trading', 'Hasbro', 'Boardgame', 'monopoly.jpg'),
('FIFA 25', 59.99, 'Soccer video game', 'EA Sports', 'Videogame', 'fifa.jpg'),
('LEGO City', 49.99, 'LEGO city building set', 'LEGO', 'Toy', 'lego.jpg'),
('Catan', 39.99, 'Strategy board game', 'Catan Studios', 'Strategy', 'catan.jpg'),
('Mario Kart', 54.99, 'Racing video game', 'Nintendo', 'Videogame', 'mario.jpg'),
('Jenga', 14.99, 'Tower building game', 'Hasbro', 'Party', 'jenga.jpg'),
('Scrabble', 24.99, 'Classic word game', 'Hasbro', 'Boardgame', 'scrabble.jpg'),
('Exploding Kittens', 19.99, 'A strategic card game', 'Exploding Kittens LLC', 'Cardgame', 'exploding_kittens.jpg'),
('Sudoku Puzzle Book', 10.99, 'Collection of Sudoku puzzles', 'PuzzleMasters', 'Puzzle', 'sudoku.jpg'),
('Badminton Set', 29.99, 'Outdoor badminton set', 'Yonex', 'Outdoor', 'badminton.jpg'),
('Call of Duty', 69.99, 'First-person shooter video game', 'Activision', 'Videogame', 'cod.jpg'),
('Teddy Bear', 19.99, 'Soft and cuddly teddy bear', 'PlushWorld', 'Toy', 'teddy.jpg'),
('Risk', 44.99, 'Strategy board game of world domination', 'Hasbro', 'Strategy', 'risk.jpg'),
('Zelda: Breath of the Wild', 59.99, 'Open-world adventure video game', 'Nintendo', 'Videogame', 'zelda.jpg'),
('Trivial Pursuit', 29.99, 'Classic quiz game', 'Hasbro', 'Educational', 'trivial.jpg'),
('Twister', 22.99, 'Party game with physical challenges', 'Hasbro', 'Party', 'twister.jpg'),
('Magic: The Gathering Starter Kit', 24.99, 'Collectible card game starter kit', 'Wizards of the Coast', 'Cardgame', 'mtg.jpg'),
('Escape Room in a Box', 34.99, 'An at-home escape room experience', 'Mattel', 'Puzzle', 'escape_room.jpg'),
('Kite', 15.99, 'Colorful outdoor kite', 'WindRider', 'Outdoor', 'kite.jpg'),
('Fortnite', 49.99, 'Battle royale action game', 'Epic Games', 'Action', 'fortnite.jpg'),
('Play-Doh Set', 14.99, 'Creative modeling clay for kids', 'Hasbro', 'Toy', 'playdoh.jpg'),
('Carcassonne', 32.99, 'Tile-placement strategy board game', 'Z-Man Games', 'Strategy', 'carcassonne.jpg'),
('Guitar Hero', 59.99, 'Music rhythm video game', 'Activision', 'Videogame', 'guitar_hero.jpg'),
('Brain Quest', 18.99, 'Educational quiz game for kids', 'Workman Publishing', 'Educational', 'brain_quest.jpg'),
('Cards Against Humanity', 29.99, 'Party card game for adults', 'Cards Against Humanity LLC', 'Party', 'cards_against_humanity.jpg');

INSERT INTO `funside`.`address` (`user`, `add`) VALUES
('jdoe', '123 Main St, Anytown, CA 12345'),
('asmith', '456 Oak Ave, Someville, TX 78901'),
('bwhite', '789 Pine Rd, Anytown, CA 12345'),
('mjohnson', '101 Maple Dr, Someville, TX 78901'),
('rthompson', '202 Elm St, Anytown, CA 12345'),
('emiller', '303 Oak Ave, Someville, TX 78901'),
('dwilliams', '404 Pine Rd, Anytown, CA 12345'),
('lgarcia', '505 Maple Dr, Someville, TX 78901'),
('klee', '606 Elm St, Anytown, CA 12345'),
('nmartin', '707 Oak Ave, Someville, TX 78901');

INSERT INTO `funside`.`order` (`dateorder`, `datedelivery`, `status`, `totalprice`, `user`) VALUES
('2024-01-15', '2024-01-18', 'consegnato', 59.99, 'jdoe'),
('2024-01-10', '2024-01-12', 'consegnato', 19.98, 'asmith'),
('2024-01-20', '2024-01-23', 'spedito', 34.99, 'bwhite'),
('2024-01-17', '2024-01-20', 'consegnato', 9.99, 'mjohnson'),
('2024-01-12', '2024-01-15', 'consegnato', 12.00, 'rthompson'),
('2024-01-19', '2024-01-22', 'ordinato', 54.99, 'emiller'),
('2024-01-08', '2024-01-11', 'consegnato', 29.99, 'dwilliams'),
('2024-01-21', '2024-01-24', 'spedito', 15.49, 'lgarcia'),
('2024-01-14', '2024-01-17', 'consegnato', 39.99, 'klee'),
('2024-01-09', '2024-01-12', 'consegnato', 49.99, 'nmartin'),
('2024-01-16', '2024-01-19', 'in consegna', 14.99, 'jdoe'),
('2024-01-11', '2024-01-14', 'consegnato', 59.99, 'asmith'),
('2024-01-22', '2024-01-25', 'ordinato', 34.99, 'bwhite'),
('2024-01-18', '2024-01-21', 'spedito', 9.99, 'mjohnson'),
('2024-01-13', '2024-01-16', 'consegnato', 12.00, 'rthompson');

INSERT INTO `funside`.`orderdetail` (`product`, `order`, `quantity`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 3, 1),
(5, 4, 1),
(6, 5, 1),
(7, 6, 1),
(8, 7, 1),
(9, 8, 1),
(10, 9, 1),
(1, 10, 1),
(2, 11, 1),
(3, 12, 1),
(4, 13, 1),
(5, 14, 1),
(6, 15, 1),
(7, 1, 1),
(8, 2, 1),
(9, 3, 1),
(10, 4, 1),
(1, 5, 1),
(2, 6, 1),
(3, 7, 1),
(4, 8, 1),
(5, 9, 1),
(6, 10, 1),
(7, 11, 1),
(8, 12, 1),
(9, 13, 1),
(10, 14, 1),
(1, 15, 1);

INSERT INTO `funside`.`notification` (`title`, `text`, `isRead`, `order`, `user`, `date`, `time`) VALUES
('Order #3 Shipped', 'Your order #3 has been shipped and is on its way to the delivery address you provided.', 0, 3, 'bwhite', '2024-01-21', '10:30:00'),
('Order #13 Placed', 'Your order #13 has been placed successfully. You will receive updates about its progress shortly.', 1, 13, 'bwhite', '2024-01-22', '12:00:00'),
('Order #1 Delivered', 'Your order #1 has been successfully delivered to your address. Thank you for choosing our service!', 1, 1, 'jdoe', '2024-01-18', '15:00:00'),
('Order #6 Placed', 'Your order #6 has been placed successfully. You will receive updates about its progress shortly.', 1, 6, 'emiller', '2024-01-19', '09:45:00'),
('Order #8 Shipped', 'Your order #8 has been shipped and is on its way to the delivery address you provided.', 1, 8, 'lgarcia', '2024-01-22', '14:15:00'),
('Order #2 Delivered', 'Your order #2 has been successfully delivered to your address. Thank you for choosing our service!', 0, 2, 'asmith', '2024-01-12', '16:30:00'),
('Order #15 Shipped', 'Your order #15 has been shipped and is on its way to the delivery address you provided.', 0, 15, 'rthompson', '2024-01-14', '09:00:00'),
('Order #4 Delivered', 'Your order #4 has been successfully delivered to your address. Thank you for choosing our service!', 1, 4, 'mjohnson', '2024-01-20', '10:45:00'),
('Order #14 Shipped', 'Your order #14 has been shipped and is on its way to the delivery address you provided.', 0, 14, 'mjohnson', '2024-01-19', '12:15:00'),
('Order #7 Delivered', 'Your order #7 has been successfully delivered to your address. Thank you for choosing our service!', 1, 7, 'dwilliams', '2024-01-11', '17:00:00'),
('Order #10 Shipped', 'Your order #10 has been shipped and is on its way to the delivery address you provided.', 0, 10, 'nmartin', '2024-01-10', '10:00:00'),
('Order #9 Delivered', 'Your order #9 has been successfully delivered to your address. Thank you for choosing our service!', 1, 9, 'klee', '2024-01-17', '14:30:00');



INSERT INTO `funside`.`review` (`product`, `user`, `rating`, `text`) VALUES
(1, 'jdoe', 5, 'Excellent quality chess set!'),
(2, 'asmith', 4, 'Fun card game, but could use more cards.'),
(3, 'bwhite', 5, 'Challenging and addictive puzzle.'),
(4, 'mjohnson', 3, 'Not as durable as I expected.'),
(5, 'rthompson', 4, 'Classic game, always a good time.'),
(6, 'emiller', 5, 'Great graphics and gameplay.');

INSERT INTO funside.review (product, user, rating, text) VALUES
(1, 'jdoe', 5, 'Un classico intramontabile! Perfetto per allenare la mente.'),
(2, 'mjohnson', 4, 'Divertente da giocare con amici, anche se a volte le regole sono un po caotiche.'),
(3, 'bwhite', 5, 'Sempre una sfida stimolante! Non mi stanco mai di risolverlo.'),
(4, 'klee', 3, 'Buono per il parco, ma la qualità della plastica potrebbe essere migliore.'),
(5, 'lgarcia', 5, 'Un must-have per le serate in famiglia! Adoriamo le sfide.'),
(6, 'nmartin', 4, 'Grafica migliorata, ma il gameplay sembra sempre lo stesso.'),
(7, 'asmith', 5, 'Perfetto per i bambini, ma anche per gli adulti appassionati di costruzioni.'),
(8, 'dwilliams', 4, 'Molto strategico, ma le prime partite possono essere difficili da capire.'),
(9, 'rthompson', 5, 'Uno dei migliori giochi di corse, super divertente con gli amici!'),
(10, 'nicho', 3, 'Divertente, ma la qualità del legno potrebbe essere migliore.'),
(11, 'emiller', 5, 'Perfetto per gli amanti delle parole! Stimola la creatività.'),
(12, 'jdoe', 4, 'Un gioco originale e imprevedibile, ma può essere un po frustrante.'),
(13, 'mjohnson', 5, 'Perfetto per chi ama la logica! Ottimo libro di puzzle.'),
(14, 'bwhite', 4, 'Il set è buono, ma le racchette potrebbero essere più resistenti.'),
(15, 'lgarcia', 5, 'Adrenalina pura! Uno dei migliori giochi di guerra.'),
(16, 'nmartin', 5, 'Regalo perfetto per i bambini, molto morbido e di alta qualità.'),
(17, 'asmith', 4, 'Grande classico della strategia, anche se le partite possono essere lunghe.'),
(18, 'dwilliams', 5, 'Gioco incredibile! Il mondo aperto è spettacolare.'),
(19, 'rthompson', 4, 'Ottimo gioco per sfidare amici e famiglia, molto coinvolgente.'),
(20, 'nichoA', 5, 'Divertentissimo, perfetto per le feste!'),
(21, 'klee', 4, 'Buon kit per principianti, ma le carte avanzate sono difficili da trovare.'),
(22, 'emiller', 5, 'Esperienza fantastica! Sembra davvero di essere in un escape room.'),
(23, 'jdoe', 3, 'Molto colorato e divertente, ma il vento deve essere perfetto.'),
(24, 'mjohnson', 5, 'Fantastico battle royale, grafica e gameplay spettacolari!'),
(25, 'bwhite', 4, 'I bambini lo adorano! Stimola la creatività in modo divertente.');


UPDATE funside.product 
SET avgrating = (
    SELECT AVG(rating) 
    FROM funside.review 
    WHERE funside.review.product = funside.product.idproduct
) 
WHERE idproduct IN (
    SELECT DISTINCT product FROM funside.review
);