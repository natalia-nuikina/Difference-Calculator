import fs from 'fs';
import genDiff from '../src/gendiff.js';
import chooseFormater from '../src/formatters/index.js';
import { getFixturePath } from '../src/helpers.js';
import parseContent from '../src/parsers.js';

const readContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

const filePath1 = getFixturePath('file3.json');
const filePath2 = getFixturePath('file4.json');
const filePath3 = getFixturePath('file3.yml');
const filePath4 = getFixturePath('file4.yml');
const currentContent1 = parseContent(filePath1);
const currentContent2 = parseContent(filePath2);
const diff = genDiff(currentContent1, currentContent2);

describe('genDiff', () => {
  test.each([
    [filePath1, filePath2, diff],
    [filePath3, filePath4, diff],
    [filePath1, filePath4, diff],
  ])('.genDiff(%p, %p)', (a, b, c) => {
    expect(chooseFormater(a, b, c, 'stylish')).toBe(readContent('file2.test.txt'));
    expect(chooseFormater(a, b, c, 'plain')).toBe(readContent('plain.test.txt'));
    expect(chooseFormater(a, b, c, 'json')).toBe(readContent('json.test.json'));
  });
});
