import * as vscode from 'vscode';

/**
 * JMF Hover Provider
 * Provides hover information for JMF language files
 */
export class JMFHoverProvider implements vscode.HoverProvider {
    /**
     * Provides hover information for a given position in a document
     * @param document The document in which the hover was invoked
     * @param position The position at which the hover was invoked
     * @param token A cancellation token
     * @returns A hover containing the hover information or null
     */
    public provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
        if (token.isCancellationRequested) {
            return null;
        }

        // Get the word at position
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return null;
        }
        
        const word = document.getText(wordRange);
        const fileExtension = document.fileName.split('.').pop()?.toLowerCase();
        
        // Get hover information based on file type
        switch (fileExtension) {
            case 'jmf':
                return this.getJMFHover(word);
            case 'jmcss':
                return this.getJMCSSHover(word);
            case 'jmhtml':
                return this.getJMHTMLHover(word);
            case 'jmconfig':
            case 'jmc':
                return this.getJMConfigHover(word);
            case 'jmtemplate':
            case 'jmt':
                return this.getJMTemplateHover(word);
            case 'jmmodule':
            case 'jmm':
                return this.getJMModuleHover(word);
            default:
                return null;
        }
    }

    /**
     * Get hover information for JMF files
     * @param word The word at the hover position
     * @returns A hover containing information or null
     */
    private getJMFHover(word: string): vscode.Hover | null {
        // Handle JMF specific keywords
        const jmfKeywords = [
            'component', 'property', 'style', 'render', 'hover', 
            'focus', 'active', 'disabled', 'import', 'from', 'export'
        ];
        
        if (jmfKeywords.includes(word)) {
            return new vscode.Hover(this.getKeywordMarkdown(word));
        }
        
        return null;
    }

    /**
     * Get hover information for JMCSS files
     * @param word The word at the hover position
     * @returns A hover containing information or null
     */
    private getJMCSSHover(word: string): vscode.Hover | null {
        // Handle JMCSS specific keywords
        const jmcssKeywords = [
            'variable', 'mixin', 'include', 'function', 'return', 
            'if', 'else', 'for', 'while', 'each', 'use'
        ];
        
        if (jmcssKeywords.includes(word)) {
            return new vscode.Hover(this.getKeywordMarkdown(word));
        }
        
        return null;
    }

    /**
     * Get hover information for JMHTML files
     * @param word The word at the hover position
     * @returns A hover containing information or null
     */
    private getJMHTMLHover(word: string): vscode.Hover | null {
        // Handle JMHTML specific directives
        if (word.startsWith('j-')) {
            return new vscode.Hover(this.getDirectiveMarkdown(word));
        }
        
        return null;
    }

    /**
     * Get hover information for JMConfig files
     * @param word The word at the hover position
     * @returns A hover containing information or null
     */
    private getJMConfigHover(word: string): vscode.Hover | null {
        // Handle JMConfig specific keywords
        const configKeywords = [
            'config', 'paths', 'build', 'plugins', 'plugin', 
            'settings', 'true', 'false', 'null'
        ];
        
        if (configKeywords.includes(word)) {
            return new vscode.Hover(this.getKeywordMarkdown(word));
        }
        
        return null;
    }

    /**
     * Get hover information for JMTemplate files
     * @param word The word at the hover position
     * @returns A hover containing information or null
     */
    private getJMTemplateHover(word: string): vscode.Hover | null {
        // Handle JMTemplate specific keywords
        const templateKeywords = [
            'template', 'param', 'slot', 'include', 'extend',
            'block', 'if', 'else', 'for', 'each'
        ];
        
        if (templateKeywords.includes(word)) {
            return new vscode.Hover(this.getKeywordMarkdown(word));
        }
        
        return null;
    }

    /**
     * Get hover information for JMModule files
     * @param word The word at the hover position
     * @returns A hover containing information or null
     */
    private getJMModuleHover(word: string): vscode.Hover | null {
        // Handle JMModule specific keywords
        const moduleKeywords = [
            'module', 'export', 'import', 'from', 'as', 'default',
            'class', 'interface', 'function', 'const', 'let', 'var',
            'public', 'private', 'protected', 'static', 'async', 'await'
        ];
        
        if (moduleKeywords.includes(word)) {
            return new vscode.Hover(this.getKeywordMarkdown(word));
        }
        
        return null;
    }

    /**
     * Get markdown formatted information for a keyword
     * @param keyword The keyword to get information for
     * @returns A markdown string with keyword information
     */
    private getKeywordMarkdown(keyword: string): vscode.MarkdownString {
        const md = new vscode.MarkdownString();
        md.isTrusted = true;

        const descriptions: Record<string, string> = {
            // JMF keywords
            'component': 'Define a reusable UI component with properties, styles, and rendering logic.',
            'property': 'Declare a component property that can be passed when using the component.',
            'style': 'Define CSS styles for a component.',
            'render': 'Specify the HTML structure to be rendered for a component.',
            'hover': 'Define styles to apply when a component is hovered.',
            'focus': 'Define styles to apply when a component has focus.',
            'active': 'Define styles to apply when a component is active.',
            'disabled': 'Define styles to apply when a component is disabled.',
            'import': 'Import components, functions, or values from other modules.',
            'from': 'Specify the source module for imports.',
            'export': 'Export components, functions, or values to be used in other modules.',
            
            // JMCSS keywords
            'variable': 'Define a reusable CSS variable that can be referenced using ${name}.',
            'mixin': 'Create a reusable block of CSS properties that can be included in selectors.',
            'include': 'Include a mixin in a CSS selector.',
            'function_css': 'Define a reusable function that returns a value in CSS.',
            'return': 'Return a value from a function.',
            'if': 'Conditional statement for conditional logic.',
            'else': 'Alternative branch for conditional logic.',
            'for': 'Loop construct for iterating over sequences.',
            'while': 'Loop construct that executes as long as a condition is true.',
            'each': 'Loop construct for iterating over collections.',
            'use': 'Import and use external CSS files or modules.',
            
            // JMConfig keywords
            'config': 'Define a configuration object for a JMF project.',
            'paths': 'Specify file paths for project resources.',
            'build': 'Configure build settings for the project.',
            'plugins': 'Define plugins to use in the project.',
            'plugin': 'Configure a specific plugin.',
            'settings': 'Define general project settings.',
            'true': 'Boolean true value.',
            'false': 'Boolean false value.',
            'null': 'Null value representing absence of a value.',
            
            // JMTemplate keywords
            'template': 'Define a reusable template with parameters and slots.',
            'param': 'Define a parameter for a template.',
            'slot': 'Define a slot in a template where content can be injected.',
            'extend': 'Extend another template as a base.',
            'block': 'Define a block of content that can be overridden in derived templates.',
            
            // JMModule keywords
            'module': 'Define a module with exported functionality.',
            'as': 'Rename an imported module or component.',
            'default': 'Define or import the default export of a module.',
            'class': 'Define a class with properties and methods.',
            'interface': 'Define a type interface that describes an object structure.',
            'function': 'Define a reusable function that can be called with arguments.',
            'const': 'Declare a constant value that cannot be reassigned.',
            'let': 'Declare a variable with block scope.',
            'var': 'Declare a variable with function scope.',
            'public': 'Access modifier that makes a class member accessible from outside the class.',
            'private': 'Access modifier that restricts access to class members from within the class.',
            'protected': 'Access modifier that makes a class member accessible from within the class and derived classes.',
            'static': 'Define a class member that belongs to the class rather than instances.',
            'async': 'Define an asynchronous function that returns a Promise.',
            'await': 'Wait for a Promise to resolve or reject.'
        };

        // Special case for 'function_css' keyword
        if (keyword === 'function') {
            const fileExtension = vscode.window.activeTextEditor?.document.fileName.split('.').pop()?.toLowerCase();
            if (fileExtension === 'jmcss') {
                const cssFunction = new vscode.MarkdownString();
                cssFunction.appendMarkdown(`**JMFramework Keyword: \`function\`**\n\nDefine a reusable function that returns a value in CSS.`);
                return cssFunction;
            }
        }

        const description = descriptions[keyword] || 'No description available.';
        
        md.appendMarkdown(`**JMFramework Keyword: \`${keyword}\`**\n\n${description}`);
        
        return md;
    }

    /**
     * Get markdown formatted information for a directive
     * @param directive The directive to get information for
     * @returns A markdown string with directive information
     */
    private getDirectiveMarkdown(directive: string): vscode.MarkdownString {
        const md = new vscode.MarkdownString();
        md.isTrusted = true;

        const descriptions: Record<string, string> = {
            'j-if': 'Conditionally render an element based on a boolean expression.',
            'j-for': 'Render an element multiple times based on a collection.',
            'j-bind': 'Bind a value to an element\'s property or attribute.',
            'j-on:click': 'Attach a click event handler to an element.',
            'j-on:input': 'Attach an input event handler to an element.',
            'j-on:change': 'Attach a change event handler to an element.',
            'j-on:submit': 'Attach a submit event handler to a form.',
            'j-model': 'Create a two-way binding on a form input element.',
            'j-slot': 'Define a named slot for content projection.',
            'j-ref': 'Register a reference to an element for direct access.'
        };

        // Get the description or generate one for unknown directives
        let description = descriptions[directive] || 'No description available.';
        
        // For event directives not in our list, generate a description
        if (directive.startsWith('j-on:') && !descriptions[directive]) {
            const event = directive.substring(5);
            description = `Attach an ${event} event handler to an element.`;
        }
        
        md.appendMarkdown(`**JMFramework Directive: \`${directive}\`**\n\n${description}`);
        
        return md;
    }
} 