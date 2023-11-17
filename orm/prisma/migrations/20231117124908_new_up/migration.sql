/*
  Warnings:

  - You are about to drop the column `next_action` on the `KPI` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[next]` on the table `KPI` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `next` to the `KPI` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_type` to the `KPI` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[KPI] DROP CONSTRAINT [KPI_next_action_key];

-- AlterTable
ALTER TABLE [dbo].[KPI] DROP COLUMN [next_action];
ALTER TABLE [dbo].[KPI] ADD [next] NVARCHAR(1000) NOT NULL,
[time_type] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[KPI] ADD CONSTRAINT [KPI_next_key] UNIQUE NONCLUSTERED ([next]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
