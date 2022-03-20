-- MySQL Workbench Synchronization
-- Generated: 2019-09-22 15:16
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: emerson
SET
  @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS,
  UNIQUE_CHECKS = 0;
SET
  @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
  FOREIGN_KEY_CHECKS = 0;
SET
  @OLD_SQL_MODE = @@SQL_MODE,
  SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE TABLE IF NOT EXISTS `sistema`.`users` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NULL DEFAULT NULL,
    `updated_at` DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `email_UNIQUE` (`email` ASC)
  ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS `sistema`.`clients` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `birthday` VARCHAR(10) NULL DEFAULT NULL,
    `cpf` VARCHAR(14) NULL DEFAULT NULL,
    `rg` VARCHAR(12) NULL DEFAULT NULL,
    `phone` VARCHAR(14) NULL DEFAULT NULL,
    `created_at` DATETIME NULL DEFAULT NULL,
    `updated_at` DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS `sistema`.`address` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL,
    `number` VARCHAR(5) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `clients_id` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_address_clients1_idx` (`clients_id` ASC),
    CONSTRAINT `fk_address_clients1` FOREIGN KEY (`clients_id`) REFERENCES `sistema`.`clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

INSERT INTO `users`(`id`, `email`, `name`, `password`, `created_at`, `updated_at`) VALUES (1,'admin@sistema.com.br','Administrador','e10adc3949ba59abbe56e057f20f883e',null,null);

SET
  SQL_MODE = @OLD_SQL_MODE;
SET
  FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET
  UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;