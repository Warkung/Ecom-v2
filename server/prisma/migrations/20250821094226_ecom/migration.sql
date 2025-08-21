/*
  Warnings:

  - You are about to drop the column `createAt` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `enable` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `productoncart` DROP FOREIGN KEY `ProductOnCart_productId_fkey`;

-- DropIndex
DROP INDEX `Product_categoryId_fkey` ON `product`;

-- DropIndex
DROP INDEX `ProductOnCart_productId_fkey` ON `productoncart`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `createAt`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `createAt`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `createAt`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `createAt`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `updateAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `categoryId` INTEGER NULL;

-- AlterTable
ALTER TABLE `productonorder` ADD COLUMN `count` INTEGER NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `enable`,
    ADD COLUMN `enabled` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnCart` ADD CONSTRAINT `ProductOnCart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
