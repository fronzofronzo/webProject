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
('bwhite', '789 Oak Avenue, Capital City'),
('mjohnson', '101 Maple Drive, Ogdenville'),
('emiller', '303 Cedar Court, Brockway'),
('dwilliams', '404 Walnut Lane, Springfield'),
('lgarcia', '505 Birch Road, Shelbyville'),
('klee', '606 Aspen Circle, Capital City'),
('nmartin', '707 Spruce Avenue, Ogdenville');

INSERT INTO `funside`.`producttype` (`type`, `description`, `image`) VALUES
('Boardgame', 'A family-friendly board game', 'boardgame.jpg'),
('Cardgame', 'A challenging card game', 'cardgame.jpeg'),
('Puzzle', 'A complex jigsaw puzzle', 'puzzle.jpeg'),
('Outdoor', 'Outdoor sports equipment', 'outdoor.jpeg'),
('Videogame', 'An exciting video game', 'videogame.jpeg'),
('Toy', 'Fun and educational toys', 'toy.jpeg'),
('Strategy', 'Strategy-based board games', 'strategy.jpeg'),
('Action', 'Action-packed video games', 'action.png'),
('Educational', 'Educational games and puzzles', 'educational.jpeg'),
('Party', 'Games designed for parties', 'party.jpg');


INSERT INTO `funside`.`product` (`name`, `price`, `description`, `brand`, `type`, `image`, `availability`) VALUES
('Scacchi', 29.99, 'Un classico intramontabile degli scacchi, perfetto per allenare la mente e sviluppare strategie vincenti. Include una scacchiera in legno e pezzi finemente lavorati.', 'GameMaster', 'Boardgame', 'chess.jpg', 4),
('Uno', 9.99, 'Un divertente gioco di carte adatto a tutta la famiglia. Le regole semplici ma avvincenti garantiscono sfide emozionanti tra amici e parenti.', 'Mattel', 'Cardgame', 'uno.png', 100),
('Cubo di Rubik', 15.49, 'Il celebre rompicapo 3x3 che mette alla prova la tua abilità logica e la velocità di risoluzione. Perfetto per sfide personali e competizioni.', 'Rubik', 'Puzzle', 'rubik.png', 75),
('Frisbee', 12.00, 'Disco aerodinamico ideale per il divertimento all aperto. Perfetto per giochi in spiaggia, al parco o in giardino.', 'Wham-O', 'Outdoor', 'frisbee.jpeg', 120),
('Monopoly', 34.99, 'Il famoso gioco da tavolo di compravendita immobiliare. Acquista proprietà, costruisci case e hotel e diventa il monopolista della città.', 'Hasbro', 'Boardgame', 'monopoly.jpeg', 40),
('EA Sports FC25', 59.99, 'Un simulatore di calcio realistico con licenze ufficiali, grafica migliorata e modalità di gioco innovative per un esperienza unica.', 'EA Sports', 'Videogame', 'easportsfc25.jpeg', 80),
('Catan', 39.99, 'Un avvincente gioco di strategia dove i giocatori devono colonizzare un isola, scambiando risorse e costruendo strade e insediamenti.', 'Catan Studios', 'Strategy', 'catan.jpeg', 60),
('Mario Kart', 54.99, 'Un gioco di corse iconico con i personaggi Nintendo. Gareggia su circuiti mozzafiato con potenziamenti e sfide multiplayer.', 'Nintendo', 'Videogame', 'mariokart.jpeg', 70),
('Jenga', 14.99, 'Un gioco di abilità e destrezza in cui i giocatori devono rimuovere blocchi da una torre senza farla crollare. Perfetto per le serate in compagnia.', 'Hasbro', 'Party', 'jenga.jpeg', 90),
('Scarabeo', 24.99, 'Il classico gioco di parole dove i giocatori devono formare vocaboli sulla plancia, utilizzando lettere con punteggi diversi.', 'Hasbro', 'Boardgame', 'scrabble.jpeg', 65),
('Exploding Kittens', 19.99, 'Un gioco di carte strategico e imprevedibile, con illustrazioni umoristiche e regole semplici ma avvincenti.', 'Exploding Kittens LLC', 'Cardgame', 'explodingkittens.jpeg', 85),
('Call of Duty BO3', 69.99, 'Uno sparatutto in prima persona con una campagna coinvolgente, modalità multiplayer avanzata e missioni cooperative.', 'Activision', 'Videogame', 'codbo3.jpeg', 55),
('Risiko', 44.99, 'Il gioco di strategia per eccellenza, dove i giocatori devono conquistare il mondo attraverso battaglie e alleanze.', 'Hasbro', 'Strategy', 'risiko.jpeg', 50),
('Zelda: Breath of the Wild', 59.99, 'Un epico gioco di avventura open-world con grafica spettacolare e una trama coinvolgente.', 'Nintendo', 'Videogame', 'zelda.jpeg', 30),
('Trivial Pursuit', 29.99, 'Un quiz game classico con domande su vari argomenti. Perfetto per sfide tra amici e familiari.', 'Hasbro', 'Educational', 'trivial.jpeg', 75),
('Twister', 22.99, 'Un gioco di movimento che mette alla prova la flessibilità e il divertimento dei partecipanti. Perfetto per le feste.', 'Hasbro', 'Party', 'twister.jpeg', 95),
('Escape Room in a Box', 34.99, 'Un esperienza da escape room direttamente a casa tua, con enigmi e sfide da risolvere in squadra.', 'Mattel', 'Puzzle', 'escaperoom.jpeg', 45),
('Aquilone', 15.99, 'Un aquilone colorato perfetto per giornate ventose al parco o in spiaggia. Facile da montare e resistente.', 'WindRider', 'Outdoor', 'acquilone.jpeg', 100),
('Fortnite', 49.99, 'Un battle royale frenetico con costruzioni strategiche e azione adrenalinica.', 'Epic Games', 'Action', 'fortnite.jpeg', 60),
('Set Play-Doh', 14.99, 'Un set di pasta modellabile colorata, perfetto per stimolare la creatività dei bambini.', 'Hasbro', 'Toy', 'playdoh.jpeg', 110),
('Carcassonne', 32.99, 'Un gioco di piazzamento tessere dove i giocatori costruiscono città, strade e campi per guadagnare punti.', 'Z-Man Games', 'Strategy', 'carcassonne.jpeg', 50),
('Guitar Hero', 59.99, 'Un gioco musicale in cui puoi suonare le tue canzoni preferite con una chitarra controller.', 'Activision', 'Videogame', 'guitarhero.jpeg', 40),
('Brain Quest', 18.99, 'Un gioco educativo con quiz e domande per mettere alla prova le conoscenze dei più piccoli.', 'Workman Publishing', 'Educational', 'brainquest.png', 80),
('Cards Against Humanity', 29.99, 'Un gioco di carte satirico e irriverente, perfetto per serate tra amici.', 'Cards Against Humanity LLC', 'Party', 'cardsagainsthumanity.png', 90);

