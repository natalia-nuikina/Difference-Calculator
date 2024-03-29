import {
  getData, getName, getChildren, getValueBefore, getValueAfter, getType,
} from '../helpers.js';

const plain = (differents) => {
  // console.log(differents)
  const iter = (diff, depth) => {
    const lines = diff
      .flatMap((item) => {
        switch (getType(item)) {
          case 'removed':
            return `Property '${depth}${getName(item)}' was ${getType(item)}`;
          case 'added':
            return `Property '${depth}${getName(item)}' was ${getType(item)} with value: ${getData(getChildren(item))}`;
          case 'updated':
            return `Property '${depth}${getName(item)}' was ${getType(item)}. From ${getData(getValueBefore(item))} to ${getData(getValueAfter(item))}`;
          case 'unchanged':
            return [];
          case 'updatedInside':
            return iter(getChildren(item), `${depth}${getName(item)}.`);
          default:
            throw new Error(`Unknown order state: '${getType(item)}'!`);
        }
        // }
      });
    return lines.join('\n');
  };
  return iter(differents, '');
};

export default plain;
