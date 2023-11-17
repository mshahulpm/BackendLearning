/*
  Warnings:

  - You are about to drop the column `next` on the `KPI` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[KPI] DROP CONSTRAINT [KPI_next_key];

-- AlterTable
ALTER TABLE [dbo].[KPI] DROP COLUMN [next];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
