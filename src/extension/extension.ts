import * as vscode from 'vscode';
import { CompileCommand } from '../commands/compile';
import { PreviewCommand } from '../commands/preview';
import { WatchCommand } from '../commands/watch';
import { PackageCommand } from '../commands/package';
import { JMFHoverProvider } from '../providers/hover';
import { JMFFormatterProvider } from '../providers/formatter';
import { FrameworkAdapter } from '../framework/adapter';
import { JMFDiagnosticsProvider } from '../providers/diagnostics';

const compiler = require('../compiler');

/**
 * Activate the extension
 * @param context The extension context
 */
export async function activate(context: vscode.ExtensionContext) {
    try {
        // Initialize framework adapter
        const framework = new FrameworkAdapter(context);
        await framework.initialize();

        // Initialize compiler
        compiler.initializeCompiler(context);

        // Register commands
        const commands = [
            new CompileCommand(framework),
            new PreviewCommand(framework),
            new WatchCommand(framework),
            new PackageCommand(framework)
        ];

        for (const command of commands) {
            context.subscriptions.push(command.register());
        }

        // Register providers
        context.subscriptions.push(
            vscode.languages.registerHoverProvider(
                ['jmf', 'jmcss', 'jmhtml', 'jmconfig', 'jmtemplate', 'jmmodule'],
                new JMFHoverProvider(framework)
            )
        );

        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(
                ['jmf', 'jmcss', 'jmhtml', 'jmconfig', 'jmtemplate', 'jmmodule'],
                new JMFFormatterProvider(framework)
            )
        );

        // Register debugger
        const debuggerProvider = vscode.debug.registerDebugConfigurationProvider('jmf', {
            provideDebugConfigurations(folder: vscode.WorkspaceFolder | undefined): vscode.DebugConfiguration[] {
                return [
                    {
                        type: 'chrome',
                        request: 'launch',
                        name: 'JMF: Debug',
                        url: 'http://localhost:3000',
                        webRoot: folder?.uri.fsPath,
                        sourceMaps: true,
                        sourceMapPathOverrides: {
                            'webpack:///src/*': '${webRoot}/src/*'
                        },
                        preLaunchTask: 'JMF: Build'
                    }
                ];
            }
        });

        context.subscriptions.push(debuggerProvider);

        // Show welcome message
        vscode.window.showInformationMessage(
            `JMFramework v${framework.getVersion()} is now active!`
        );

        // Initialize diagnostics provider
        const diagnosticsProvider = JMFDiagnosticsProvider.getInstance();

        // Register document change event handler
        const documentChangeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
            if (['jmf', 'jmcss', 'jmhtml', 'jmconfig', 'jmtemplate', 'jmmodule'].includes(event.document.fileName.split('.').pop()?.toLowerCase() || '')) {
                diagnosticsProvider.updateDiagnostics(event.document);
            }
        });

        // Register document open event handler
        const documentOpenDisposable = vscode.workspace.onDidOpenTextDocument(document => {
            if (['jmf', 'jmcss', 'jmhtml', 'jmconfig', 'jmtemplate', 'jmmodule'].includes(document.fileName.split('.').pop()?.toLowerCase() || '')) {
                diagnosticsProvider.updateDiagnostics(document);
            }
        });

        // Add the disposables to context subscriptions
        context.subscriptions.push(
            documentChangeDisposable,
            documentOpenDisposable
        );
    } catch (error) {
        vscode.window.showErrorMessage(
            `Failed to activate JMFramework: ${error}`
        );
    }
}

/**
 * Deactivate the extension
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
