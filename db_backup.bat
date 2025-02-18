@echo off
:: Define backup directory
set BACKUP_DIR=%~dp0db_backups

:: Create directory if it doesn't exist
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

:: Get date in YYYY-MM-DD format
for /f "tokens=1 delims=." %%a in ('wmic os get localdatetime ^| find "."') do set mydate=%%a
set mydate=%mydate:~0,4%-%mydate:~4,2%-%mydate:~6,2%

:: Debugging step
echo Date: %mydate%

:: Define the backup file path
set BACKUP_FILE=%BACKUP_DIR%\BackupDB_%mydate%.bck

:: Set PostgreSQL password (ensure it's correct)
SET "PGPASSWORD=password"

:: Run pg_dump (adjust the path if necessary)
"C:\Program Files\PostgreSQL\17\bin\pg_dump.exe" -h localhost -p 5432 -U postgres -F c -b -v -f "%BACKUP_FILE%" postgres

:: Notify user
echo Backup completed: %BACKUP_FILE%
pause
