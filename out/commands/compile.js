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
/**
 * JMF Compile Command
 * Compiles a JMF file using the JMF compiler
 */
class CompileCommand {
    /**
     * Constructor
     */
    constructor(framework) {
        this.framework = framework;
    }
    /**
     * Register the command with VS Code
     * @returns A disposable command
     */
    register() {
        return vscode.commands.registerCommand('jmframework.compile', async (uri) => {
            try {
                const editor = vscode.window.activeTextEditor;
                const filePath = uri?.fsPath || editor?.document.uri.fsPath;
                if (!filePath) {
                    throw new Error('No file selected');
                }
                // Use framework's compiler
                await this.framework.compileFile(filePath, filePath);
                vscode.window.showInformationMessage('File compiled successfully!');
            }
            catch (error) {
                vscode.window.showErrorMessage(`Compilation failed: ${error}`);
            }
        });
    }
}
exports.CompileCommand = CompileCommand;
//# sourceMappingURL=compile.js.map