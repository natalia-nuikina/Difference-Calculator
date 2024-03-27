import path from 'path';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

const parseFile = (file) => {
  const format = path.extname(file);

  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(fs.readFileSync(path.resolve('./__fixtures__', file)));
};

export default parseFile;
