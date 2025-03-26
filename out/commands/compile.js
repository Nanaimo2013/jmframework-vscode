"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompileCommand = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/**
 * JMF Compile Command
 * Compiles a JMF file using the JMF compiler
 */
class CompileCommand {
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
    register() {
        return vscode.commands.registerCommand('jmframework.compile', () => this.execute());
    }
    /**
     * Execute the compile command
     */
    async execute() {
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
        }
        catch (error) {
            if (error instanceof Error) {
                this.outputChannel.appendLine(`Error: ${error.message}`);
                vscode.window.showErrorMessage(`Compilation failed: ${error.message}`);
            }
            else {
                this.outputChannel.appendLine(`Error: ${String(error)}`);
                vscode.window.showErrorMessage('Compilation failed with an unknown error');
            }
        }
    }
    /**
     * Compile a JMF file
     * @param filePath The path to the JMF file
     */
    async compileFile(filePath) {
        return new Promise((resolve, reject) => {
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
exports.CompileCommand = CompileCommand;
//# sourceMappingURL=compile.js.map