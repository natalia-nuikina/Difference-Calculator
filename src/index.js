import genDiff from './gendiff.js';
import chooseFormater from './formatters/index.js';

const start = (filePath1, filePath2, formatName) => {
  const diff = genDiff(filePath1, filePath2);
  return chooseFormater(filePath1, filePath2, diff, formatName);
};

export default start;
