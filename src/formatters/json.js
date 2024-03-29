import _ from 'lodash';
import assignment from 'assignment';
import {
  getName, getChildren, getType,
} from '../helpers.js';

const json = (difference) => {
  const iter = (diff) => {
    if (_.isObject(diff)) {
      return diff;
    }
    const lines = diff
      .map((item) => {
        const message = {};
        const child = (_.isObject(getChildren(item))) ? iter(getChildren(item)) : getChildren(item);
        return assignment(message, { name: getName(item), type: getType(item), value: child });
      });
    return lines;
  };
  return JSON.stringify(iter(difference), null, '  ');
};

export default json;
