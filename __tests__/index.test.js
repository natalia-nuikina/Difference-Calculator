import fs from 'fs';
import genDiff from '../src/index.js';
import chooseFormater from '../src/formatters/index.js';
import { getFixturePath } from '../src/helpers.js';

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1 = getFixturePath('file3.json');
const file2 = getFixturePath('file4.json');
const file3 = getFixturePath('file3.yml');
const file4 = getFixturePath('file4.yml');
const diff = genDiff(getFixturePath('file3.json'), getFixturePath('file4.json'));

test('genDiffStylish', () => {
  expect(chooseFormater(file1, file2, diff, 'stylish')).toBe(readFile('file2.test.txt'));
  expect(chooseFormater(file3, file4, diff, 'stylish')).toBe(readFile('file2.test.txt'));
  expect(chooseFormater(file1, file4, diff, 'stylish')).toBe(readFile('file2.test.txt'));
});

test('genDiffPlain', () => {
  expect(chooseFormater(file1, file2, diff, 'plain')).toBe(readFile('plain.test.txt'));
  expect(chooseFormater(file3, file4, diff, 'plain')).toBe(readFile('plain.test.txt'));
  expect(chooseFormater(file1, file4, diff, 'plain')).toBe(readFile('plain.test.txt'));
});

test('genDiffJson', () => {
  expect(chooseFormater(file1, file2, diff, 'json')).toBe(readFile('json.test.json'));
  expect(chooseFormater(file3, file4, diff, 'json')).toBe(readFile('yaml.test.json'));
});
