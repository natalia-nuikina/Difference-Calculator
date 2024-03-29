import _ from 'lodash';
import { getLine, getString } from '../helpers.js';

const getName = (obj) => obj.name;
const getChildren = (obj) => _.cloneDeep(obj.children);
const getType = (obj) => obj.type;
const getValueBefore = (obj) => obj.children.before;
const getValueAfter = (obj) => obj.children.after;

const stylish = (differents, replacer = '  ', spacesCount = 2) => {
  const iter = (diff, depth) => {
    const leftShiftLine = 1;
    const leftShiftBracket = 2;
    const indent = replacer.repeat(depth * spacesCount - leftShiftLine);
    const bracketIndent = replacer.repeat(depth * spacesCount - leftShiftBracket);
    // console.log(diff)
    const lines = diff
      .map((key) => {
        const charMinus = '-';
        const charPlus = '+';
        const charNull = ' ';
        const children = getChildren(key);
        switch (getType(key)) {
          case 'removed':
            return getLine(indent, getName(key), charMinus, getString(children, depth));
          case 'added':
            return getLine(indent, getName(key), charPlus, getString(children, depth));
          case 'unchanged':
            return getLine(indent, getName(key), charNull, getString(children, depth));
          case 'updated':
            return `${getLine(indent, getName(key), charMinus, getString(getValueBefore(key), depth))}\n${getLine(indent, getName(key), charPlus, getString(getValueAfter(key)))}`;
          case 'updatedInside':
            return getLine(indent, getName(key), charNull, iter(getChildren(key), depth + 1));
          default:
            throw new Error(`Unknown order state: '${diff[key]}'!`);
        }
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(differents, 1);
};

export default stylish;
