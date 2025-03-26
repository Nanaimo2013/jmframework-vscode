# JMFramework Code Examples

This document contains detailed code examples and snippets for all JMFramework file types.

## 📚 Table of Contents
- [JMF Core (.jmf)](#jmf-core-jmf)
- [JMF CSS (.jmcss)](#jmf-css-jmcss)
- [JMF HTML (.jmhtml)](#jmf-html-jmhtml)
- [JMF Config (.jmconfig)](#jmf-config-jmconfig)
- [Project Structure](#project-structure)

## JMF Core (.jmf)

### Basic Component
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

### Advanced Component with Events
```jmf
component Card {
  property title = "";
  property content = "";
  property theme = "light";
  
  // Event handlers
  event onCardClick = () => {
    // Handle click event
  };
  
  style {
    background: theme === "light" ? white : #333;
    color: theme === "light" ? #333 : white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
  }
  
  render {
    <div j-on:click="${onCardClick}">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  }
}
```

## JMF CSS (.jmcss)

### Basic Styles
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

### Advanced Styles with Functions
```jmcss
// Variables
variable primary = #4285F4;
variable secondary = #34A853;
variable spacing = 16px;

// Functions
function darken(color, amount) {
  return adjust-color(color, lightness: -amount);
}

function lighten(color, amount) {
  return adjust-color(color, lightness: amount);
}

// Mixins
mixin card() {
  padding: ${spacing};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
}

// Usage
.card {
  @include card();
  background: ${primary};
  color: white;
  
  &.secondary {
    background: ${secondary};
  }
}
```

## JMF HTML (.jmhtml)

### Basic Template
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

### Advanced Template with Layout
```jmhtml
<Layout>
  <Header>
    <Nav>
      <NavItem j-for="${item in menuItems}" 
               text="${item.text}"
               j-on:click="${item.handler}" />
    </Nav>
    <UserProfile j-if="${isLoggedIn}" 
                 user="${currentUser}" />
  </Header>
  
  <Main>
    <Sidebar>
      <Menu>
        <MenuItem j-for="${item in sidebarItems}"
                  icon="${item.icon}"
                  text="${item.text}"
                  j-on:click="${item.handler}" />
      </Menu>
    </Sidebar>
    
    <Content>
      <slot name="content" />
    </Content>
  </Main>
  
  <Footer>
    <Copyright year="${currentYear}" />
    <SocialLinks links="${socialLinks}" />
  </Footer>
</Layout>
```

## JMF Config (.jmconfig)

### Basic Configuration
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

### Advanced Configuration
```jmconfig
config Project {
  name: "Enterprise JMF App";
  version: "2.0.0";
  description: "Enterprise-grade JMF application";
  
  // Environment configuration
  environments {
    development {
      apiUrl: "http://localhost:3000";
      debug: true;
    }
    production {
      apiUrl: "https://api.example.com";
      debug: false;
    }
  }
  
  // Build configuration
  build {
    minify: true;
    sourceMaps: true;
    optimizationLevel: 2;
    target: ["chrome", "firefox", "safari"];
  }
  
  // Plugin configuration
  plugins {
    plugin ImageOptimizer {
      quality: 85;
      formats: ["jpg", "png", "webp"];
      lazyLoad: true;
    }
    
    plugin Security {
      csp: true;
      xss: true;
      csrf: true;
    }
    
    plugin Analytics {
      provider: "google";
      trackingId: "${ANALYTICS_ID}";
    }
  }
  
  // Performance configuration
  performance {
    codeSplitting: true;
    lazyLoading: true;
    cacheStrategy: "stale-while-revalidate";
  }
}
```

## Project Structure

A typical JMFramework project structure:

```
my-jmf-project/
├── src/
│   ├── components/     # JMF components (.jmf)
│   │   ├── Button.jmf
│   │   ├── Card.jmf
│   │   └── Layout.jmf
│   ├── styles/         # CSS styles (.jmcss)
│   │   ├── main.jmcss
│   │   ├── variables.jmcss
│   │   └── mixins.jmcss
│   ├── templates/      # HTML templates (.jmhtml)
│   │   ├── layout.jmhtml
│   │   └── pages/
│   └── modules/        # Modules (.jmmodule)
│       ├── auth.jmmodule
│       └── api.jmmodule
├── assets/             # Static assets
│   ├── images/
│   └── fonts/
└── jmconfig.json       # Project configuration
```

For more information about JMFramework, visit our [documentation](https://github.com/Nanaimo2013/jmframework-vscode/wiki). 