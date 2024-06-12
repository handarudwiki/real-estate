/*
  Warnings:

  - The `size` column on the `post_details` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `bedroom` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bathroom` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "post_details" DROP COLUMN "size",
ADD COLUMN     "size" INTEGER;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "bedroom",
ADD COLUMN     "bedroom" INTEGER NOT NULL,
DROP COLUMN "bathroom",
ADD COLUMN     "bathroom" INTEGER NOT NULL;
