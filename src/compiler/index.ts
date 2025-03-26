import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { FrameworkAdapter } from '../framework/adapter';

/**
 * Compiler interface
 */
export interface CompilerOptions {
    outputDir?: string;
    sourceMaps?: boolean;
    minify?: boolean;
}

let frameworkAdapter: FrameworkAdapter | null = null;

/**
 * Initialize the compiler with the framework adapter
 */
function initializeCompiler(context: vscode.ExtensionContext): void {
    frameworkAdapter = new FrameworkAdapter(context);
}

/**
 * Compile a JMF file
 * @param inputPath Path to the input file
 * @param outputPath Path to the output file
 * @param options Compiler options
 */
async function compile(
    inputPath: string,
    outputPath: string,
    options: CompilerOptions = {}
): Promise<void> {
    try {
        if (!frameworkAdapter) {
            throw new Error('Compiler not initialized. Call initializeCompiler first.');
        }

        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Use framework's compiler
        await frameworkAdapter.compileFile(inputPath, outputPath, options);
    } catch (error) {
        throw new Error(`Compilation failed: ${error}`);
    }
}

module.exports = {
    initializeCompiler,
    compile
};