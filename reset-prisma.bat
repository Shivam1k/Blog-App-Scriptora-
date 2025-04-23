@echo off
echo Resetting Prisma client...

REM Kill any processes that might be locking the files
taskkill /F /IM node.exe /T 2>nul

REM Wait a moment for processes to be killed
timeout /t 2 /nobreak >nul

REM Remove the Prisma client directory
if exist "node_modules\.prisma\client" (
  echo Removing existing Prisma client directory...
  rmdir /s /q "node_modules\.prisma\client"
)

REM Create the directory again
mkdir "node_modules\.prisma\client" 2>nul

REM Generate the Prisma client
echo Generating Prisma client...
npx prisma generate

echo Prisma client reset complete! 