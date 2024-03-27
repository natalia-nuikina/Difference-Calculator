import _ from 'lodash';
import parseFile from './parsers.js';

const gendiff = (filepath1, filepath2) => {
  const currentFile1 = parseFile(filepath1);
  const currentFile2 = parseFile(filepath2);

  const iter = (file1, file2) => {
    const keys = _.union(Object.keys(file1), Object.keys(file2));
    const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
    const result = {};
    sortedKeys.map((key) => {
      const currentValue1 = file1[key];
      const currentValue2 = file2[key];

      if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
        result[key] = 'removed';
      } else if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        result[key] = 'added';
      } else if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
          const res = iter(currentValue1, currentValue2);
          result[key] = res;
        } else if (currentValue1 === currentValue2) {
          result[key] = 'unchanged';
        } else if (currentValue1 !== currentValue2) {
          result[key] = 'updated';
        }
      }
      return key;
    });
    return result;
  };
  const diff = iter(currentFile1, currentFile2);
  return diff;
};

export default gendiff;
