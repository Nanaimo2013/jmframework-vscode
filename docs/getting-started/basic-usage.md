# Basic Usage Guide

Learn the fundamentals of using JMFramework with VS Code.

## File Types and Extensions

JMFramework supports several file types:

| Extension | Description | Example |
|-----------|-------------|---------|
| `.jmf` | Main component files | `App.jmf` |
| `.jmcss` | CSS style files | `styles.jmcss` |
| `.jmhtml` | HTML template files | `index.jmhtml` |
| `.jmconfig` | Configuration files | `app.jmconfig` |
| `.jmtemplate` | Template files | `layout.jmtemplate` |
| `.jmmodule` | Module files | `utils.jmmodule` |

## Syntax Highlighting

The extension provides syntax highlighting for all JMF file types:

### JMF Components
```jmf
component MyComponent {
    // Properties
    data: {
        count: 0
    };
    
    // Methods
    increment() {
        this.data.count++;
    };
    
    // Template
    template: `
        <div>
            Count: {{count}}
            <button @click="increment">+</button>
        </div>
    `;
}
```

### JMF CSS
```jmcss
/* Variables */
:root {
    --primary: #007bff;
    --secondary: #6c757d;
}

/* Component styles */
.component {
    padding: 1rem;
    border: 1px solid var(--primary);
    border-radius: 4px;
}
```

### JMF HTML
```jmhtml
<!DOCTYPE html>
<html>
<head>
    <title>{{title}}</title>
    <link rel="stylesheet" href="{{styles}}">
</head>
<body>
    <div id="app"></div>
    <script src="{{scripts}}"></script>
</body>
</html>
```

## Code Snippets

Use snippets to quickly create common patterns:

### Component Snippets
- `jmf-component` - Basic component
- `jmf-component-with-props` - Component with properties
- `jmf-component-with-methods` - Component with methods

### Template Snippets
- `jmf-template` - Basic template
- `jmf-template-with-layout` - Template with layout
- `jmf-template-with-scripts` - Template with scripts

### CSS Snippets
- `jmf-css` - Basic CSS
- `jmf-css-with-variables` - CSS with variables
- `jmf-css-with-media` - CSS with media queries

## IntelliSense

The extension provides intelligent code completion:

### Properties
```jmf
component MyComponent {
    data: {
        // Type hints for properties
        name: string;
        age: number;
        items: string[];
    };
}
```

### Methods
```jmf
component MyComponent {
    methods: {
        // Parameter hints
        handleClick(event: Event): void;
        updateData(data: any): Promise<void>;
    };
}
```

### Templates
```jmhtml
<div>
    <!-- Property completion -->
    {{user.name}}
    
    <!-- Method completion -->
    {{formatDate(date)}}
    
    <!-- Event completion -->
    <button @click="handleClick">
</div>
```

## Code Formatting

Format your code automatically:

1. Enable format on save:
```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "JMFramework.jmframework-vscode"
}
```

2. Format manually:
- Windows: `Shift + Alt + F`
- Mac: `Shift + Option + F`
- Linux: `Ctrl + Shift + I`

## Next Steps

- [Features Documentation](../features/README.md)
- [Examples](../examples/README.md)
- [Development Guide](../development/README.md) 