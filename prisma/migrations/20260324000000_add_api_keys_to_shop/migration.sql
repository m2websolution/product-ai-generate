-- AlterTable: Add AI API key fields to shop table
ALTER TABLE `shop`
    ADD COLUMN IF NOT EXISTS `openaiApiKey`    VARCHAR(255) NULL,
    ADD COLUMN IF NOT EXISTS `anthropicApiKey` VARCHAR(255) NULL;
