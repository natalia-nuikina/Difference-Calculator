import fs from 'fs';
import gendiff from '../src/index.js';
import chooseFormater from '../src/formatters/index.js';
import { getFixturePath } from '../src/helpers.js';

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const diff = gendiff('file3.json', 'file4.json');

test('gendiffStylish', () => {
  expect(chooseFormater('file3.json', 'file4.json', diff, 'stylish')).toBe(readFile('file2.test.txt'));
  expect(chooseFormater('file3.yml', 'file4.yml', diff, 'stylish')).toBe(readFile('file2.test.txt'));
  expect(chooseFormater('file3.yml', 'file4.json', diff, 'stylish')).toBe(readFile('file2.test.txt'));
});

test('gendiffPlain', () => {
  expect(chooseFormater('file3.json', 'file4.json', diff, 'plain')).toBe(readFile('plain.test.txt'));
  expect(chooseFormater('file3.yml', 'file4.yml', diff, 'plain')).toBe(readFile('plain.test.txt'));
  expect(chooseFormater('file3.yml', 'file4.json', diff, 'plain')).toBe(readFile('plain.test.txt'));
});
