#!/usr/bin/env node

const { program } = require('commander');

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

  program.parse();