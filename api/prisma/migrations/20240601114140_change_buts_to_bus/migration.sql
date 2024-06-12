/*
  Warnings:

  - You are about to drop the column `bust` on the `post_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post_details" DROP COLUMN "bust",
ADD COLUMN     "bus" INTEGER;
