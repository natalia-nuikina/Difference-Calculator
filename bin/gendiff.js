#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/index.js';
import stylish from '../src/stylish.js';

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format (default: "stylish")', stylish)
  .action((file1, file2) => console.log(gendiff(file1, file2)));

program.parse();
