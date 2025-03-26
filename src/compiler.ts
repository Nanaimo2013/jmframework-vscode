import * as path from 'path';
import * as fs from 'fs';

/**
 * Compile a JMF file
 * @param inputPath Path to the input file
 * @param outputPath Path to the output directory
 * @param minify Whether to minify the output
 */
export async function compileFile(
    inputPath: string,
    outputPath: string,
    minify: boolean = false
): Promise<void> {
    const fileExt = path.extname(inputPath).toLowerCase();
    const baseName = path.basename(inputPath, fileExt);
    const content = fs.readFileSync(inputPath, 'utf-8');

    // Parse and compile based on file type
    switch (fileExt) {
        case '.jmf':
            await compileJMF(content, outputPath, baseName, minify);
            break;
        case '.jmcss':
            await compileJMCSS(content, outputPath, baseName, minify);
            break;
        case '.jmhtml':
            await compileJMHTML(content, outputPath, baseName, minify);
            break;
        case '.jmconfig':
            await compileJMConfig(content, outputPath, baseName);
            break;
        case '.jmtemplate':
            await compileJMTemplate(content, outputPath, baseName);
            break;
        case '.jmmodule':
            await compileJMModule(content, outputPath, baseName);
            break;
        default:
            throw new Error(`Unsupported file type: ${fileExt}`);
    }
}

/**
 * Compile a JMF component file
 */
async function compileJMF(
    content: string,
    outputPath: string,
    baseName: string,
    minify: boolean
): Promise<void> {
    // Parse the JMF file
    const lines = content.split('\n');
    let htmlContent = '';
    let cssContent = '';
    let jsContent = '';

    for (const line of lines) {
        if (line.trim().startsWith('render')) {
            htmlContent = extractContent(lines, 'render');
        } else if (line.trim().startsWith('style')) {
            cssContent = extractContent(lines, 'style');
        } else if (line.trim().startsWith('script')) {
            jsContent = extractContent(lines, 'script');
        }
    }

    // Write output files
    if (htmlContent) {
        fs.writeFileSync(
            path.join(outputPath, `${baseName}.html`),
            minify ? minifyHTML(htmlContent) : htmlContent
        );
    }

    if (cssContent) {
        fs.writeFileSync(
            path.join(outputPath, `${baseName}.css`),
            minify ? minifyCSS(cssContent) : cssContent
        );
    }

    if (jsContent) {
        fs.writeFileSync(
            path.join(outputPath, `${baseName}.js`),
            minify ? minifyJS(jsContent) : jsContent
        );
    }
}

/**
 * Compile a JMCSS file
 */
async function compileJMCSS(
    content: string,
    outputPath: string,
    baseName: string,
    minify: boolean
): Promise<void> {
    // Process JMCSS content
    const processedCSS = processJMCSS(content);
    
    // Write output file
    fs.writeFileSync(
        path.join(outputPath, `${baseName}.css`),
        minify ? minifyCSS(processedCSS) : processedCSS
    );
}

/**
 * Compile a JMHTML file
 */
async function compileJMHTML(
    content: string,
    outputPath: string,
    baseName: string,
    minify: boolean
): Promise<void> {
    // Process JMHTML content
    const processedHTML = processJMHTML(content);
    
    // Write output file
    fs.writeFileSync(
        path.join(outputPath, `${baseName}.html`),
        minify ? minifyHTML(processedHTML) : processedHTML
    );
}

/**
 * Compile a JMConfig file
 */
async function compileJMConfig(
    content: string,
    outputPath: string,
    baseName: string
): Promise<void> {
    // Process JMConfig content
    const config = processJMConfig(content);
    
    // Write output file
    fs.writeFileSync(
        path.join(outputPath, `${baseName}.config.json`),
        JSON.stringify(config, null, 2)
    );
}

/**
 * Compile a JMTemplate file
 */
async function compileJMTemplate(
    content: string,
    outputPath: string,
    baseName: string
): Promise<void> {
    // Process JMTemplate content
    const template = processJMTemplate(content);
    
    // Write output file
    fs.writeFileSync(
        path.join(outputPath, `${baseName}.template.js`),
        template
    );
}

/**
 * Compile a JMModule file
 */
async function compileJMModule(
    content: string,
    outputPath: string,
    baseName: string
): Promise<void> {
    // Process JMModule content
    const module = processJMModule(content);
    
    // Write output file
    fs.writeFileSync(
        path.join(outputPath, `${baseName}.module.js`),
        module
    );
}

/**
 * Extract content between a start marker and the next section
 */
function extractContent(lines: string[], marker: string): string {
    const startIndex = lines.findIndex(line => line.trim().startsWith(marker));
    if (startIndex === -1) return '';

    const content: string[] = [];
    let inContent = false;

    for (let i = startIndex + 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('render') || 
            line.trim().startsWith('style') || 
            line.trim().startsWith('script')) {
            break;
        }
        if (line.trim()) {
            inContent = true;
            content.push(line);
        } else if (inContent) {
            break;
        }
    }

    return content.join('\n').trim();
}

/**
 * Process JMCSS content
 */
function processJMCSS(content: string): string {
    // Add JMCSS processing logic here
    return content;
}

/**
 * Process JMHTML content
 */
function processJMHTML(content: string): string {
    // Add JMHTML processing logic here
    return content;
}

/**
 * Process JMConfig content
 */
function processJMConfig(content: string): any {
    try {
        return JSON.parse(content);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Invalid JMConfig format: ${errorMessage}`);
    }
}

/**
 * Process JMTemplate content
 */
function processJMTemplate(content: string): string {
    // Add JMTemplate processing logic here
    return content;
}

/**
 * Process JMModule content
 */
function processJMModule(content: string): string {
    // Add JMModule processing logic here
    return content;
}

/**
 * Minify HTML content
 */
function minifyHTML(content: string): string {
    // Add HTML minification logic here
    return content;
}

/**
 * Minify CSS content
 */
function minifyCSS(content: string): string {
    // Add CSS minification logic here
    return content;
}

/**
 * Minify JavaScript content
 */
function minifyJS(content: string): string {
    // Add JavaScript minification logic here
    return content;
} 