-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema funside
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `funside` DEFAULT CHARACTER SET utf8 ;
USE `funside` ;

-- -----------------------------------------------------
-- Table `funside`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funside`.`user` (
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(512) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `cognome` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL
  CHECK (`type` IN ('client', 'admin')),
  PRIMARY KEY (`username`)
)
ENGINE = InnoDB;