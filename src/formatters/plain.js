import _ from 'lodash';

const getData = (value) => {
  let result;
  if (typeof (value) === 'string') {
    result = `'${value}'`;
  } else if (typeof (value) === 'object') {
    if (value === null) {
      result = value;
    } else {
      result = '[complex value]';
    }
  } else {
    result = value;
  }
  return result;
};

const plain = (file1, file2, differents) => {
  let res = '';
  const iter = (currentFile1, currentFile2, diff, depth) => {
    Object.keys(diff)
      .map((key) => {
        const curValue1 = currentFile1[key];
        const curValue2 = currentFile2[key];
        let path = key;
        if (_.isObject(diff[key])) {
          const collectionPath = `${depth}${[key]}.`;
          path = iter(curValue1, curValue2, diff[key], collectionPath);
        }
        if (diff[key] === 'removed') {
          res += `\nProperty '${depth}${path}' was ${diff[key]}`;
        } else if (diff[key] === 'added') {
          res += `\nProperty '${depth}${path}' was ${diff[key]} with value: ${getData(curValue2)}`;
        } else if (diff[key] === 'updated') {
          res += `\nProperty '${depth}${path}' was ${diff[key]}. From ${getData(curValue1)} to ${getData(curValue2)}`;
        }
        return res;
      });
    // console.log(res)
    return res;
  };
  return iter(file1, file2, differents, '').slice(1);
};

export default plain;
