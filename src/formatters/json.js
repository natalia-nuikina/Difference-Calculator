import _ from 'lodash';
import path from 'path';
import parseContent from '../parsers.js';

const json = (filePath1, filePath2, differents) => {
  const result = {};
  result.fileName1 = path.basename(filePath1);
  result.fileName2 = path.basename(filePath2);

  const currentContent1 = parseContent(filePath1);
  const currentContent2 = parseContent(filePath2);

  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;
  let updatedCount = 0;
  let updatedInsideCount = 0;

  const iter = (content1, content2, diff) => {
    const a = Object.keys(diff)
      .map((key) => {
        const message = {};
        const curValue1 = content1[key];
        const curValue2 = content2[key];

        message.name = key;
        message.status = (typeof diff[key] === 'string') ? diff[key] : 'updatedInside';
        switch (diff[key]) {
          case 'removed':
            removedCount += 1;
            message.value = content1[key];
            break;
          case 'added':
            addedCount += 1;
            message.value = content2[key];
            break;
          case 'unchanged':
            unchangedCount += 1;
            message.value = content1[key];
            break;
          case 'updated':
            updatedCount += 1;
            message.value = {};
            message.value.before = content1[key];
            message.value.after = content2[key];
            break;
          default:
            if (_.isObject(diff[key])) {
              updatedInsideCount += 1;
              message.value = iter(curValue1, curValue2, diff[key]);
            } else {
              throw new Error(`Unknown order state: '${diff[key]}'!`);
            }
        }
        return message;
      });
    return a;
  };

  result.messages = iter(currentContent1, currentContent2, differents);
  result.addedCount = addedCount;
  result.removedCount = removedCount;
  result.unchangedCount = unchangedCount;
  result.updatedCount = updatedCount;
  result.updatedInsideCount = updatedInsideCount;
  return JSON.stringify([result], null, '  ');
};

export default json;
