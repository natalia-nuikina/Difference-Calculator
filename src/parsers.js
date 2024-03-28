import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';
import { readContent } from './helpers.js';

const parseContent = (filePath) => {
  const format = path.extname(filePath);

  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(readContent(filePath));
};

export default parseContent;
