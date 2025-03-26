const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const versionType = args[0]; // 'major', 'minor', or 'patch'

if (!versionType || !['major', 'minor', 'patch'].includes(versionType)) {
    console.error('Please specify version type: major, minor, or patch');
    process.exit(1);
}

// Read package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Read CHANGELOG.md
const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
const changelog = fs.readFileSync(changelogPath, 'utf8');

// Update version in package.json
const currentVersion = packageJson.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

let newVersion;
switch (versionType) {
    case 'major':
        newVersion = `${major + 1}.0.0`;
        break;
    case 'minor':
        newVersion = `${major}.${minor + 1}.0`;
        break;
    case 'patch':
        newVersion = `${major}.${minor}.${patch + 1}`;
        break;
}

packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Update CHANGELOG.md
const today = new Date().toISOString().split('T')[0];
const newChangelog = changelog.replace(
    '## [Unreleased]',
    `## [${newVersion}] - ${today}\n\n### Added\n- None\n\n### Changed\n- None\n\n### Deprecated\n- None\n\n### Removed\n- None\n\n### Fixed\n- None\n\n### Security\n- None\n\n## [Unreleased]`
);

// Update version links at the bottom
const versionLinks = changelog.match(/\[.*?\]/g) || [];
const newVersionLinks = versionLinks.map(link => {
    if (link === '[Unreleased]') return link;
    const version = link.slice(1, -1);
    return `[${version}]: https://github.com/Nanaimo2013/jmframework-vscode/compare/v${version}...v${newVersion}`;
}).join('\n');

const finalChangelog = newChangelog.replace(
    /\[.*?\]/g,
    match => {
        if (match === '[Unreleased]') return match;
        return newVersionLinks;
    }
);

fs.writeFileSync(changelogPath, finalChangelog);

console.log(`Version updated to ${newVersion}`);
console.log('Files updated:');
console.log('- package.json');
console.log('- CHANGELOG.md'); 