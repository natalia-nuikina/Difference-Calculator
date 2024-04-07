import _ from 'lodash';

const genDiff = (currentContent1, currentContent2) => {
  const iter = (content1, content2) => {
    const keys = _.union(Object.keys(content1), Object.keys(content2));
    const sortedKeys = keys.toSorted();
    const node = sortedKeys.map((key) => {
      if (!Object.hasOwn(content2, key)) {
        return { name: key, type: 'removed', value: content1[key] };
      }
      if (!Object.hasOwn(content1, key)) {
        return { name: key, type: 'added', value: content2[key] };
      }
      if (_.isPlainObject(content1[key]) && _.isPlainObject(content2[key])) {
        return { name: key, type: 'updatedInside', children: iter(content1[key], content2[key]) };
      }
      if (_.isEqual(content1[key], content2[key])) {
        return { name: key, type: 'unchanged', value: content1[key] };
      }
      if (!_.isEqual(content1[key], content2[key])) {
        return {
          name: key, type: 'updated', value1: content1[key], value2: content2[key],
        };
      }
      throw new Error(`The key: '${key}' not found in files!`);
    });
    return node;
  };
  const diff = iter(currentContent1, currentContent2);
  return diff;
};

export default genDiff;
