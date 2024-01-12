BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Reminder] DROP CONSTRAINT [Reminder_kpi_id_fkey];

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'KPI'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_KPI] (
    [id] INT NOT NULL,
    [time_limit] FLOAT(53) NOT NULL,
    [time_type] NVARCHAR(1000) NOT NULL,
    [status_code] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [KPI_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[KPI])
    EXEC('INSERT INTO [dbo].[_prisma_new_KPI] ([id],[status_code],[time_limit],[time_type]) SELECT [id],[status_code],[time_limit],[time_type] FROM [dbo].[KPI] WITH (holdlock tablockx)');
DROP TABLE [dbo].[KPI];
EXEC SP_RENAME N'dbo._prisma_new_KPI', N'KPI';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[Reminder] ADD CONSTRAINT [Reminder_kpi_id_fkey] FOREIGN KEY ([kpi_id]) REFERENCES [dbo].[KPI]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
