import * as vscode from 'vscode';
import { FrameworkAdapter } from '../framework/adapter';
import * as path from 'path';

/**
 * JMF Hover Provider
 * Provides hover information for JMF language files
 */
export class JMFHoverProvider implements vscode.HoverProvider {
    private framework: FrameworkAdapter;

    constructor(framework: FrameworkAdapter) {
        this.framework = framework;
    }

    /**
     * Provides hover information for a given position in a document
     * @param document The document in which the hover was invoked
     * @param position The position at which the hover was invoked
     * @param token A cancellation token
     * @returns A hover containing the hover information or null
     */
    public provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
        if (token.isCancellationRequested) {
            return null;
        }

        // Get the word at position
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return null;
        }
        
        const word = document.getText(wordRange);
        const fileExtension = document.fileName.split('.').pop()?.toLowerCase();
        
        try {
            // Use framework's hover provider
            const hoverProvider = require(path.join(this.framework.getPath(), 'dist', 'hover'));
            return hoverProvider.getHover(word, fileExtension, document, position);
        } catch (error) {
            console.error('Hover failed:', error);
            return null;
        }
    }
} 