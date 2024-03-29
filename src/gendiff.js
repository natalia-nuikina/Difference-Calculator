import _ from 'lodash';
import assignment from 'assignment';
import parseContent from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const currentContent1 = parseContent(filePath1);
  const currentContent2 = parseContent(filePath2);

  const iter = (content1, content2) => {
    const keys = _.union(Object.keys(content1), Object.keys(content2));
    const sortedKeys = keys.toSorted();
    const a = sortedKeys.map((key) => {
      const result = {};
      const currentValue1 = content1[key];
      const currentValue2 = content2[key];
      if (Object.hasOwn(content1, key) && !Object.hasOwn(content2, key)) {
        assignment(result, { name: key, type: 'removed', children: currentValue1 });
      } else if (!Object.hasOwn(content1, key) && Object.hasOwn(content2, key)) {
        assignment(result, { name: key, type: 'added', children: currentValue2 });
      } else if (Object.hasOwn(content1, key) && Object.hasOwn(content2, key)) {
        if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
          assignment(result, { name: key, type: 'updatedInside', children: iter(currentValue1, currentValue2) });
        } else if (currentValue1 === currentValue2) {
          assignment(result, { name: key, type: 'unchanged', children: currentValue1 });
        } else if (currentValue1 !== currentValue2) {
          assignment(result, { name: key, type: 'updated', children: { before: currentValue1, after: currentValue2 } });
        }
      }
      // assignment(res, result);
      return result;
    });
    return a;
  };
  const diff = iter(currentContent1, currentContent2);
  // console.log(diff);
  return diff;
};

export default genDiff;
