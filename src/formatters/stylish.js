import _ from 'lodash';

const toString = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const keys = Object.keys(obj);
  const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
  const tab = '  ';
  let result = '{\n';
  const b = sortedKeys.map((item) => {
    const currentValue = obj[item];
    return `${tab.repeat(depth * 2 + 2)}${item}: ${toString(currentValue, depth + 1)}`;
  });
  result += b.join('\n');
  result += `\n${tab.repeat(depth * 2)}}`;
  return result;
};

const getLine = (currentIndent, key, char, funct) => `\n${currentIndent}${char} ${key}: ${funct}`;

const stylish = (file1, file2, differents, replacer = '  ', spacesCount = 2) => {
  const iter = (currentFile1, currentFile2, diff, depth) => {
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
        const curValue1 = currentFile1[key];
        const curValue2 = currentFile2[key];

        if (diff[key] === 'removed') {
          res += getLine(indent, key, charMinus, toString(curValue1, depth));
        } else if (diff[key] === 'added') {
          res += getLine(indent, key, charPlus, toString(curValue2, depth));
        } else if (diff[key] === 'unchanged') {
          res += getLine(indent, key, charNull, toString(curValue1, depth));
        } else if (diff[key] === 'updated') {
          res += getLine(indent, key, charMinus, toString(curValue1, depth));
          res += getLine(indent, key, charPlus, toString(curValue2, depth));
        } else if (_.isObject(diff[key])) {
          res += getLine(indent, key, charNull, iter(curValue1, curValue2, diff[key], depth + 1));
        }
        return key;
      });
    res += `\n${bracketIndent}}`;
    return res;
  };
  return iter(file1, file2, differents, 1);
};

export default stylish;
