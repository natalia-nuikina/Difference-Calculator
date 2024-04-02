import genDiff from './gendiff.js';
import chooseFormater from './formatters/index.js';
import parseContent from './parsers.js';

const start = (filePath1, filePath2, formatName) => {
  const currentContent1 = parseContent(filePath1);
  const currentContent2 = parseContent(filePath2);
  const diff = genDiff(currentContent1, currentContent2);
  return chooseFormater(filePath1, filePath2, diff, formatName);
};

export default start;
