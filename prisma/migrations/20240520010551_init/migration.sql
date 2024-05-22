/*
  Warnings:

  - You are about to drop the column `file` on the `Karateca` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Karateca" DROP COLUMN "file",
ADD COLUMN     "pic" TEXT;
