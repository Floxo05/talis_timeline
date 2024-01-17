-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `image_path` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Riddle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `question1` VARCHAR(191) NOT NULL,
    `question2` VARCHAR(191) NOT NULL,
    `question3` VARCHAR(191) NOT NULL,
    `question4` VARCHAR(191) NOT NULL,
    `correctAnswer` INTEGER NOT NULL,
    `image_path` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
