import * as vscode from 'vscode';
import { JMFFormatterProvider } from './providers/formatter';
import { JMFHoverProvider } from './providers/hover';
import { CompileCommand } from './commands/compile';

/**
 * Extension activation function - called when the extension is activated
 * @param context The extension context
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('JMFramework extension is now active!');

    // Register the formatter provider for JMF file types
    const formatterProvider = new JMFFormatterProvider();
    const jmfLanguages = ['jmf', 'jmcss', 'jmhtml', 'jmconfig', 'jmtemplate', 'jmmodule'];
    
    const formatterDisposable = vscode.languages.registerDocumentFormattingEditProvider(
        jmfLanguages,
        formatterProvider
    );

    // Register the compile command
    const compileCommand = new CompileCommand();
    const compileCommandDisposable = compileCommand.register();

    // Add hover provider for JMF files
    const hoverProvider = new JMFHoverProvider();
    const hoverDisposable = vscode.languages.registerHoverProvider(
        jmfLanguages,
        hoverProvider
    );

    // Add the disposables to context subscriptions
    context.subscriptions.push(formatterDisposable, compileCommandDisposable, hoverDisposable);
}

/**
 * Extension deactivation function - called when the extension is deactivated
 */
export function deactivate() {
    console.log('JMFramework extension is now deactivated!');
}

/**
 * Get description for a JMF keyword
 * @param keyword The JMF keyword
 * @returns A description of the keyword
 */
export function getKeywordDescription(keyword: string): string {
    const descriptions: Record<string, string> = {
        'component': 'defining reusable UI components',
        'property': 'declaring component properties with optional default values',
        'style': 'defining CSS styles for components',
        'render': 'specifying the HTML structure of components',
        'hover': 'defining styles for hover state',
        'variable': 'declaring reusable CSS variables',
        'mixin': 'creating reusable style blocks',
        'focus': 'defining styles for focus state',
        'active': 'defining styles for active state',
        'disabled': 'defining styles for disabled state',
        'import': 'importing components from other files',
        'export': 'exporting components for use in other files',
        'from': 'specifying the source for imports',
        'template': 'defining reusable templates',
        'module': 'defining a module with exported functionality',
        'config': 'configuring project settings'
    };
    
    return descriptions[keyword] || 'unknown purpose';
} 
