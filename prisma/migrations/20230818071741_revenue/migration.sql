/*
  Warnings:

  - You are about to drop the column `userId` on the `parking_lots` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "parking_lots" DROP CONSTRAINT "parking_lots_userId_fkey";

-- AlterTable
ALTER TABLE "parking_lots" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "roles" TEXT[] DEFAULT ARRAY['user']::TEXT[];

-- CreateTable
CREATE TABLE "revenues" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parkingLotId" INTEGER NOT NULL,

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "revenues" ADD CONSTRAINT "revenues_parkingLotId_fkey" FOREIGN KEY ("parkingLotId") REFERENCES "parking_lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
