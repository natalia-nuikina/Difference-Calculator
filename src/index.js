import path from 'path';
// import cwd from 'node:process';
import fs from 'fs';
import _ from 'lodash';

const getFile = (file) => JSON.parse(fs.readFileSync(path.resolve('./__fixtures__', file)));

const gendiff = (filepath1, filepath2) => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);
  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
  const tab = '  ';
  let result = '{';
  sortedKeys.map((item) => {
    if (Object.hasOwn(file1, item) && !Object.hasOwn(file2, item)) {
      result += `\n${tab}- ${item}: ${file1[item]}`;
      return item;
    }
    if (!Object.hasOwn(file1, item) && Object.hasOwn(file2, item)) {
      result += `\n${tab}+ ${item}: ${file2[item]}`;
      return item;
    }
    if (file1[item] === file2[item]) {
      result += `\n${tab}${tab}${item}: ${file1[item]}`;
      return item;
    }
    if (file1[item] !== file2[item]) {
      result += `\n${tab}- ${item}: ${file1[item]}`;
      result += `\n${tab}+ ${item}: ${file2[item]}`;
      return item;
    }
    return item;
  });

  result += '\n}';
  return result;
};

export default gendiff;
