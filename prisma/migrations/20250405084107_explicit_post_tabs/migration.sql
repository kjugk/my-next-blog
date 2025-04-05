/*
  Warnings:

  - You are about to drop the `_PostTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostTags" DROP CONSTRAINT "_PostTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostTags" DROP CONSTRAINT "_PostTags_B_fkey";

-- DropTable
DROP TABLE "_PostTags";

-- CreateTable
CREATE TABLE "PostTags" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER,
    "tagId" INTEGER,

    CONSTRAINT "PostTags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PostTags_postId_tagId_idx" ON "PostTags"("postId", "tagId");

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
