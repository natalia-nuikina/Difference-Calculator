import _ from 'lodash';
import parseContent from '../parsers.js';
import { getData } from '../helpers.js';

const plain = (filePath1, filePath2, differents) => {
  const currentContent1 = parseContent(filePath1);
  const currentContent2 = parseContent(filePath2);

  let res = '';
  const iter = (content1, content2, diff, depth) => {
    Object.keys(diff)
      .map((key) => {
        const curValue1 = content1[key];
        const curValue2 = content2[key];
        let path = key;
        if (_.isObject(diff[key])) {
          const collectionPath = `${depth}${[key]}.`;
          path = iter(curValue1, curValue2, diff[key], collectionPath);
        } else {
          switch (diff[key]) {
            case 'removed':
              res += `\nProperty '${depth}${path}' was ${diff[key]}`;
              break;
            case 'added':
              res += `\nProperty '${depth}${path}' was ${diff[key]} with value: ${getData(curValue2)}`;
              break;
            case 'updated':
              res += `\nProperty '${depth}${path}' was ${diff[key]}. From ${getData(curValue1)} to ${getData(curValue2)}`;
              break;
            case 'unchanged':
              break;
            default:
              throw new Error(`Unknown order state: '${diff[key]}'!`);
          }
        }
        return res;
      });
    return res;
  };
  return iter(currentContent1, currentContent2, differents, '').slice(1);
};

export default plain;
