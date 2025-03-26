# JMFramework VS Code Extension

[![Version](https://img.shields.io/visual-studio-marketplace/v/jmframework.jmframework)](https://marketplace.visualstudio.com/items?itemName=jmframework.jmframework)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/jmframework.jmframework)](https://marketplace.visualstudio.com/items?itemName=jmframework.jmframework)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/jmframework.jmframework)](https://marketplace.visualstudio.com/items?itemName=jmframework.jmframework)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Development Status](https://img.shields.io/badge/Status-In%20Development-orange)](https://github.com/Nanaimo2013/jmframework-vscode)

This extension provides syntax highlighting, snippets, and file icons for the JMFramework programming language.

## ⚠️ Development Status

**THIS EXTENSION IS IN EARLY DEVELOPMENT**

- Most features are currently in development and may not work as expected
- Breaking changes may occur between versions
- Please report any issues on our [GitHub repository](https://github.com/Nanaimo2013/jmframework-vscode/issues)
- We welcome contributions and feedback to improve the extension

## Features

### Syntax Highlighting

Syntax highlighting for all JMFramework file types:
- `.jmf` - Main JMFramework source files
- `.jmcss` - JMF CSS files
- `.jmhtml` - JMF HTML files
- `.jmconfig` - JMF configuration files
- `.jmtemplate` - JMF template files
- `.jmmodule` - JMF module files

### File Icons

Custom icons for all JMFramework file types in both light and dark themes:

| File Type | Description |
|-----------|-------------|
| `.jmf` | Main JMFramework file |
| `.jmcss` | JMF CSS style file |
| `.jmhtml` | JMF HTML template file |
| `.jmconfig` | JMF configuration file |
| `.jmtemplate` | JMF template file |
| `.jmmodule` | JMF module file |

### Folder Icons

Custom folder icons for organizing your JMFramework projects:

- JMF project folders
- Components folders
- Templates folders
- Styles folders
- Modules folders

### Document Templates

Each JMF language has its own document templates with the latest features and best practices:

- `jmf-document` - Template for JMF component files
- `jmcss-document` - Template for JMF CSS files
- `jmhtml-document` - Template for JMF HTML files
- `jmconfig-document` - Template for JMF configuration files
- `jmtemplate-document` - Template for JMF template files
- `jmmodule-document` - Template for JMF module files

### Language Features

- Syntax highlighting for JMF keywords, functions, and properties
- Support for template expressions in JMF files
- Tag matching in HTML templates
- Code folding
- Bracket matching
- Comment toggling
- Auto-indentation
- Hover information for keywords and directives

## Supported JMF Syntax

### JMF Core (.jmf)

```jmf
// Component declaration
component Button {
  // Properties with default values
  property color = #3366FF;
  property font-size = 16px;
  property padding = 12px 24px;
  property text = "Click me";

  // Style block defines the visual appearance
  style {
    background-color: dynamic(color);
    font-size: dynamic(font-size);
    padding: dynamic(padding);
    color: white;
    transition: background-color 0.3s ease;
  }

  // State-based styling
  hover {
    background-color: darken(dynamic(color), 10%);
  }

  // Render block defines the HTML structure
  render {
    <button>{text}</button>
  }
}
```

### JMF CSS (.jmcss)

```jmcss
// Variable declaration
variable primary-color = #4285F4;
variable font-size = 16px;

// Selector block
.container {
  max-width: 1200px;
  margin: 0 auto;
  font-size: ${font-size};
  
  // Nested selector
  .header {
    background-color: ${primary-color};
    padding: 1rem;
  }
}

// Mixin declaration
mixin centered() {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Using a mixin
.centered-element {
  @include centered();
  height: 100vh;
}
```

### JMF HTML (.jmhtml)

```jmhtml
<div class="container">
  <header class="header">
    <h1>${title}</h1>
    <p>${description}</p>
  </header>
  
  <main>
    <!-- JMF component usage -->
    <Button 
      text="Click Me" 
      color="#FF6347"
      j-on:click="${handleClick}"
    />
    
    <!-- Conditional rendering -->
    <div j-if="${showDetails}">
      Additional details here
    </div>
    
    <!-- List rendering -->
    <ul>
      <li j-for="${item in items}">
        ${item.name}
      </li>
    </ul>
  </main>
</div>
```

### JMF Config (.jmconfig)

```jmconfig
// Project configuration
config Project {
  name: "My JMF Project";
  version: "1.0.0";
  description: "A sample JMF project";
  
  // Paths configuration
  paths {
    source: "src";
    output: "dist";
    assets: "assets";
  }
  
  // Build configuration
  build {
    minify: true;
    sourceMaps: true;
    optimizationLevel: 2;
  }
  
  // Plugin configuration
  plugins {
    plugin ImageOptimizer {
      quality: 85;
      formats: ["jpg", "png", "webp"];
    }
  }
}
```

## Installation

You can install this extension in several ways:

1. **From VS Code Marketplace:**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "JMFramework"
   - Click "Install"

2. **From VSIX file:**
   - Download the `.vsix` file from the [releases page](https://github.com/Nanaimo2013/jmframework-vscode/releases)
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Click the "..." menu and select "Install from VSIX..."
   - Select the downloaded file

## Version Control

When working on the JMFramework extension, follow these practices:

1. **Use Semantic Versioning**: vX.Y.Z where:
   - X: Major version (breaking changes)
   - Y: Minor version (new features, backwards compatible)
   - Z: Patch version (bug fixes, backwards compatible)

2. **Branch Strategy**:
   - `main`: Production-ready code
   - `develop`: Integration branch for features
   - `feature/feature-name`: Branch for specific features
   - `bugfix/bug-name`: Branch for bug fixes

3. **Commit Messages**:
   - Use descriptive commit messages
   - Begin with a verb in present tense: "Add", "Fix", "Update", etc.
   - Reference issue numbers when applicable

4. **Pull Requests**:
   - Create PR for merging feature branches to develop
   - Include detailed description of changes
   - Reference related issues

5. **Release Process**:
   - Create a release branch from develop: `release/vX.Y.Z`
   - Update version number in `package.json`
   - Update CHANGELOG.md
   - Test thoroughly before merging to main
   - Tag releases on GitHub

## Testing Locally

To test the extension in your local environment:

1. Clone the repository:
   ```
   git clone https://github.com/Nanaimo2013/jmframework-vscode.git
   cd jmframework-vscode
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile the extension:
   ```
   npm run compile
   ```

4. Package the extension:
   ```
   npm run package
   ```

5. Install the extension from the generated `.vsix` file:
   - In VS Code, go to Extensions (Ctrl+Shift+X)
   - Click the "..." menu and select "Install from VSIX..."
   - Select the `.vsix` file from the root directory

## Creating a Test JMFramework Project

To test your extension with a JMFramework project:

1. Create a new folder outside your extension workspace:
   ```
   mkdir my-jmf-project
   cd my-jmf-project
   ```

2. Create a basic project structure:
   ```
   mkdir -p src/components src/styles src/templates src/modules
   ```

3. Create test files:
   - `src/components/Button.jmf` - A button component
   - `src/styles/main.jmcss` - Main CSS styles
   - `src/templates/page.jmhtml` - HTML template
   - `jmconfig.json` - Project configuration

4. Open this folder in a new VS Code window with your extension installed to see the highlighting and icons in action.

## Publishing the Extension

### To VS Code Marketplace

1. Get a Personal Access Token from Azure DevOps
2. Install vsce:
   ```
   npm install -g vsce
   ```
3. Login:
   ```
   vsce login [publisher name]
   ```
4. Publish:
   ```
   vsce publish
   ```

## Requirements

- Visual Studio Code 1.60.0 or higher

## Extension Settings

This extension contributes the following settings:

* `jmframework.format.enable`: Enable/disable formatting for JMF files
* `jmframework.validate.enable`: Enable/disable validation for JMF files
* `jmframework.icons.enable`: Enable/disable file icons for JMF files

## Basic Usage

### Getting Started with JMFramework

1. **Create a new file** with one of the JMF extensions (`.jmf`, `.jmcss`, `.jmhtml`, etc.)
2. **Use snippets** by typing a prefix and pressing <kbd>Tab</kbd>:
   - `jmf-document` - Creates a basic JMF component
   - `jmcss-document` - Creates a JMF CSS file
   - `jmhtml-document` - Creates a JMF HTML template

### Key Commands

| Command | Description |
|---------|-------------|
| `Ctrl+Space` | Trigger suggestions |
| `Alt+Shift+F` | Format document (when formatting is enabled) |
| `F1` → `JMF: Compile` | Compile JMF files (in development) |

### Project Structure

We recommend organizing your JMFramework projects as follows:

```
my-jmf-project/
├── src/
│   ├── components/     # JMF components (.jmf)
│   ├── styles/         # CSS styles (.jmcss)
│   ├── templates/      # HTML templates (.jmhtml)
│   └── modules/        # Modules (.jmmodule)
├── assets/             # Static assets
└── jmconfig.json       # Project configuration
```

## Known Issues

- Syntax highlighting may be incomplete for complex expressions
- The compiler functionality is still in development
- Some icon themes may conflict with JMF icons

## Contributing

If you want to contribute to this extension, please check out the [GitHub repository](https://github.com/Nanaimo2013/jmframework-vscode).

## Release Notes

### 0.2.0

- Added modern file and folder icons 
- Added document templates for all JMF file types
- Updated hover provider with comprehensive keyword descriptions
- Fixed various syntax highlighting issues
- Improved iconography for light and dark themes
- Enhanced snippet support for all language features
- Added version control guidance

### 0.1.0

Initial release with syntax highlighting and file icons for JMFramework files.

## License

This extension is licensed under the [MIT License](LICENSE). 