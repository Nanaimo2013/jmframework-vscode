import * as vscode from 'vscode';
import { FrameworkAdapter } from '../framework/adapter';

/**
 * JMF Compile Command
 * Compiles a JMF file using the JMF compiler
 */
export class CompileCommand {
    private framework: FrameworkAdapter;

    /**
     * Constructor
     */
    constructor(framework: FrameworkAdapter) {
        this.framework = framework;
    }

    /**
     * Register the command with VS Code
     * @returns A disposable command
     */
    public register(): vscode.Disposable {
        return vscode.commands.registerCommand('jmframework.compile', async (uri?: vscode.Uri) => {
            try {
                const editor = vscode.window.activeTextEditor;
                const filePath = uri?.fsPath || editor?.document.uri.fsPath;

                if (!filePath) {
                    throw new Error('No file selected');
                }

                // Use framework's compiler
                await this.framework.compileFile(filePath, filePath);
                vscode.window.showInformationMessage('File compiled successfully!');
            } catch (error) {
                vscode.window.showErrorMessage(`Compilation failed: ${error}`);
            }
        });
    }
} 