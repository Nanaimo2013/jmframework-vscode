const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    extensionName: 'jmframework-vscode',
    publisher: 'JMFramework',
    testCommand: 'npm test',
    buildCommand: 'npm run compile',
    packageCommand: 'npm run package',
    versionScript: path.join(__dirname, 'update-version.js')
};

// Helper function to run commands
function runCommand(command, cwd = process.cwd()) {
    try {
        execSync(command, { stdio: 'inherit', cwd });
        return true;
    } catch (error) {
        console.error(`Error running command: ${command}`);
        console.error(error);
        return false;
    }
}

// Main release process
async function release() {
    console.log('🚀 Starting release process...\n');

    // 1. Get version type from command line
    const versionType = process.argv[2];
    if (!versionType || !['major', 'minor', 'patch'].includes(versionType)) {
        console.error('Please specify version type: major, minor, or patch');
        process.exit(1);
    }

    // 2. Update version
    console.log('📦 Updating version...');
    if (!runCommand(`node ${config.versionScript} ${versionType}`)) {
        process.exit(1);
    }

    // 3. Install dependencies
    console.log('\n📥 Installing dependencies...');
    if (!runCommand('npm install')) {
        process.exit(1);
    }

    // 4. Run tests
    console.log('\n🧪 Running tests...');
    if (!runCommand(config.testCommand)) {
        process.exit(1);
    }

    // 5. Build the extension
    console.log('\n🏗️ Building extension...');
    if (!runCommand(config.buildCommand)) {
        process.exit(1);
    }

    // 6. Package the extension
    console.log('\n📦 Packaging extension...');
    if (!runCommand(config.packageCommand)) {
        process.exit(1);
    }

    // 7. Get the version from package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const version = packageJson.version;

    // 8. Create release notes
    console.log('\n📝 Creating release notes...');
    const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
    const versionMatch = new RegExp(`## \\[${version}\\].*?(?=## \\[|$)`);
    const releaseNotes = changelog.match(versionMatch)[0];

    // 9. Output release information
    console.log('\n✨ Release completed successfully!');
    console.log('\nRelease Information:');
    console.log(`Version: ${version}`);
    console.log(`VSIX File: ${config.extensionName}-${version}.vsix`);
    console.log('\nRelease Notes:');
    console.log(releaseNotes);
    console.log('\nNext steps:');
    console.log('1. Review the changes in the CHANGELOG.md');
    console.log('2. Create a new release on GitHub');
    console.log('3. Upload the VSIX file to the release');
    console.log('4. Publish to VS Code Marketplace');
}

// Run the release process
release().catch(error => {
    console.error('Release failed:', error);
    process.exit(1);
}); 