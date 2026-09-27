/*
  Warnings:

  - You are about to drop the column `growthStage` on the `Crop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Crop" DROP COLUMN "growthStage",
ADD COLUMN     "actualGrowthStage" "GrowthStage" NOT NULL DEFAULT 'PLANTED',
ADD COLUMN     "expectedGrowthStage" "GrowthStage" NOT NULL DEFAULT 'PLANTED';
