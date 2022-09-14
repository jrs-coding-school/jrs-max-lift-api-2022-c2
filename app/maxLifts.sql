DROP SCHEMA IF EXISTS `max_lifts`;

CREATE SCHEMA `max_lifts`;

CREATE TABLE `max_lifts`.`users` (
    `id`VARCHAR(45) NOT NULL UNIQUE,
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
    `user_id` VARCHAR(45) NOT NULL,
    `exercise_id` INT NOT NULL,
    `max_weight` INT NOT NULL,
    `date` VARCHAR(11) NOT NULL, -- YYYY-MM-DD

    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`)
);

INSERT INTO `max_lifts`.`users` 
    (`id`, `username`, `password`, `height`, `weight`, `age`, `gender`)
VALUES 
    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', "Eric", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 74, 225, 41, 'm'),
    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', "Jeremiah", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 69, 165, 27, 'm'),
    ('a66a7692-29ff-11ed-bd1e-c93bcd52340c', "Ford", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 68, 225, 32, 'm'),
    ('a66a76e2-29ff-11ed-bd1e-c93bcd52340c', "Chris", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 65, 225, 50, 'm'),
    ('a66a7732-29ff-11ed-bd1e-c93bcd52340c', "Will", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 70, 215, 24, 'm')
;

INSERT INTO `max_lifts`.`exercises` (`name`)
VALUES 
    ('Bench Press'),
    ('Incline Bench Press'),
    ('DB Press'),
    ('BB OH Press'),
    ('DB OH Press'),
    ('Seated DB OH Press'),
    ('Push Press'),
    ('Jerk'),
    ('Back Squat'),
    ('Front Squat'),
    ('Bulgarian Split Squat'),
    ('Deadlift'),
    ('Romanian Deadlift'),
    ('Power Clean'),
    ('Clean'),
    ('Power Snatch'),
    ('Snatch'),
    ('Pull-up'),
    ('Push-up')
;

INSERT INTO `max_lifts`.`one_rep_maximums`
    (`user_id`, `exercise_id`, `max_weight`, `date`)
VALUES
    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', 9, 305, '2020-10-05'),
    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', 9, 310, '2021-02-14'),
    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', 9, 315, '2021-09-09'),
    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', 9, 320, '2022-03-15'),

    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', 1, 265, '2021-07-26'),
    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', 1, 285, '2022-01-03'),
    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', 1, 295, '2022-06-05'),

    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', 14, 265, '2020-10-05'),
    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', 14, 285, '2020-10-06'),
    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', 14, 305, '2020-10-07'),


    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', 4, 115, '2020-07-03'),
    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', 4, 120, '2021-08-20'),
    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', 4, 125, '2021-11-22'),

    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', 1, 150, '2021-01-12'),
    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', 1, 165, '2021-08-21'),
    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', 1, 185, '2021-12-02'),

    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', 10, 155, '2021-08-22'),
    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', 10, 170, '2021-10-12'),
    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', 10, 205, '2022-01-16'),
    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', 10, 210, '2022-06-01'),


    ('a66a7692-29ff-11ed-bd1e-c93bcd52340c', 12, 405, '2021-06-17'),
    ('a66a7692-29ff-11ed-bd1e-c93bcd52340c', 12, 435, '2022-01-23'),
    ('a66a7692-29ff-11ed-bd1e-c93bcd52340c', 12, 455, '2022-08-07'),

    ('a66a7692-29ff-11ed-bd1e-c93bcd52340c', 17, 115, '2021-09-12'),
    ('a66a7692-29ff-11ed-bd1e-c93bcd52340c', 17, 130, '2022-02-13'),
    ('a66a7692-29ff-11ed-bd1e-c93bcd52340c', 17, 155, '2022-08-02'),


    ('a66a76e2-29ff-11ed-bd1e-c93bcd52340c', 9, 185, '2021-04-04'),
    ('a66a76e2-29ff-11ed-bd1e-c93bcd52340c', 9, 200, '2021-08-14'),
    ('a66a76e2-29ff-11ed-bd1e-c93bcd52340c', 9, 215, '2021-09-03'),
    ('a66a76e2-29ff-11ed-bd1e-c93bcd52340c', 9, 335, '2022-07-10'),

    ('a66a76e2-29ff-11ed-bd1e-c93bcd52340c', 13, 205, '2022-03-06'),
    ('a66a76e2-29ff-11ed-bd1e-c93bcd52340c', 13, 235, '2022-09-10'),


    ('a66a7732-29ff-11ed-bd1e-c93bcd52340c', 15, 180, '2021-09-28'),
    ('a66a7732-29ff-11ed-bd1e-c93bcd52340c', 15, 195, '2021-12-22'),
    ('a66a7732-29ff-11ed-bd1e-c93bcd52340c', 15, 215, '2022-04-20'),
    
    ('a66a7732-29ff-11ed-bd1e-c93bcd52340c', 2, 170, '2021-03-21'),
    ('a66a7732-29ff-11ed-bd1e-c93bcd52340c', 2, 180, '2021-10-18'),
    ('a66a7732-29ff-11ed-bd1e-c93bcd52340c', 2, 195, '2022-01-27'),
    ('a66a7732-29ff-11ed-bd1e-c93bcd52340c', 2, 205, '2022-05-22')
;
