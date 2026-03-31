-- CreateTable: product_generated_contents
CREATE TABLE IF NOT EXISTS `product_generated_contents` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `productTitle` VARCHAR(191) NULL,
    `language` VARCHAR(191) NULL,
    `tone` VARCHAR(191) NULL,
    `lengthOption` VARCHAR(191) NULL,
    `formatOption` VARCHAR(191) NULL,
    `contextKeywords` TEXT NULL,
    `aiModel` VARCHAR(191) NULL,
    `descriptionHtml` LONGTEXT NULL,
    `seoTitle` VARCHAR(191) NULL,
    `seoDescription` TEXT NULL,
    `appliedToProduct` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ProductGeneratedContent_shop_productId_key`
  ON `product_generated_contents`(`shop`, `productId`);

-- CreateIndex
CREATE INDEX `ProductGeneratedContent_shop_updatedAt_idx`
  ON `product_generated_contents`(`shop`, `updatedAt`);

-- CreateTable: page_generated_contents
CREATE TABLE IF NOT EXISTS `page_generated_contents` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `pageId` VARCHAR(191) NOT NULL,
    `pageTitle` VARCHAR(191) NULL,
    `pageType` VARCHAR(191) NULL,
    `language` VARCHAR(191) NULL,
    `tone` VARCHAR(191) NULL,
    `lengthOption` VARCHAR(191) NULL,
    `formatOption` VARCHAR(191) NULL,
    `contextKeywords` TEXT NULL,
    `aiModel` VARCHAR(191) NULL,
    `bodyHtml` LONGTEXT NULL,
    `seoTitle` VARCHAR(191) NULL,
    `seoDescription` TEXT NULL,
    `appliedToPage` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `PageGeneratedContent_shop_pageId_key`
  ON `page_generated_contents`(`shop`, `pageId`);

-- CreateIndex
CREATE INDEX `PageGeneratedContent_shop_updatedAt_idx`
  ON `page_generated_contents`(`shop`, `updatedAt`);

-- CreateTable: blog_article_generated_contents
CREATE TABLE IF NOT EXISTS `blog_article_generated_contents` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `articleId` VARCHAR(191) NOT NULL,
    `blogId` VARCHAR(191) NULL,
    `articleTitle` VARCHAR(191) NULL,
    `articleType` VARCHAR(191) NULL,
    `authorName` VARCHAR(191) NULL,
    `language` VARCHAR(191) NULL,
    `tone` VARCHAR(191) NULL,
    `lengthOption` VARCHAR(191) NULL,
    `formatOption` VARCHAR(191) NULL,
    `contextKeywords` TEXT NULL,
    `aiModel` VARCHAR(191) NULL,
    `bodyHtml` LONGTEXT NULL,
    `seoTitle` VARCHAR(191) NULL,
    `seoDescription` TEXT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `appliedToShopify` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `BlogArticleGeneratedContent_shop_articleId_key`
  ON `blog_article_generated_contents`(`shop`, `articleId`);

-- CreateIndex
CREATE INDEX `BlogArticleGeneratedContent_shop_updatedAt_idx`
  ON `blog_article_generated_contents`(`shop`, `updatedAt`);
