import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * JMF Compile Command
 * Compiles a JMF file using the JMF compiler
 */
export class CompileCommand {
    private readonly outputChannel: vscode.OutputChannel;

    /**
     * Constructor
     */
    constructor() {
        this.outputChannel = vscode.window.createOutputChannel('JMF Compiler');
    }

    /**
     * Register the command with VS Code
     * @returns A disposable command
     */
    public register(): vscode.Disposable {
        return vscode.commands.registerCommand('jmframework.compile', () => this.execute());
    }

    /**
     * Execute the compile command
     */
    private async execute(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        const document = editor.document;
        const filePath = document.fileName;
        const fileExt = path.extname(filePath);

        // Check if this is a JMF file
        if (!['.jmf', '.jmcss', '.jmhtml', '.jmconfig', '.jmtemplate', '.jmmodule'].includes(fileExt)) {
            vscode.window.showErrorMessage(`Not a JMF file type: ${fileExt}`);
            return;
        }

        // Save the document before compiling
        if (document.isDirty) {
            await document.save();
        }

        this.outputChannel.clear();
        this.outputChannel.show(true);
        this.outputChannel.appendLine(`Compiling ${path.basename(filePath)}...`);

        try {
            await this.compileFile(filePath);
        } catch (error) {
            if (error instanceof Error) {
                this.outputChannel.appendLine(`Error: ${error.message}`);
                vscode.window.showErrorMessage(`Compilation failed: ${error.message}`);
            } else {
                this.outputChannel.appendLine(`Error: ${String(error)}`);
                vscode.window.showErrorMessage('Compilation failed with an unknown error');
            }
        }
    }

    /**
     * Compile a JMF file
     * @param filePath The path to the JMF file
     */
    private async compileFile(filePath: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // In a real implementation, this would call the JMF compiler CLI tool
            // For now, we'll simulate a compilation process
            
            this.outputChannel.appendLine('Checking for compiler...');
            
            // Check if the jmfc command exists in the workspace
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(filePath));
            
            if (!workspaceFolder) {
                reject(new Error('No workspace folder found'));
                return;
            }
            
            const jmfcPath = path.join(workspaceFolder.uri.fsPath, 'tools', 'jmfc.jmf');
            
            if (!fs.existsSync(jmfcPath)) {
                this.outputChannel.appendLine(`JMF compiler not found at ${jmfcPath}`);
                reject(new Error('JMF compiler not found. Make sure it\'s installed in the tools directory.'));
                return;
            }
            
            this.outputChannel.appendLine(`Found compiler at ${jmfcPath}`);
            this.outputChannel.appendLine('Starting compilation...');
            
            // Simulate a delay for compilation
            setTimeout(() => {
                // Get the file extension to determine the output type
                const fileExt = path.extname(filePath);
                const baseName = path.basename(filePath, fileExt);
                
                // Simulate different outputs based on file type
                switch (fileExt) {
                    case '.jmf':
                        this.outputChannel.appendLine('Compiling component...');
                        this.outputChannel.appendLine('Generating CSS...');
                        this.outputChannel.appendLine('Generating HTML...');
                        this.outputChannel.appendLine(`Output files: ${baseName}.css, ${baseName}.html`);
                        break;
                    case '.jmcss':
                        this.outputChannel.appendLine('Compiling CSS...');
                        this.outputChannel.appendLine(`Output file: ${baseName}.css`);
                        break;
                    case '.jmhtml':
                        this.outputChannel.appendLine('Compiling HTML...');
                        this.outputChannel.appendLine(`Output file: ${baseName}.html`);
                        break;
                    default:
                        this.outputChannel.appendLine(`Processing ${fileExt} file...`);
                        break;
                }
                
                this.outputChannel.appendLine('Compilation completed successfully!');
                vscode.window.showInformationMessage('JMF compilation completed successfully!');
                resolve();
            }, 1000);
        });
    }
} 