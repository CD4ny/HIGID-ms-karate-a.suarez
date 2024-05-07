/*
  Warnings:

  - Added the required column `sex` to the `Karateca` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Karateca" ADD COLUMN     "sex" TEXT NOT NULL;
