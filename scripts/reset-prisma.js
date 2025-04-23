const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to the Prisma client directory
const prismaClientPath = path.join(__dirname, '../node_modules/.prisma/client');

console.log('Resetting Prisma client...');

try {
  // Check if the directory exists
  if (fs.existsSync(prismaClientPath)) {
    console.log('Removing existing Prisma client directory...');
    
    // Try to remove the directory
    try {
      fs.rmSync(prismaClientPath, { recursive: true, force: true });
      console.log('Successfully removed Prisma client directory');
    } catch (error) {
      console.error('Error removing Prisma client directory:', error.message);
      console.log('Trying alternative approach...');
      
      // Try to remove individual files
      const files = fs.readdirSync(prismaClientPath);
      for (const file of files) {
        try {
          fs.unlinkSync(path.join(prismaClientPath, file));
        } catch (err) {
          console.error(`Could not remove file ${file}:`, err.message);
        }
      }
    }
  } else {
    console.log('Prisma client directory does not exist, creating it...');
    fs.mkdirSync(prismaClientPath, { recursive: true });
  }
  
  // Run Prisma generate
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('Prisma client reset complete!');
} catch (error) {
  console.error('Error resetting Prisma client:', error.message);
  process.exit(1);
} 