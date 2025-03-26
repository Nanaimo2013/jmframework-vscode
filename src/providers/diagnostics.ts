import * as vscode from 'vscode';

/**
 * JMF Diagnostics Provider
 * Provides error checking and validation for JMF language files
 */
export class JMFDiagnosticsProvider {
    private diagnosticCollection: vscode.DiagnosticCollection;
    private static instance: JMFDiagnosticsProvider;

    private constructor() {
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('jmf');
    }

    public static getInstance(): JMFDiagnosticsProvider {
        if (!JMFDiagnosticsProvider.instance) {
            JMFDiagnosticsProvider.instance = new JMFDiagnosticsProvider();
        }
        return JMFDiagnosticsProvider.instance;
    }

    /**
     * Update diagnostics for a document
     * @param document The document to check
     */
    public updateDiagnostics(document: vscode.TextDocument): void {
        const diagnostics: vscode.Diagnostic[] = [];
        const text = document.getText();
        const fileExtension = document.fileName.split('.').pop()?.toLowerCase();

        switch (fileExtension) {
            case 'jmf':
                this.checkJMFDocument(document, text, diagnostics);
                break;
            case 'jmcss':
                this.checkJMCSSDocument(document, text, diagnostics);
                break;
            case 'jmhtml':
                this.checkJMHTMLDocument(document, text, diagnostics);
                break;
            case 'jmconfig':
            case 'jmc':
                this.checkJMConfigDocument(text, diagnostics);
                break;
            case 'jmtemplate':
            case 'jmt':
                this.checkJMTemplateDocument(document, text, diagnostics);
                break;
            case 'jmmodule':
            case 'jmm':
                this.checkJMModuleDocument(document, text, diagnostics);
                break;
        }

        this.diagnosticCollection.set(document.uri, diagnostics);
    }

    /**
     * Check JMF document for errors
     */
    private checkJMFDocument(document: vscode.TextDocument, text: string, diagnostics: vscode.Diagnostic[]): void {
        // Check for missing required sections
        const requiredSections = ['component', 'render'];
        for (const section of requiredSections) {
            if (!text.includes(section)) {
                const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(0, 0, 0, 0),
                    `Missing required section: ${section}`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }

        // Check for invalid property declarations
        const propertyRegex = /property\s+(\w+)\s*:/g;
        let match;
        while ((match = propertyRegex.exec(text)) !== null) {
            const propertyName = match[1];
            if (!/^[a-z][a-zA-Z0-9]*$/.test(propertyName)) {
                const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(
                        document.positionAt(match.index),
                        document.positionAt(match.index + match[0].length)
                    ),
                    'Property names must start with a lowercase letter and contain only letters and numbers',
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }

        // Check for unclosed blocks
        const blockRegex = /{/g;
        const closeBlockRegex = /}/g;
        const blockMatches = text.match(blockRegex) || [];
        const closeBlockMatches = text.match(closeBlockRegex) || [];
        
        if (blockMatches.length !== closeBlockMatches.length) {
            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 0),
                'Unclosed block detected',
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }
    }

    /**
     * Check JMCSS document for errors
     */
    private checkJMCSSDocument(document: vscode.TextDocument, text: string, diagnostics: vscode.Diagnostic[]): void {
        // Check for invalid variable declarations
        const variableRegex = /\$(\w+)\s*:/g;
        let match;
        while ((match = variableRegex.exec(text)) !== null) {
            const variableName = match[1];
            if (!/^[a-z][a-zA-Z0-9-]*$/.test(variableName)) {
                const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(
                        document.positionAt(match.index),
                        document.positionAt(match.index + match[0].length)
                    ),
                    'Variable names must start with a lowercase letter and contain only letters, numbers, and hyphens',
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }

        // Check for invalid color values
        const colorRegex = /#[0-9a-fA-F]{3,8}/g;
        while ((match = colorRegex.exec(text)) !== null) {
            const color = match[0];
            if (color.length !== 4 && color.length !== 7 && color.length !== 9) {
                const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(
                        document.positionAt(match.index),
                        document.positionAt(match.index + color.length)
                    ),
                    'Invalid color value. Must be 3, 6, or 8 hexadecimal digits',
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }
    }

    /**
     * Check JMHTML document for errors
     */
    private checkJMHTMLDocument(document: vscode.TextDocument, text: string, diagnostics: vscode.Diagnostic[]): void {
        // Check for unclosed tags
        const tagRegex = /<([^>]+)>/g;
        const stack: string[] = [];
        let match;
        
        while ((match = tagRegex.exec(text)) !== null) {
            const tag = match[1];
            if (!tag.startsWith('/')) {
                const tagName = tag.split(/\s+/)[0];
                if (!tagName.endsWith('/')) {
                    stack.push(tagName);
                }
            } else {
                const tagName = tag.substring(1).split(/\s+/)[0];
                if (stack.length === 0 || stack.pop() !== tagName) {
                    const diagnostic = new vscode.Diagnostic(
                        new vscode.Range(
                            document.positionAt(match.index),
                            document.positionAt(match.index + match[0].length)
                        ),
                        'Unmatched HTML tag',
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            }
        }

        if (stack.length > 0) {
            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 0),
                'Unclosed HTML tags detected',
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }
    }

    /**
     * Check JMConfig document for errors
     */
    private checkJMConfigDocument(text: string, diagnostics: vscode.Diagnostic[]): void {
        // Check for invalid JSON structure
        try {
            JSON.parse(text);
        } catch (error) {
            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 0),
                'Invalid JSON structure in config file',
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }

        // Check for required config sections
        const requiredSections = ['project', 'paths'];
        for (const section of requiredSections) {
            if (!text.includes(`"${section}"`)) {
                const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(0, 0, 0, 0),
                    `Missing required config section: ${section}`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }
    }

    /**
     * Check JMTemplate document for errors
     */
    private checkJMTemplateDocument(document: vscode.TextDocument, text: string, diagnostics: vscode.Diagnostic[]): void {
        // Check for unclosed template expressions
        const exprRegex = /{{[^}]*$/g;
        let match;
        while ((match = exprRegex.exec(text)) !== null) {
            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(
                    document.positionAt(match.index),
                    document.positionAt(match.index + match[0].length)
                ),
                'Unclosed template expression',
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }

        // Check for invalid parameter references
        const paramRegex = /{{param\.(\w+)}}/g;
        while ((match = paramRegex.exec(text)) !== null) {
            const paramName = match[1];
            if (!/^[a-z][a-zA-Z0-9]*$/.test(paramName)) {
                const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(
                        document.positionAt(match.index),
                        document.positionAt(match.index + match[0].length)
                    ),
                    'Invalid parameter name. Must start with a lowercase letter and contain only letters and numbers',
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }
    }

    /**
     * Check JMModule document for errors
     */
    private checkJMModuleDocument(document: vscode.TextDocument, text: string, diagnostics: vscode.Diagnostic[]): void {
        // Check for invalid exports
        const exportRegex = /export\s+(\w+)/g;
        let match;
        while ((match = exportRegex.exec(text)) !== null) {
            const exportName = match[1];
            if (!/^[A-Z][a-zA-Z0-9]*$/.test(exportName)) {
                const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(
                        document.positionAt(match.index),
                        document.positionAt(match.index + match[0].length)
                    ),
                    'Exported names must start with an uppercase letter and contain only letters and numbers',
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }

        // Check for circular dependencies
        const importRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g;
        const imports: string[] = [];
        while ((match = importRegex.exec(text)) !== null) {
            imports.push(match[1]);
        }

        if (imports.includes(document.fileName)) {
            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 0),
                'Circular dependency detected',
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }
    }
} 