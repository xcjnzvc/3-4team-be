/*
  Warnings:

  - You are about to drop the column `count` on the `StartUp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StartUp" DROP COLUMN "count",
ADD COLUMN     "compareCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "myCount" INTEGER NOT NULL DEFAULT 0;
