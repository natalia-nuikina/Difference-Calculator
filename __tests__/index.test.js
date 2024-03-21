import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiffJson', () => {
  expect(gendiff('file1.json', 'file2.json')).toBe(readFile('file.test.json'));
});

test('gendiffYml', () => {
  expect(gendiff('filepath1.yml', 'filepath2.yml')).toBe(readFile('file.test.json'));
});

test('gendiffDifferrrent', () => {
  expect(gendiff('filepath1.yml', 'file2.json')).toBe(readFile('file.test.json'));
});
