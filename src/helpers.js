import _ from 'lodash';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '..', '__fixtures__', filename);
};

export const getLine = (currentIndent, key, char, funct) => `\n${currentIndent}${char} ${key}: ${funct}`;

export const getData = (value) => {
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

export const objectToString = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const keys = Object.keys(obj);
  const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
  const tab = '  ';
  let result = '{\n';
  const b = sortedKeys.map((item) => {
    const currentValue = obj[item];
    return `${tab.repeat(depth * 2 + 2)}${item}: ${objectToString(currentValue, depth + 1)}`;
  });
  result += b.join('\n');
  result += `\n${tab.repeat(depth * 2)}}`;
  return result;
};
