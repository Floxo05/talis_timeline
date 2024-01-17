/*
  Warnings:

  - Added the required column `answer_status` to the `Riddle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Riddle` ADD COLUMN `answer_status` VARCHAR(191) NOT NULL;
