import * as vscode from 'vscode';
import { FrameworkAdapter } from '../framework/adapter';

export class PackageCommand {
    private framework: FrameworkAdapter;

    constructor(framework: FrameworkAdapter) {
        this.framework = framework;
    }

    public register(): vscode.Disposable {
        return vscode.commands.registerCommand('jmframework.package', async (uri?: vscode.Uri) => {
            try {
                const editor = vscode.window.activeTextEditor;
                const filePath = uri?.fsPath || editor?.document.uri.fsPath;

                if (!filePath) {
                    throw new Error('No file selected');
                }

                // Use framework's package command
                await this.framework.packageProject(filePath);
                vscode.window.showInformationMessage('Project packaged successfully!');
            } catch (error) {
                vscode.window.showErrorMessage(`Package command failed: ${error}`);
            }
        });
    }
} 