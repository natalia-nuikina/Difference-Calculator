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

export const getLine = (currentIndent, key, char, value) => `${currentIndent}${char} ${key}: ${value}`;

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

export const getString = (value, depth) => {
  const iter = (obj, depthIter) => {
    const tab = '  ';
    const indent = tab.repeat(depthIter * 2 + 2);
    const bracketIndent = tab.repeat(depthIter * 2);
    if (!_.isObject(obj)) {
      return obj;
    }
    const keys = Object.keys(obj);
    const sortedKeys = keys.toSorted();
    const lines = sortedKeys.map((item) => {
      const currentValue = obj[item];
      return `${indent}${item}: ${getString(currentValue, depthIter + 1)}`;
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, depth);
};

export const getName = (obj) => obj.name;
export const getChildren = (obj) => obj.children;
export const getValue = (obj) => obj.value;
export const getType = (obj) => obj.type;
export const getValueFile1 = (obj) => obj.value.file1;
export const getValueFile2 = (obj) => obj.value.file2;
