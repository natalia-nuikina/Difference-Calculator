#!/usr/bin/env node

import { program } from 'commander';
import start from '../src/index.js';

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')
  .action((filePath1, filePath2) => {
    const formatName = program.opts().format;
    console.log(start(filePath1, filePath2, formatName));
  });

program.parse();
