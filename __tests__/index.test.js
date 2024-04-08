import start from '../src/index.js';
import { readContent, getFixturePath } from '../src/helpers.js';

describe('genDiff', () => {
  test.each([
    ['file1.json', 'file2.json', 'stylish', 'stylish.test.txt'],
    ['file1.yml', 'file2.yml', 'stylish', 'stylish.test.txt'],
    ['file1.json', 'file2.yml', 'stylish', 'stylish.test.txt'],
    ['file1.json', 'file2.json', 'plain', 'plain.test.txt'],
    ['file1.json', 'file2.json', 'json', 'json.test.json'],
  ])('.genDiff', (fileName1, fileName2, formatName, fileName3) => {
    expect(start(getFixturePath(fileName1), getFixturePath(fileName2), formatName))
      .toBe(readContent(getFixturePath(fileName3)));
  });
});
describe('default', () => {
  test('default', () => {
    expect(start(getFixturePath('file1.json'), getFixturePath('file2.json')))
      .toBe(readContent(getFixturePath('stylish.test.txt')));
  });
});
