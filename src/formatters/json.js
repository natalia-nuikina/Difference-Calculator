import _ from 'lodash';
import parseFile from '../parsers.js';

const json = (filepath1, filepath2, differents) => {
  const result = {};
  result.filePath1 = filepath1;
  result.filePath2 = filepath2;

  const currentFile1 = parseFile(filepath1);
  const currentFile2 = parseFile(filepath2);

  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;
  let updatedCount = 0;
  let updatedInsideCount = 0;

  const iter = (file1, file2, diff, depth) => {
    const a = Object.keys(diff)
      .map((key) => {
        const message = {};
        const curValue1 = file1[key];
        const curValue2 = file2[key];

        message.name = key;
        message.status = (typeof diff[key] === 'string') ? diff[key] : 'updatedInside';
        if (diff[key] === 'removed') {
          removedCount += 1;
          message.value = file1[key];
        } else if (diff[key] === 'added') {
          addedCount += 1;
          message.value = file2[key];
        } else if (diff[key] === 'unchanged') {
          unchangedCount += 1;
          message.value = file1[key];
        } else if (diff[key] === 'updated') {
          updatedCount += 1;
          message.value = {};
          message.value.before = file1[key];
          message.value.after = file2[key];
        } else if (_.isObject(diff[key])) {
          updatedInsideCount += 1;
          message.value = iter(curValue1, curValue2, diff[key], depth + 1);
        }
        return message;
      });
    return a;
  };

  result.messages = iter(currentFile1, currentFile2, differents, 1);
  result.addedCount = addedCount;
  result.removedCount = removedCount;
  result.unchangedCount = unchangedCount;
  result.updatedCount = updatedCount;
  result.updatedInsideCount = updatedInsideCount;
  return JSON.stringify([result], null, '  ');
};

export default json;
