# Development Tools

This directory contains various development tools and scripts for managing the JMFramework VS Code extension.

## Available Tools

### Version Management

#### `update-version.js`
Updates the version number in `package.json` and `CHANGELOG.md`.

```bash
# Update patch version (0.3.1 -> 0.3.2)
node tools/update-version.js patch

# Update minor version (0.3.1 -> 0.4.0)
node tools/update-version.js minor

# Update major version (0.3.1 -> 1.0.0)
node tools/update-version.js major
```

#### `release.js`
Comprehensive release script that handles the entire release process:
1. Updates version numbers
2. Installs dependencies
3. Runs tests
4. Builds the extension
5. Packages the VSIX
6. Generates release notes

```bash
# Interactive release process
node tools/release.js patch|minor|major

# Or use npm scripts
npm run release:patch
npm run release:minor
npm run release:major
```

## Usage

### Local Development

1. Update version:
```bash
npm run update-version patch|minor|major
```

2. Create a release:
```bash
npm run release:patch|minor|major
```

### GitHub Actions

The tools are automatically used in GitHub Actions workflows:
- `test-and-package.yml`: Uses `update-version.js` for version management
- `release.yml`: Uses `release.js` for the release process

## Adding New Tools

When adding new tools:

1. Create the script in this directory
2. Add appropriate documentation here
3. Add npm scripts in `package.json` if needed
4. Update GitHub Actions workflows if necessary

## Best Practices

1. Always use semantic versioning
2. Keep tools focused and single-purpose
3. Include proper error handling
4. Add clear documentation
5. Test tools thoroughly before use 