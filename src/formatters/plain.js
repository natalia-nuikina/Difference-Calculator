import {
  getData, getName, getChildren, getValueFile1, getValueFile2, getType, getValue,
} from '../helpers.js';

const plain = (difference) => {
  const iter = (diff, depth) => {
    const lines = diff
      .flatMap((item) => {
        switch (getType(item)) {
          case 'removed':
            return `Property '${depth}${getName(item)}' was ${getType(item)}`;
          case 'added':
            return `Property '${depth}${getName(item)}' was ${getType(item)} with value: ${getData(getValue(item))}`;
          case 'updated':
            return `Property '${depth}${getName(item)}' was ${getType(item)}. From ${getData(getValueFile1(item))} to ${getData(getValueFile2(item))}`;
          case 'unchanged':
            return [];
          case 'updatedInside':
            return iter(getChildren(item), `${depth}${getName(item)}.`);
          default:
            throw new Error(`Unknown order state: '${getType(item)}'!`);
        }
      });
    return lines.join('\n');
  };
  return iter(difference, '');
};

export default plain;
