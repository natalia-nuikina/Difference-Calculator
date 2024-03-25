import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiffTreeJson', () => {
  expect(gendiff('file3.json', 'file4.json')).toBe(readFile('file2.test.txt'));
});

// test('gendiffTreeYaml', () => {
//   expect(gendiff('file3.yml', 'file4.yml')).toBe(readFile('file2.test.txt'));
// });

// test('gendiffTreeDifferent', () => {
//   expect(gendiff('file3.yml', 'file4.json')).toBe(readFile('file2.test.txt'));
// });
