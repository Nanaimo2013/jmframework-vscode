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
const path = __importStar(require("path"));
/**
 * JMF Formatter Provider
 * Handles formatting for JMF language files
 */
class JMFFormatterProvider {
    constructor(framework) {
        this.framework = framework;
    }
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
        try {
            // Use framework's formatter
            const formatter = require(path.join(this.framework.getPath(), 'dist', 'formatter'));
            const formattedText = formatter.format(text, document.fileName, options);
            if (formattedText !== text) {
                const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
                result.push(vscode.TextEdit.replace(fullRange, formattedText));
            }
        }
        catch (error) {
            console.error('Formatting failed:', error);
        }
        return result;
    }
}
exports.JMFFormatterProvider = JMFFormatterProvider;
//# sourceMappingURL=formatter.js.map