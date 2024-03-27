import _ from 'lodash';
import parseFile from '../parsers.js';
import { getData } from '../helpers.js';

const plain = (filepath1, filepath2, differents) => {
  const currentFile1 = parseFile(filepath1);
  const currentFile2 = parseFile(filepath2);

  let res = '';
  const iter = (file1, file2, diff, depth) => {
    Object.keys(diff)
      .map((key) => {
        const curValue1 = file1[key];
        const curValue2 = file2[key];
        let path = key;
        if (_.isObject(diff[key])) {
          const collectionPath = `${depth}${[key]}.`;
          path = iter(curValue1, curValue2, diff[key], collectionPath);
        }
        if (diff[key] === 'removed') {
          res += `\nProperty '${depth}${path}' was ${diff[key]}`;
        } else if (diff[key] === 'added') {
          res += `\nProperty '${depth}${path}' was ${diff[key]} with value: ${getData(curValue2)}`;
        } else if (diff[key] === 'updated') {
          res += `\nProperty '${depth}${path}' was ${diff[key]}. From ${getData(curValue1)} to ${getData(curValue2)}`;
        }
        return res;
      });
    return res;
  };
  return iter(currentFile1, currentFile2, differents, '').slice(1);
};

export default plain;
