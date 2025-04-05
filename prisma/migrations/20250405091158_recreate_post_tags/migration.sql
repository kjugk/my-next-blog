/*
  Warnings:

  - The primary key for the `PostTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostTags` table. All the data in the column will be lost.
  - Made the column `postId` on table `PostTags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tagId` on table `PostTags` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_tagId_fkey";

-- DropIndex
DROP INDEX "PostTags_postId_tagId_idx";

-- AlterTable
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_pkey",
DROP COLUMN "id",
ALTER COLUMN "postId" SET NOT NULL,
ALTER COLUMN "tagId" SET NOT NULL,
ADD CONSTRAINT "PostTags_pkey" PRIMARY KEY ("postId", "tagId");

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
