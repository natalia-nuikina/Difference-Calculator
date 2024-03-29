import fs from 'fs';
import genDiff from '../src/gendiff.js';
import chooseFormater from '../src/formatters/index.js';
import { getFixturePath } from '../src/helpers.js';

const readContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

const filePath1 = getFixturePath('file3.json');
const filePath2 = getFixturePath('file4.json');
const filePath3 = getFixturePath('file3.yml');
const filePath4 = getFixturePath('file4.yml');
const diff = genDiff(getFixturePath('file3.json'), getFixturePath('file4.json'));

test('genDiffStylish', () => {
  expect(chooseFormater(filePath1, filePath2, diff, 'stylish')).toBe(readContent('file2.test.txt'));
  expect(chooseFormater(filePath3, filePath4, diff, 'stylish')).toBe(readContent('file2.test.txt'));
  expect(chooseFormater(filePath1, filePath4, diff, 'stylish')).toBe(readContent('file2.test.txt'));
});

// test('genDiffPlain', () => {
//   expect(chooseFormater(filePath1, filePath2, diff, 'plain')).toBe(readContent('plain.test.txt'));
//   expect(chooseFormater(filePath3, filePath4, diff, 'plain')).toBe(readContent('plain.test.txt'));
//   expect(chooseFormater(filePath1, filePath4, diff, 'plain')).toBe(readContent('plain.test.txt'));
// });

// test('genDiffJson', () => {
//   expect(chooseFormater(filePath1, filePath2, diff, 'json')).toBe(readContent('json.test.json'));
//   expect(chooseFormater(filePath3, filePath4, diff, 'json')).toBe(readContent('yaml.test.json'));
// });
