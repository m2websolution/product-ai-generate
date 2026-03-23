-- AlterTable: Add extra fields to shop table
ALTER TABLE `shop`
    ADD COLUMN IF NOT EXISTS `status`        VARCHAR(32)  NULL DEFAULT 'installed',
    ADD COLUMN IF NOT EXISTS `ownerName`     VARCHAR(255) NULL,
    ADD COLUMN IF NOT EXISTS `email`         VARCHAR(320) NULL,
    ADD COLUMN IF NOT EXISTS `contactEmail`  VARCHAR(320) NULL,
    ADD COLUMN IF NOT EXISTS `name`          VARCHAR(255) NULL,
    ADD COLUMN IF NOT EXISTS `country`       VARCHAR(100) NULL,
    ADD COLUMN IF NOT EXISTS `city`          VARCHAR(100) NULL,
    ADD COLUMN IF NOT EXISTS `currency`      VARCHAR(10)  NULL,
    ADD COLUMN IF NOT EXISTS `phone`         VARCHAR(50)  NULL,
    ADD COLUMN IF NOT EXISTS `primaryDomain` VARCHAR(255) NULL;
