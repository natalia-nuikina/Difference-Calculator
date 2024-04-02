import _ from 'lodash';

const json = (difference) => {
  const iter = (diff) => {
    if (_.isObject(diff)) {
      return diff;
    }
    const lines = diff
      .map((item) => {
        const child = (_.isObject(item.children)) ? iter(item.children) : item.children;
        return { name: item.name, type: item.type, value: child };
      });
    return lines;
  };
  return JSON.stringify(iter(difference), null, '  ');
};

export default json;
