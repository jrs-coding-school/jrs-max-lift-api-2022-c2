DROP SCHEMA IF EXISTS `max_lifts`;

CREATE SCHEMA `max_lifts`;

CREATE TABLE `max_lifts`.`users` (
    `id` INT AUTO_INCREMENT NOT NULL UNIQUE,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `height` INT NOT NULL, -- in.
    `weight` INT NOT NULL, -- lbs.
    `age` INT NOT NULL,
    `gender` VARCHAR(1) NOT NULL, -- m/f
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `max_lifts`.`exercises` (
    `id` INT AUTO_INCREMENT NOT NULL UNIQUE,
    `name` VARCHAR(30) NOT NULL UNIQUE,
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `max_lifts`.`one_rep_maximums` (
    `id` INT AUTO_INCREMENT NOT NULL UNIQUE,
    `user_id` INT NOT NULL,
    `exercise_id` INT NOT NULL,
    `max_weight` INT NOT NULL,
    `date` VARCHAR(11) NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`)
);


