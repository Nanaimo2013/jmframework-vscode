#!/usr/bin/env node

import { Command } from 'commander';
import * as path from 'path';
import * as fs from 'fs';
import * as chokidar from 'chokidar';
import * as http from 'http';
const compiler = require('../../src/compiler');

const program = new Command();

program
    .name('jmf')
    .description('JMFramework CLI tools')
    .version('0.5.0');

program
    .command('compile')
    .description('Compile JMF files')
    .argument('<input>', 'Input file or directory')
    .option('-o, --output <dir>', 'Output directory')
    .option('-m, --minify', 'Minify output')
    .action(async (input: string, options: any) => {
        const inputPath = path.resolve(input);
        const outputPath = options.output ? path.resolve(options.output) : path.dirname(inputPath);

        try {
            await compiler.compile(inputPath, outputPath, { minify: options.minify });
            console.log('Compilation completed successfully!');
        } catch (error) {
            console.error('Compilation failed:', error);
            process.exit(1);
        }
    });

program
    .command('preview')
    .description('Start a preview server')
    .argument('<input>', 'Input file')
    .option('-p, --port <number>', 'Port to use', '3000')
    .action(async (input: string, options: any) => {
        const inputPath = path.resolve(input);
        const outputPath = path.dirname(inputPath);

        try {
            // Compile the file first
            await compiler.compile(inputPath, outputPath);

            // Start preview server
            const server = http.createServer((req, res) => {
                // TODO: Implement preview server
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('Preview server running...');
            });

            server.listen(parseInt(options.port), () => {
                console.log(`Preview server running at http://localhost:${options.port}`);
            });
        } catch (error) {
            console.error('Preview failed:', error);
            process.exit(1);
        }
    });

program
    .command('watch')
    .description('Watch for changes and recompile')
    .argument('<input>', 'Input file or directory')
    .option('-o, --output <dir>', 'Output directory')
    .action(async (input: string, options: any) => {
        const inputPath = path.resolve(input);
        const outputPath = options.output ? path.resolve(options.output) : path.dirname(inputPath);

        try {
            // Initial compilation
            await compiler.compile(inputPath, outputPath);
            console.log('Initial compilation completed!');

            // Watch for changes
            chokidar.watch(inputPath).on('change', async () => {
                console.log('File changed, recompiling...');
                await compiler.compile(inputPath, outputPath);
                console.log('Recompilation completed!');
            });

            console.log('Watching for changes...');
        } catch (error) {
            console.error('Watch failed:', error);
            process.exit(1);
        }
    });

program
    .command('package')
    .description('Package a JMF project')
    .option('-o, --output <path>', 'Output directory', 'dist')
    .option('-m, --minify', 'Minify output files')
    .action(async (options) => {
        try {
            const outputPath = path.resolve(options.output);
            if (!fs.existsSync(outputPath)) {
                fs.mkdirSync(outputPath, { recursive: true });
            }

            // Find all JMF files in the current directory
            const files = fs.readdirSync('.')
                .filter(file => /\.(jmf|jmcss|jmhtml|jmconfig|jmtemplate|jmmodule)$/.test(file));

            console.log('Found JMF files:', files);

            // Compile each file
            for (const file of files) {
                console.log(`Compiling ${file}...`);
                await compiler.compile(file, outputPath, options.minify);
            }

            // Create package.json
            const packageJson = {
                name: path.basename(process.cwd()),
                version: '1.0.0',
                description: 'JMF Project',
                main: 'index.js',
                scripts: {
                    start: 'node index.js'
                },
                dependencies: {
                    jmframework: '^0.5.0'
                }
            };

            fs.writeFileSync(
                path.join(outputPath, 'package.json'),
                JSON.stringify(packageJson, null, 2)
            );

            console.log('Packaging completed successfully!');
        } catch (error) {
            console.error('Packaging failed:', error);
            process.exit(1);
        }
    });

program.parse(); 