# JMFramework Icons

This directory contains SVG icons for the JMFramework VS Code extension.

## Directory Structure

```
icons/
├── files/           # File icons
│   ├── jmf/        # JMF-specific file icons
│   └── common/     # Common file type icons
├── folders/        # Folder icons
│   ├── jmf/        # JMF-specific folder icons
│   └── common/     # Common folder icons
└── themes/         # Theme-specific icons
    ├── light/      # Light theme icons
    └── dark/       # Dark theme icons
```

## Naming Conventions

### File Icons
- `file_[type].svg` - Regular file icon
- `file_[type]_active.svg` - Active/selected state
- `file_[type]_modified.svg` - Modified state

### Folder Icons
- `folder_[type].svg` - Regular folder icon
- `folder_[type]_open.svg` - Open state
- `folder_[type]_active.svg` - Active/selected state
- `folder_[type]_modified.svg` - Modified state

## Icon Specifications

- Size: 16x16 pixels
- Format: SVG
- Stroke width: 1.5px
- Colors: Theme variables
- Viewport: 0 0 16 16

## Theme Variables

```css
--vscode-icon-foreground: #424242;        /* Light theme */
--vscode-icon-foreground: #C5C5C5;        /* Dark theme */
--vscode-icon-foreground-active: #007ACC; /* Active state */
--vscode-icon-foreground-modified: #E5C07B; /* Modified state */
```

## Adding New Icons

1. Create SVG file in appropriate directory
2. Follow naming conventions
3. Use theme variables for colors
4. Test in both light and dark themes
5. Update icon theme configuration 