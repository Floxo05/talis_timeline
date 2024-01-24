-- AlterTable
ALTER TABLE `Event`
    MODIFY `title` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Riddle`
    MODIFY `title` TEXT NOT NULL,
    MODIFY `question1` TEXT NOT NULL,
    MODIFY `question2` TEXT NOT NULL,
    MODIFY `question3` TEXT NOT NULL,
    MODIFY `question4` TEXT NOT NULL;
