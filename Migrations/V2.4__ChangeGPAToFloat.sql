ALTER TABLE Users
DROP COLUMN GPA;
GO

ALTER TABLE Users
ADD GPA Float NULL;
