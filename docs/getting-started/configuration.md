# Configuration Guide

Learn how to configure the JMFramework VS Code extension to suit your needs.

## Extension Settings

The extension provides several settings that can be configured in VS Code:

### Language Features

```json
{
    "jmframework.enableHover": true,      // Enable hover information
    "jmframework.enableFormatting": true,  // Enable code formatting
    "jmframework.enableValidation": true   // Enable code validation
}
```

### Theme Settings

1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "Preferences: Color Theme"
3. Select "JMFramework Dark" or "JMFramework Light"

### Icon Theme

1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "File Icon Theme"
3. Select "JMFramework Icons"

## Language Settings

### JMF Files (.jmf)

```json
{
    "[jmf]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "JMFramework.jmframework-vscode"
    }
}
```

### JMF CSS Files (.jmcss)

```json
{
    "[jmcss]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "JMFramework.jmframework-vscode"
    }
}
```

### JMF HTML Files (.jmhtml)

```json
{
    "[jmhtml]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "JMFramework.jmframework-vscode"
    }
}
```

## Workspace Settings

Create a `.vscode/settings.json` file in your project root:

```json
{
    "files.associations": {
        "*.jmf": "jmf",
        "*.jmcss": "jmcss",
        "*.jmhtml": "jmhtml",
        "*.jmconfig": "jmconfig",
        "*.jmtemplate": "jmtemplate",
        "*.jmmodule": "jmmodule"
    },
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "JMFramework.jmframework-vscode",
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/Thumbs.db": true
    }
}
```

## Custom Snippets

Create custom snippets in `.vscode/jmf.code-snippets`:

```json
{
    "Custom Component": {
        "prefix": "jmf-custom",
        "body": [
            "component ${1:name} {",
            "    $0",
            "}"
        ],
        "description": "Create a custom component"
    }
}
```

## Troubleshooting

If you experience issues:

1. Check the [Output Panel](https://code.visualstudio.com/docs/getstarted/userinterface#_output-panel) for errors
2. Verify your VS Code version is compatible
3. Try reloading the window (`Ctrl+Shift+P` -> "Developer: Reload Window")
4. Check the [Troubleshooting Guide](../troubleshooting/README.md)

## Next Steps

- [Quick Start Guide](./quick-start.md)
- [Basic Usage Guide](./basic-usage.md)
- [Features Documentation](../features/README.md) 