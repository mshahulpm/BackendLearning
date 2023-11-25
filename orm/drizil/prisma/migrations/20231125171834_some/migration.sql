-- CreateEnum
CREATE TYPE "popularity" AS ENUM ('unknown', 'known', 'popular');

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "popularity" "popularity" NOT NULL DEFAULT 'known';
