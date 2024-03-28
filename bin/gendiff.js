#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';
import chooseFormater from '../src/formatters/index.js';

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')
  .action((filePath1, filePath2) => {
    const formatName = program.opts().format;
    const diff = genDiff(filePath1, filePath2);
    const result = chooseFormater(filePath1, filePath2, diff, formatName);
    console.log(result);
  });

program.parse();
