import _ from 'lodash';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import fs from 'fs';

export const getFixturePath = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '..', '__fixtures__', fileName);
};

export const readContent = (filePath) => fs.readFileSync(resolve(process.cwd(), filePath));

export const getLine = (currentIndent, key, char, value) => `\n${currentIndent}${char} ${key}: ${value}`;

export const getData = (value) => {
  switch (typeof (value)) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return (value === null) ? value : '[complex value]';
    default:
      return value;
  }
};

export const objectToString = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const keys = Object.keys(obj);
  const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
  const tab = '  ';
  let result = '{\n';
  const lines = sortedKeys.map((item) => {
    const currentValue = obj[item];
    return `${tab.repeat(depth * 2 + 2)}${item}: ${objectToString(currentValue, depth + 1)}`;
  });
  result += lines.join('\n');
  result += `\n${tab.repeat(depth * 2)}}`;
  return result;
};
