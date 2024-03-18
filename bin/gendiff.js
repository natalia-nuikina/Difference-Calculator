#!/usr/bin/env node

const { program } = require('commander');
const path = require('node:path'); 
const fs = require('fs');

const a = (filepath1, filepath2) => {
  // BEGIN
  // const result = join(first, second, options.connector);
  console.log(path.resolve(filepath1));
  console.log(JSON.parse(fs.readFileSync(path.resolve(filepath1))));
  console.log(JSON.parse(fs.readFileSync(path.resolve(filepath2))));
  // console.log(fs.readFileSync(filepath2));
  return path.resolve(filepath1)
}

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(a)

  program.parse();