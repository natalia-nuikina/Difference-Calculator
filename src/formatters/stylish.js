import _ from 'lodash';
import parseFile from '../parsers.js';
import { getLine, objectToString } from '../helpers.js';

const stylish = (filepath1, filepath2, differents, replacer = '  ', spacesCount = 2) => {
  const currentFile1 = parseFile(filepath1);
  const currentFile2 = parseFile(filepath2);

  const iter = (file1, file2, diff, depth) => {
    let res = '{';
    const leftShiftLine = 1;
    const leftShiftBracket = 2;
    const indent = replacer.repeat(depth * spacesCount - leftShiftLine);
    const bracketIndent = replacer.repeat(depth * spacesCount - leftShiftBracket);
    Object.keys(diff)
      .map((key) => {
        const charMinus = '-';
        const charPlus = '+';
        const charNull = ' ';
        const curValue1 = file1[key];
        const curValue2 = file2[key];

        if (diff[key] === 'removed') {
          res += getLine(indent, key, charMinus, objectToString(curValue1, depth));
        } else if (diff[key] === 'added') {
          res += getLine(indent, key, charPlus, objectToString(curValue2, depth));
        } else if (diff[key] === 'unchanged') {
          res += getLine(indent, key, charNull, objectToString(curValue1, depth));
        } else if (diff[key] === 'updated') {
          res += getLine(indent, key, charMinus, objectToString(curValue1, depth));
          res += getLine(indent, key, charPlus, objectToString(curValue2, depth));
        } else if (_.isObject(diff[key])) {
          res += getLine(indent, key, charNull, iter(curValue1, curValue2, diff[key], depth + 1));
        }
        return key;
      });
    res += `\n${bracketIndent}}`;
    return res;
  };
  return iter(currentFile1, currentFile2, differents, 1);
};

export default stylish;
