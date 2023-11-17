/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [Post_AuthorBy_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [Post_createdBy_fkey];

-- DropTable
DROP TABLE [dbo].[Author];

-- DropTable
DROP TABLE [dbo].[Post];

-- DropTable
DROP TABLE [dbo].[User];

-- CreateTable
CREATE TABLE [dbo].[KPI] (
    [id] INT NOT NULL IDENTITY(1,1),
    [next_action] NVARCHAR(1000) NOT NULL,
    [time_limit] INT NOT NULL,
    [status_code] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [KPI_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [KPI_next_action_key] UNIQUE NONCLUSTERED ([next_action])
);

-- CreateTable
CREATE TABLE [dbo].[Reminder] (
    [id] INT NOT NULL IDENTITY(1,1),
    [reminder_no] INT NOT NULL,
    [time_limit] INT NOT NULL,
    [kpi_id] INT NOT NULL,
    CONSTRAINT [Reminder_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ReminderMailto] (
    [id] INT NOT NULL IDENTITY(1,1),
    [mail_to] NVARCHAR(1000) NOT NULL,
    [reminder_id] INT NOT NULL,
    CONSTRAINT [ReminderMailto_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Reminder] ADD CONSTRAINT [Reminder_kpi_id_fkey] FOREIGN KEY ([kpi_id]) REFERENCES [dbo].[KPI]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ReminderMailto] ADD CONSTRAINT [ReminderMailto_reminder_id_fkey] FOREIGN KEY ([reminder_id]) REFERENCES [dbo].[Reminder]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
