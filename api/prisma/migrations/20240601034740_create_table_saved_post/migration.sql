/*
  Warnings:

  - You are about to drop the `PostDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostDetail" DROP CONSTRAINT "PostDetail_postId_fkey";

-- DropTable
DROP TABLE "PostDetail";

-- CreateTable
CREATE TABLE "post_details" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "utilities" TEXT,
    "pet" TEXT,
    "income" TEXT,
    "size" TEXT,
    "school" INTEGER,
    "bust" INTEGER,
    "restaurant" INTEGER,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "post_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_posts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "saved_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_details_postId_key" ON "post_details"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "saved_posts_userId_key" ON "saved_posts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "saved_posts_postId_key" ON "saved_posts"("postId");

-- AddForeignKey
ALTER TABLE "post_details" ADD CONSTRAINT "post_details_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_posts" ADD CONSTRAINT "saved_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_posts" ADD CONSTRAINT "saved_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
