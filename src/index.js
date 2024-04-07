import path from 'path';
import genDiff from './gendiff.js';
import chooseFormater from './formatters/index.js';
import parseContent from './parsers.js';
import { readContent } from './helpers.js';

const start = (filePath1, filePath2, formatName = 'stylish') => {
  const format1 = path.extname(filePath1).slice(1);
  const format2 = path.extname(filePath1).slice(1);

  const currentContent1 = parseContent(readContent(filePath1), format1);
  const currentContent2 = parseContent(readContent(filePath2), format2);
  const diff = genDiff(currentContent1, currentContent2);
  return chooseFormater(diff, formatName);
};

export default start;
