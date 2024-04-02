import path from 'path';
import yaml from 'js-yaml';
import { readContent } from './helpers.js';

const parseContent = (filePath) => {
  const format = path.extname(filePath).slice(1);
  switch (format) {
    case 'json':
      return JSON.parse(readContent(filePath));
    case 'yaml':
    case 'yml':
      return yaml.load(readContent(filePath));
    default:
      return JSON.parse(readContent(filePath));
  }
};

export default parseContent;
