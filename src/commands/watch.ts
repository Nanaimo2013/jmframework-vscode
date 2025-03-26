import * as vscode from 'vscode';
import { FrameworkAdapter } from '../framework/adapter';

export class WatchCommand {
    private framework: FrameworkAdapter;

    constructor(framework: FrameworkAdapter) {
        this.framework = framework;
    }

    public register(): vscode.Disposable {
        return vscode.commands.registerCommand('jmframework.watch', async (uri?: vscode.Uri) => {
            try {
                const editor = vscode.window.activeTextEditor;
                const filePath = uri?.fsPath || editor?.document.uri.fsPath;

                if (!filePath) {
                    throw new Error('No file selected');
                }

                // Start watching the file
                const watcher = vscode.workspace.createFileSystemWatcher(filePath);
                watcher.onDidChange(async () => {
                    try {
                        await this.framework.compileFile(filePath, filePath);
                        vscode.window.showInformationMessage('File recompiled successfully!');
                    } catch (error) {
                        vscode.window.showErrorMessage(`Recompilation failed: ${error}`);
                    }
                });

                vscode.window.showInformationMessage('Watching file for changes...');
            } catch (error) {
                vscode.window.showErrorMessage(`Watch command failed: ${error}`);
            }
        });
    }
} 