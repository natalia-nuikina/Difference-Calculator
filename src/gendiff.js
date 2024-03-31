import _ from 'lodash';
import parseContent from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const currentContent1 = parseContent(filePath1);
  const currentContent2 = parseContent(filePath2);
  const iter = (content1, content2) => {
    const keys = _.union(Object.keys(content1), Object.keys(content2));
    const sortedKeys = keys.toSorted();
    const node = sortedKeys.map((key) => {
      const currentValue1 = content1[key];
      const currentValue2 = content2[key];
      if (Object.hasOwn(content1, key) && !Object.hasOwn(content2, key)) {
        return { name: key, type: 'removed', children: currentValue1 };
      }
      if (!Object.hasOwn(content1, key) && Object.hasOwn(content2, key)) {
        return { name: key, type: 'added', children: currentValue2 };
      }
      if (Object.hasOwn(content1, key) && Object.hasOwn(content2, key)) {
        if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
          return { name: key, type: 'updatedInside', children: iter(currentValue1, currentValue2) };
        }
        if (currentValue1 === currentValue2) {
          return { name: key, type: 'unchanged', children: currentValue1 };
        }
        if (currentValue1 !== currentValue2) {
          return { name: key, type: 'updated', children: { before: currentValue1, after: currentValue2 } };
        }
      }
      throw new Error(`The key: '${key}' not found in files!`);
    });
    return node;
  };
  const diff = iter(currentContent1, currentContent2);

  return diff;
};

export default genDiff;
