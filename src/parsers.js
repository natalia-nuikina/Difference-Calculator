import path from 'path';
import yaml from 'js-yaml';
import { readContent } from './helpers.js';

const parseContent = (filePath) => {
  const format = path.extname(filePath);
  switch (format) {
    case '.json':
      return JSON.parse(readContent(filePath));
    case '.yaml':
      return yaml.load(readContent(filePath));
    case '.yml':
      return yaml.load(readContent(filePath));
    default:
      return JSON.parse(readContent(filePath));
  }
};

export default parseContent;
