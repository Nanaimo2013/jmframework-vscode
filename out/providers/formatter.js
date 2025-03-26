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
exports.JMFFormatterProvider = void 0;
const vscode = __importStar(require("vscode"));
/**
 * JMF Formatter Provider
 * Handles formatting for JMF language files
 */
class JMFFormatterProvider {
    /**
     * Provides formatting edits for a document
     * @param document The document to format
     * @param options Formatting options
     * @param token A cancellation token
     * @returns An array of text edits to be applied to the document
     */
    provideDocumentFormattingEdits(document, options, token) {
        if (token.isCancellationRequested) {
            return [];
        }
        const result = [];
        const text = document.getText();
        const formattedText = this.formatDocument(text, document.fileName, options);
        if (formattedText !== text) {
            const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
            result.push(vscode.TextEdit.replace(fullRange, formattedText));
        }
        return result;
    }
    /**
     * Format a document's text based on its type
     * @param text The text to format
     * @param fileName The file name to determine the document type
     * @param options Formatting options
     * @returns The formatted text
     */
    formatDocument(text, fileName, options) {
        const fileExtension = fileName.split('.').pop()?.toLowerCase();
        switch (fileExtension) {
            case 'jmf':
                return this.formatJMF(text, options);
            case 'jmcss':
                return this.formatJMCSS(text, options);
            case 'jmhtml':
                return this.formatJMHTML(text, options);
            case 'jmconfig':
            case 'jmc':
                return this.formatJMConfig(text, options);
            case 'jmtemplate':
            case 'jmt':
                return this.formatJMTemplate(text, options);
            case 'jmmodule':
            case 'jmm':
                return this.formatJMModule(text, options);
            default:
                return text;
        }
    }
    /**
     * Format JMF code
     * @param text The text to format
     * @param options Formatting options
     * @returns The formatted text
     */
    formatJMF(text, options) {
        // Simple indentation and spacing for JMF files
        // A real implementation would use a proper parser/formatter
        return this.applyBasicFormatting(text, options);
    }
    /**
     * Format JMCSS code
     * @param text The text to format
     * @param options Formatting options
     * @returns The formatted text
     */
    formatJMCSS(text, options) {
        // CSS specific formatting rules would go here
        return this.applyBasicFormatting(text, options);
    }
    /**
     * Format JMHTML code
     * @param text The text to format
     * @param options Formatting options
     * @returns The formatted text
     */
    formatJMHTML(text, options) {
        // HTML specific formatting rules would go here
        return this.applyBasicFormatting(text, options);
    }
    /**
     * Format JMConfig code
     * @param text The text to format
     * @param options Formatting options
     * @returns The formatted text
     */
    formatJMConfig(text, options) {
        // Config specific formatting rules would go here
        return this.applyBasicFormatting(text, options);
    }
    /**
     * Format JMTemplate code
     * @param text The text to format
     * @param options Formatting options
     * @returns The formatted text
     */
    formatJMTemplate(text, options) {
        // Template specific formatting rules would go here
        return this.applyBasicFormatting(text, options);
    }
    /**
     * Format JMModule code
     * @param text The text to format
     * @param options Formatting options
     * @returns The formatted text
     */
    formatJMModule(text, options) {
        // Module specific formatting rules would go here
        return this.applyBasicFormatting(text, options);
    }
    /**
     * Apply basic formatting rules to text
     * @param text The text to format
     * @returns The formatted text
     */
    applyBasicFormatting(text, _options) {
        // For now, this is a placeholder that doesn't change the input
        // A real implementation would format based on language-specific rules
        return text;
    }
}
exports.JMFFormatterProvider = JMFFormatterProvider;
//# sourceMappingURL=formatter.js.map