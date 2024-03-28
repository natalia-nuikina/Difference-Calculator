import _ from 'lodash';
import parseContent from '../parsers.js';
import { getLine, objectToString } from '../helpers.js';

const stylish = (filePath1, filePath2, differents, replacer = '  ', spacesCount = 2) => {
  const currentContent1 = parseContent(filePath1);
  const currentContent2 = parseContent(filePath2);

  const iter = (content1, content2, diff, depth) => {
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
        const value1 = content1[key];
        const value2 = content2[key];
        switch (diff[key]) {
          case 'removed':
            res += getLine(indent, key, charMinus, objectToString(value1, depth));
            break;
          case 'added':
            res += getLine(indent, key, charPlus, objectToString(value2, depth));
            break;
          case 'unchanged':
            res += getLine(indent, key, charNull, objectToString(value1, depth));
            break;
          case 'updated':
            res += getLine(indent, key, charMinus, objectToString(value1, depth));
            res += getLine(indent, key, charPlus, objectToString(value2, depth));
            break;
          default:
            if (_.isObject(diff[key])) {
              res += getLine(indent, key, charNull, iter(value1, value2, diff[key], depth + 1));
            } else {
              throw new Error(`Unknown order state: '${diff[key]}'!`);
            }
        }
        return key;
      });
    res += `\n${bracketIndent}}`;
    return res;
  };
  return iter(currentContent1, currentContent2, differents, 1);
};

export default stylish;