INSERT INTO `funside`.`address` (`user`, `add`) VALUES
('jdoe', '123 Main St, Anytown, CA 12345'),
('bwhite', '789 Pine Rd, Anytown, CA 12345'),
('mjohnson', '101 Maple Dr, Someville, TX 78901'),
('emiller', '303 Oak Ave, Someville, TX 78901'),
('dwilliams', '404 Pine Rd, Anytown, CA 12345'),
('lgarcia', '505 Maple Dr, Someville, TX 78901'),
('klee', '606 Elm St, Anytown, CA 12345'),
('nmartin', '707 Oak Ave, Someville, TX 78901');

INSERT INTO `funside`.`order` (`dateorder`, `datedelivery`, `suspended`, `status`, `totalprice`, `user`) VALUES
('2024-01-15', '2024-01-18', 0, 'consegnato', 59.99, 'jdoe'),
('2024-03-15', '2024-03-18', 0, 'consegnato', 59.99, 'jdoe'),
('2024-03-10', '2024-03-12', 0, 'consegnato', 19.98, 'bwhite'),
('2024-01-20', NULL, 1, 'spedito', 34.99, 'bwhite'),
('2024-01-17', '2024-01-20', 0, 'consegnato', 9.99, 'mjohnson'),
('2024-01-12', '2024-01-15', 0, 'consegnato', 12.00, 'emiller'),
('2024-01-19', NULL, 0, 'ordinato', 54.99, 'emiller'),
('2024-01-08', '2024-01-11', 0, 'consegnato', 29.99, 'dwilliams'),
('2024-01-21', NULL, 0, 'spedito', 15.49, 'lgarcia'),
('2024-01-14', '2024-01-17', 0, 'consegnato', 39.99, 'klee'),
('2024-01-09', '2024-01-12', 0, 'consegnato', 49.99, 'nmartin'),
('2024-01-16', NULL, 0, 'in consegna', 14.99, 'jdoe'),
('2024-01-11', '2024-01-14', 0, 'consegnato', 59.99, 'klee'),
('2024-01-22', NULL, 0, 'ordinato', 34.99, 'bwhite'),
('2024-01-18', NULL, 0, 'spedito', 9.99, 'mjohnson'),
('2024-01-13', '2024-01-16', 0, 'consegnato', 12.00, 'mjhonson');

INSERT INTO `funside`.`orderdetail` (`product`, `order`, `quantity`, `total`) VALUES
(1, 1, 1, 29.99),
(2, 1, 2, 19.98),
(3, 2, 1, 15.49),
(4, 3, 1, 12.00),
(5, 4, 1, 34.99),
(6, 5, 1, 59.99),
(7, 6, 1, 39.99),
(8, 7, 1, 29.99),
(9, 8, 1, 39.99),
(10, 9, 1, 49.99),
(1, 10, 1, 29.99),
(2, 11, 1, 19.99),
(3, 12, 1, 15.49),
(4, 13, 1, 12.00),
(5, 14, 1, 34.99),
(6, 15, 1, 59.99),
(7, 1, 1, 39.99),
(8, 2, 1, 29.99),
(9, 3, 1, 39.99),
(10, 4, 1, 49.99),
(1, 5, 1, 29.99),
(2, 6, 1, 19.99),
(3, 7, 1, 15.49),
(4, 8, 1, 12.00),
(5, 9, 1, 34.99),
(6, 10, 1, 59.99),
(7, 11, 1, 39.99),
(8, 12, 1, 29.99),
(9, 13, 1, 39.99),
(10, 14, 1, 49.99),
(1, 15, 1, 29.99);



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

-- Inserimenti delle review in italiano
INSERT INTO `funside`.`review` (`product`, `user`, `rating`, `text`) VALUES
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
(24, 'bwhite', 4, 'I bambini lo adorano! Stimola la creatività in modo divertente.');



UPDATE funside.product 
SET avgrating = (
    SELECT AVG(rating) 
    FROM funside.review 
    WHERE funside.review.product = funside.product.idproduct
) 
WHERE idproduct IN (
    SELECT DISTINCT product FROM funside.review
);

INSERT INTO `funside`.`cartdetail` (product, user, quantity) VALUES
(1, 'bwhite', 1)