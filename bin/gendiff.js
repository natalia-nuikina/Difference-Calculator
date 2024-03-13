#!/usr/bin/env node

const { program } = require('commander');

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')

program.parse();
