/*
  Warnings:

  - You are about to drop the column `desc` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Kumite` table. All the data in the column will be lost.
  - Added the required column `gi` to the `Kumite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kumite" DROP COLUMN "desc",
DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "gi" TEXT NOT NULL;
