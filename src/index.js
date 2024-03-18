import path from 'node:path'; 
import fs from 'fs';
import _ from 'lodash';

const getFile = (file) => JSON.parse(fs.readFileSync(path.resolve(file)));

const gendiff = (filepath1, filepath2) => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);
  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
  const tab = '  ';
  let result = '{'
  const b = sortedKeys.map((item) => {
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
  })

result += '\n}'
// console.log(result);
// console.log(sortedKeys);
// console.log(file1);


  return result;
}

export default gendiff;