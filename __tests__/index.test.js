import start from '../src/index.js';
import { readContent, getFixturePath } from '../src/helpers.js';

describe('genDiff', () => {
  test.each([
    ['file1.json', 'file2.json', 'stylish', 'stylish.test.txt'],
    ['file1.yml', 'file2.yml', 'stylish', 'stylish.test.txt'],
    ['file1.json', 'file2.yml', 'stylish', 'stylish.test.txt'],
    ['file1.json', 'file2.json', 'plain', 'plain.test.txt'],
    ['file1.yml', 'file2.yml', 'plain', 'plain.test.txt'],
    ['file1.json', 'file2.yml', 'plain', 'plain.test.txt'],
    ['file1.json', 'file2.json', 'json', 'json.test.json'],
    ['file1.yml', 'file2.yml', 'json', 'json.test.json'],
    ['file1.json', 'file2.yml', 'json', 'json.test.json'],
  ])('.genDiff', (fileName1, fileName2, formatName, fileName3) => {
    expect(start(getFixturePath(fileName1), getFixturePath(fileName2), formatName))
      .toBe(readContent(getFixturePath(fileName3)));
  });
});
