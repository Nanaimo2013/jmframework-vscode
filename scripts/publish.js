require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// Create build directory if it doesn't exist
const buildDir = path.join(__dirname, '..', 'build');
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
}

if (!process.env.VSCODE_PUBLISHER_TOKEN) {
    console.error('Error: VSCODE_PUBLISHER_TOKEN is not set in .env file');
    process.exit(1);
}

try {
    // Run the publish command
    execSync(`vsce publish -p ${process.env.VSCODE_PUBLISHER_TOKEN}`, { stdio: 'inherit' });

    // Find the .vsix file
    const vsixFile = fs.readdirSync(__dirname, '..')
        .find(file => file.endsWith('.vsix'));

    if (vsixFile) {
        const sourcePath = path.join(__dirname, '..', vsixFile);
        const targetPath = path.join(buildDir, vsixFile);
        
        // Move the .vsix file to build directory
        fs.renameSync(sourcePath, targetPath);
        console.log(`Moved ${vsixFile} to build directory`);
    }

    // Clean up temporary files
    console.log('Cleaning up temporary files...');
    rimraf.sync(path.join(__dirname, '..', 'out'));
    rimraf.sync(path.join(__dirname, '..', 'tsconfig.tsbuildinfo'));
    console.log('Cleanup complete');

} catch (error) {
    console.error('Error publishing:', error);
    process.exit(1);
} 