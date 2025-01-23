-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema funside
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `funside`;
CREATE SCHEMA IF NOT EXISTS `funside` DEFAULT CHARACTER SET utf8 ;
USE `funside` ;

-- -----------------------------------------------------
-- Table `funside`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funside`.`user` (
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(512) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL
  CHECK (`type` IN ('client', 'admin')),
  PRIMARY KEY (`username`),
  UNIQUE (`name`, `surname`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `funside`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funside`.`address` (
  `user` VARCHAR(50) NOT NULL,
  `add` VARCHAR(512) NOT NULL,
  PRIMARY KEY (`user`, `add`),
  FOREIGN KEY (`user`)
    REFERENCES `funside`.`user` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `funside`.`producttype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funside`.`producttype` (
  `type` VARCHAR(50) NOT NULL,
  `description` VARCHAR(512) NOT NULL,
  `image` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`type`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `funside`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funside`.`product` (
  `idproduct` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `price` DECIMAL(9,2) NOT NULL,
  `description` VARCHAR(512) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `avgrating` DECIMAL(1,1) DEFAULT NULL,
  `minnumplayers` SMALLINT,
  `maxnumplayers` SMALLINT,
  `numpages` INT,
  `type` VARCHAR(50) NOT NULL,
  `image` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idproduct`),
  FOREIGN KEY (`type`)
    REFERENCES `funside`.`producttype` (`type`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `funside`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funside`.`order` (
  `idorder` INT NOT NULL AUTO_INCREMENT,
  `dateorder` DATE NOT NULL,
  `datedelivery` DATE DEFAULT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'ordinato'
  CHECK (`status` IN ('ordinato', 'spedito', 'in consegna', 'consegnato', 'sospeso', 'cancellato')),
  `totalprice` DECIMAL(9,2) NOT NULL,
  `user` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idorder`),
  FOREIGN KEY (`user`)
    REFERENCES `funside`.`user` (`username`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `funside`.`orderdetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funside`.`orderdetail` (
  `product` INT NOT NULL,
  `order` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`product`, `order`),
  FOREIGN KEY (`product`)
  REFERENCES `funside`.`product` (`idproduct`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  FOREIGN KEY (`order`)
    REFERENCES `funside`.`order` (`idorder`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `funside`.`cartdetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funside`.`cartdetail` (
  `product` INT NOT NULL,
  `user` VARCHAR(50) NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`product`, `user`),
  FOREIGN KEY (`product`)
    REFERENCES `funside`.`product` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  FOREIGN KEY (`user`)
    REFERENCES `funside`.`user` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `funside`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funside`.`notification` (
  `idnotification` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(512) NOT NULL,
  `isRead` BOOLEAN NOT NULL DEFAULT FALSE,
  `order` INT DEFAULT NULL,
  `user` VARCHAR(50) NOT NULL,
  `date` DATE NOT NULL DEFAULT CURRENT_DATE,
  `time` TIME NOT NULL DEFAULT CURRENT_TIME,
   PRIMARY KEY (`idnotification`),
  FOREIGN KEY (`order`)
    REFERENCES `funside`.`order` (`idorder`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  FOREIGN KEY (`user`)
    REFERENCES `funside`.`user` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `funside`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funside`.`review` (
  `product` INT NOT NULL,
  `user` VARCHAR(50) NOT NULL,
  `rating` VARCHAR(50) NOT NULL,
  `text` VARCHAR(512) NOT NULL,
  FOREIGN KEY (`product`)
    REFERENCES `funside`.`product` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  FOREIGN KEY (`user`)
    REFERENCES `funside`.`user` (`username`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;