import _ from 'lodash';

const stringify = (value, depth) => {
  const iter = (obj, depthIter) => {
    const tab = '  ';
    const indent = tab.repeat(depthIter * 2);
    if (!_.isObject(obj)) {
      return obj;
    }
    const keys = Object.keys(obj);
    const sortedKeys = keys.toSorted();
    const lines = sortedKeys.map((item) => {
      const currentValue = obj[item];
      return `    ${indent}${item}: ${stringify(currentValue, depthIter + 1)}`;
    });
    return [
      '{',
      ...lines,
      `${indent}}`,
    ].join('\n');
  };
  return iter(value, depth);
};

const stylish = (difference) => {
  const iter = (diff, depth) => {
    const leftShiftLine = 2;
    const spacesCount = 2;
    const indent = '  '.repeat(depth * spacesCount - leftShiftLine);
    const lines = diff
      .map((item) => {
        switch (item.type) {
          case 'removed':
            return `  ${indent}- ${item.name}: ${stringify(item.value, depth)}`;
          case 'added':
            return `  ${indent}+ ${item.name}: ${stringify(item.value, depth)}`;
          case 'unchanged':
            return `  ${indent}  ${item.name}: ${stringify(item.value, depth)}`;
          case 'updated':
            return `  ${indent}- ${item.name}: ${stringify(item.value.file1, depth)}\n  ${indent}+ ${item.name}: ${stringify(item.value.file2, depth)}`;
          case 'updatedInside':
            return `  ${indent}  ${item.name}: ${iter(item.children, depth + 1)}`;
          default:
            throw new Error(`Unknown order state: '${item.type}'!`);
        }
      });
    return [
      '{',
      ...lines,
      `${indent}}`,
    ].join('\n');
  };
  return iter(difference, 1);
};

export default stylish;
