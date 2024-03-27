import path from 'path';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';
import { getFixturePath } from './helpers.js';

const parseFile = (file) => {
  const format = path.extname(file);

  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  // console.log(path.resolve(file))
  return parse(fs.readFileSync(getFixturePath(file)));
};

export default parseFile;
