import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';
import { readFile } from './helpers.js';

const parseFile = (file) => {
  const format = path.extname(file);

  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(readFile(file));
};

export default parseFile;
