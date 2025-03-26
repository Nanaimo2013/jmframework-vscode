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
exports.getKeywordDescription = exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const formatter_1 = require("./providers/formatter");
const hover_1 = require("./providers/hover");
const compile_1 = require("./commands/compile");
/**
 * Extension activation function - called when the extension is activated
 * @param context The extension context
 */
function activate(context) {
    console.log('JMFramework extension is now active!');
    // Register the formatter provider for JMF file types
    const formatterProvider = new formatter_1.JMFFormatterProvider();
    const jmfLanguages = ['jmf', 'jmcss', 'jmhtml', 'jmconfig', 'jmtemplate', 'jmmodule'];
    const formatterDisposable = vscode.languages.registerDocumentFormattingEditProvider(jmfLanguages, formatterProvider);
    // Register the compile command
    const compileCommand = new compile_1.CompileCommand();
    const compileCommandDisposable = compileCommand.register();
    // Add hover provider for JMF files
    const hoverProvider = new hover_1.JMFHoverProvider();
    const hoverDisposable = vscode.languages.registerHoverProvider(jmfLanguages, hoverProvider);
    // Add the disposables to context subscriptions
    context.subscriptions.push(formatterDisposable, compileCommandDisposable, hoverDisposable);
}
exports.activate = activate;
/**
 * Extension deactivation function - called when the extension is deactivated
 */
function deactivate() {
    console.log('JMFramework extension is now deactivated!');
}
exports.deactivate = deactivate;
/**
 * Get description for a JMF keyword
 * @param keyword The JMF keyword
 * @returns A description of the keyword
 */
function getKeywordDescription(keyword) {
    const descriptions = {
        'component': 'defining reusable UI components',
        'property': 'declaring component properties with optional default values',
        'style': 'defining CSS styles for components',
        'render': 'specifying the HTML structure of components',
        'hover': 'defining styles for hover state',
        'variable': 'declaring reusable CSS variables',
        'mixin': 'creating reusable style blocks',
        'focus': 'defining styles for focus state',
        'active': 'defining styles for active state',
        'disabled': 'defining styles for disabled state',
        'import': 'importing components from other files',
        'export': 'exporting components for use in other files',
        'from': 'specifying the source for imports',
        'template': 'defining reusable templates',
        'module': 'defining a module with exported functionality',
        'config': 'configuring project settings'
    };
    return descriptions[keyword] || 'unknown purpose';
}
exports.getKeywordDescription = getKeywordDescription;
//# sourceMappingURL=extension.js.map