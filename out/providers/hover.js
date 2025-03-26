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
exports.JMFHoverProvider = void 0;
const path = __importStar(require("path"));
/**
 * JMF Hover Provider
 * Provides hover information for JMF language files
 */
class JMFHoverProvider {
    constructor(framework) {
        this.framework = framework;
    }
    /**
     * Provides hover information for a given position in a document
     * @param document The document in which the hover was invoked
     * @param position The position at which the hover was invoked
     * @param token A cancellation token
     * @returns A hover containing the hover information or null
     */
    provideHover(document, position, token) {
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
        }
        catch (error) {
            console.error('Hover failed:', error);
            return null;
        }
    }
}
exports.JMFHoverProvider = JMFHoverProvider;
//# sourceMappingURL=hover.js.map