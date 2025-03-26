# Quick Start Guide

Get up and running with JMFramework in minutes.

## Creating Your First Project

1. Create a new directory for your project:
```bash
mkdir my-jmf-project
cd my-jmf-project
```

2. Initialize a new JMF project:
```bash
npm init -y
npm install jmframework
```

3. Create the basic file structure:
```
my-jmf-project/
├── src/
│   ├── components/
│   │   └── App.jmf
│   ├── styles/
│   │   └── main.jmcss
│   └── templates/
│       └── index.jmhtml
├── config/
│   └── app.jmconfig
└── package.json
```

## Basic Component

Create `src/components/App.jmf`:
```jmf
component App {
    template: `
        <div class="app">
            <h1>Welcome to JMFramework!</h1>
            <p>This is your first component.</p>
        </div>
    `;
    
    styles: `
        .app {
            padding: 20px;
            text-align: center;
        }
        
        h1 {
            color: #333;
        }
    `;
}
```

## Styling

Create `src/styles/main.jmcss`:
```jmcss
/* Global styles */
:root {
    --primary-color: #007bff;
    --text-color: #333;
}

body {
    font-family: Arial, sans-serif;
    color: var(--text-color);
    margin: 0;
    padding: 0;
}
```

## Template

Create `src/templates/index.jmhtml`:
```jmhtml
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JMFramework App</title>
    <link rel="stylesheet" href="/styles/main.jmcss">
</head>
<body>
    <div id="app"></div>
    <script src="/app.js"></script>
</body>
</html>
```

## Configuration

Create `config/app.jmconfig`:
```jmconfig
{
    "name": "my-jmf-project",
    "version": "1.0.0",
    "entry": "src/components/App.jmf",
    "output": "dist",
    "devServer": {
        "port": 3000,
        "hot": true
    }
}
```

## Running Your Project

1. Add scripts to `package.json`:
```json
{
    "scripts": {
        "start": "jmf serve",
        "build": "jmf build",
        "test": "jmf test"
    }
}
```

2. Start the development server:
```bash
npm start
```

3. Open your browser to `http://localhost:3000`

## Common Commands

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run linter
- `npm run format` - Format code

## Next Steps

- [Basic Usage Guide](./basic-usage.md)
- [Features Documentation](../features/README.md)
- [Examples](../examples/README.md) 