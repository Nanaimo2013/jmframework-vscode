import * as vscode from 'vscode';
import { FrameworkAdapter } from '../framework/adapter';

/**
 * JMF Preview Command
 * Provides a live preview of JMF files
 */
export class PreviewCommand {
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
        return vscode.commands.registerCommand('jmframework.preview', async (uri?: vscode.Uri) => {
            try {
                const editor = vscode.window.activeTextEditor;
                const filePath = uri?.fsPath || editor?.document.uri.fsPath;

                if (!filePath) {
                    throw new Error('No file selected');
                }

                // Use framework's preview command
                await this.framework.previewFile(filePath);
                vscode.window.showInformationMessage('Preview started successfully!');
            } catch (error) {
                vscode.window.showErrorMessage(`Preview failed: ${error}`);
            }
        });
    }
} 