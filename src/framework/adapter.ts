import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

/**
 * Framework Adapter
 * Handles communication between VS Code extension and JMF framework
 */
export class FrameworkAdapter {
    private frameworkPath: string;
    private frameworkVersion: string;
    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        // Get framework path from settings or use default
        const config = vscode.workspace.getConfiguration('jmframework');
        this.frameworkPath = config.get<string>('frameworkPath') || '';
        this.frameworkVersion = config.get<string>('frameworkVersion') || 'latest';
    }

    /**
     * Initialize the framework adapter
     */
    public async initialize(): Promise<void> {
        if (!this.frameworkPath) {
            // Try to find framework in workspace
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                const possiblePaths = [
                    path.join(workspaceFolders[0].uri.fsPath, 'node_modules', 'jmframework'),
                    path.join(workspaceFolders[0].uri.fsPath, 'jmframework')
                ];

                for (const path of possiblePaths) {
                    if (fs.existsSync(path)) {
                        this.frameworkPath = path;
                        break;
                    }
                }
            }

            if (!this.frameworkPath) {
                throw new Error('JMF framework not found. Please install it or set the framework path in settings.');
            }
        }

        // Verify framework exists
        if (!fs.existsSync(this.frameworkPath)) {
            throw new Error(`Framework not found at ${this.frameworkPath}`);
        }

        // Load framework version
        const packageJson = JSON.parse(fs.readFileSync(path.join(this.frameworkPath, 'package.json'), 'utf-8'));
        this.frameworkVersion = packageJson.version;

        // Register framework's commands
        await this.registerFrameworkCommands();
    }

    /**
     * Register framework's commands
     */
    private async registerFrameworkCommands(): Promise<void> {
        // Load framework's command definitions
        const commandsPath = path.join(this.frameworkPath, 'dist', 'commands');
        if (fs.existsSync(commandsPath)) {
            const commandFiles = fs.readdirSync(commandsPath)
                .filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const commandModule = require(path.join(commandsPath, file));
                if (commandModule.register) {
                    await commandModule.register(this.context);
                }
            }
        }
    }

    /**
     * Get the framework path
     */
    public getPath(): string {
        return this.frameworkPath;
    }

    /**
     * Get the framework version
     */
    public getVersion(): string {
        return this.frameworkVersion;
    }

    /**
     * Compile a file using the framework's compiler
     */
    public async compileFile(inputPath: string, outputPath: string, options: any = {}): Promise<void> {
        const compiler = require(path.join(this.frameworkPath, 'dist', 'compiler'));
        await compiler.compile(inputPath, outputPath, options);
    }

    /**
     * Preview a file using the framework's preview server
     */
    public async previewFile(filePath: string): Promise<void> {
        const preview = require(path.join(this.frameworkPath, 'dist', 'preview'));
        await preview.start(filePath);
    }

    /**
     * Package a project using the framework's packager
     */
    public async packageProject(projectPath: string): Promise<void> {
        const packager = require(path.join(this.frameworkPath, 'dist', 'packager'));
        await packager.package(projectPath);
    }

    /**
     * Format a document using the framework's formatter
     */
    public async formatDocument(document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
        const formatter = require(path.join(this.frameworkPath, 'dist', 'formatter'));
        return formatter.format(document.getText());
    }

    /**
     * Get hover information for a position in a document
     */
    public async getHover(document: vscode.TextDocument, position: vscode.Position): Promise<vscode.Hover | null> {
        const hover = require(path.join(this.frameworkPath, 'dist', 'hover'));
        return hover.getHover(document.getText(), position);
    }
} 