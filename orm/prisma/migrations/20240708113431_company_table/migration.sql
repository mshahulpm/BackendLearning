BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Company] (
    [CompanyID] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [Company_CompanyID_df] DEFAULT newid(),
    [CompanyCodeNo] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK__Company__2D971C4C35F5B1B4] PRIMARY KEY CLUSTERED ([CompanyID])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
