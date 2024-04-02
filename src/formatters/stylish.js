import {
  getLine, getString, getName, getChildren, getType, getValueFile1, getValueFile2, getValue,
} from '../helpers.js';

const stylish = (difference, replacer = '  ', spacesCount = 2) => {
  const iter = (diff, depth) => {
    const leftShiftLine = 1;
    const leftShiftBracket = 2;
    const indent = replacer.repeat(depth * spacesCount - leftShiftLine);
    const bracketIndent = replacer.repeat(depth * spacesCount - leftShiftBracket);
    const lines = diff
      .map((item) => {
        const charMinus = '-';
        const charPlus = '+';
        const charNull = ' ';
        // const children = getChildren(item);
        const value = getValue(item);
        switch (getType(item)) {
          case 'removed':
            return getLine(indent, getName(item), charMinus, getString(value, depth));
          case 'added':
            return getLine(indent, getName(item), charPlus, getString(value, depth));
          case 'unchanged':
            return getLine(indent, getName(item), charNull, getString(value, depth));
          case 'updated':
            return `${getLine(indent, getName(item), charMinus, getString(getValueFile1(item), depth))}\n${getLine(indent, getName(item), charPlus, getString(getValueFile2(item), depth))}`;
          case 'updatedInside':
            return getLine(indent, getName(item), charNull, iter(getChildren(item), depth + 1));
          default:
            throw new Error(`Unknown order state: '${getType(item)}'!`);
        }
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(difference, 1);
};

export default stylish;
