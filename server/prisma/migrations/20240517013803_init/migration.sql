BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [fullname] NVARCHAR(1000),
    [password] NVARCHAR(1000) NOT NULL,
    [accesstoken] NVARCHAR(1000),
    [refreshtoken] NVARCHAR(1000),
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Board] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [ownerID] INT NOT NULL,
    CONSTRAINT [Board_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Column] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [desc] NVARCHAR(1000) NOT NULL,
    [boardID] INT NOT NULL,
    CONSTRAINT [Column_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Card] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [desc] NVARCHAR(1000) NOT NULL,
    [columnID] INT NOT NULL,
    [boardID] INT NOT NULL,
    [duedate] DATETIME2 NOT NULL CONSTRAINT [Card_duedate_df] DEFAULT CURRENT_TIMESTAMP,
    [reminderdate] DATETIME2 NOT NULL CONSTRAINT [Card_reminderdate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Card_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Board] ADD CONSTRAINT [Board_ownerID_fkey] FOREIGN KEY ([ownerID]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Column] ADD CONSTRAINT [Column_boardID_fkey] FOREIGN KEY ([boardID]) REFERENCES [dbo].[Board]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Card] ADD CONSTRAINT [Card_columnID_fkey] FOREIGN KEY ([columnID]) REFERENCES [dbo].[Column]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Card] ADD CONSTRAINT [Card_boardID_fkey] FOREIGN KEY ([boardID]) REFERENCES [dbo].[Board]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
