import _ from 'lodash';
import { getLine } from '../helpers.js';

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

const stylish = (difference, replacer = '  ', spacesCount = 2) => {
  const iter = (diff, depth) => {
    const leftShiftLine = 2;
    const indent = replacer.repeat(depth * spacesCount - leftShiftLine);
    const lines = diff
      .map((item) => {
        const charMinus = '-';
        const charPlus = '+';
        const charNull = ' ';
        switch (item.type) {
          case 'removed':
            return getLine(indent, item.name, charMinus, stringify(item.value, depth));
          case 'added':
            return getLine(indent, item.name, charPlus, stringify(item.value, depth));
          case 'unchanged':
            return getLine(indent, item.name, charNull, stringify(item.value, depth));
          case 'updated':
            return `${getLine(indent, item.name, charMinus, stringify(item.value.file1, depth))}\n${getLine(indent, item.name, charPlus, stringify(item.value.file2, depth))}`;
          case 'updatedInside':
            return getLine(indent, item.name, charNull, iter(item.children, depth + 1));
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
