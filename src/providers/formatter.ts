import * as vscode from 'vscode';
import { FrameworkAdapter } from '../framework/adapter';
import * as path from 'path';

/**
 * JMF Formatter Provider
 * Handles formatting for JMF language files
 */
export class JMFFormatterProvider implements vscode.DocumentFormattingEditProvider {
    private framework: FrameworkAdapter;

    constructor(framework: FrameworkAdapter) {
        this.framework = framework;
    }

    /**
     * Provides formatting edits for a document
     * @param document The document to format
     * @param options Formatting options
     * @param token A cancellation token
     * @returns An array of text edits to be applied to the document
     */
    public provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): vscode.TextEdit[] {
        if (token.isCancellationRequested) {
            return [];
        }

        const result: vscode.TextEdit[] = [];
        const text = document.getText();
        
        try {
            // Use framework's formatter
            const formatter = require(path.join(this.framework.getPath(), 'dist', 'formatter'));
            const formattedText = formatter.format(text, document.fileName, options);
            
            if (formattedText !== text) {
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(text.length)
                );
                result.push(vscode.TextEdit.replace(fullRange, formattedText));
            }
        } catch (error) {
            console.error('Formatting failed:', error);
        }
        
        return result;
    }
} 