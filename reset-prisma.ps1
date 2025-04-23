Write-Host "Resetting Prisma client..." -ForegroundColor Green

# Kill any processes that might be locking the files
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# Wait a moment for processes to be killed
Start-Sleep -Seconds 2

# Remove the Prisma client directory
$prismaClientPath = "node_modules\.prisma\client"
if (Test-Path $prismaClientPath) {
    Write-Host "Removing existing Prisma client directory..." -ForegroundColor Yellow
    Remove-Item -Path $prismaClientPath -Recurse -Force
}

# Create the directory again
New-Item -Path $prismaClientPath -ItemType Directory -Force | Out-Null

# Generate the Prisma client
Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

Write-Host "Prisma client reset complete!" -ForegroundColor Green 