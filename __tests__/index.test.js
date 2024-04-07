import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';
import chooseFormater from '../src/formatters/index.js';
import { getFixturePath } from '../src/helpers.js';
import parseContent from '../src/parsers.js';

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
    const path1 = getFixturePath(fileName1);
    const path2 = getFixturePath(fileName2);
    const path3 = getFixturePath(fileName3);
    const content1 = parseContent(fs.readFileSync(path1), path.extname(path1).slice(1));
    const content2 = parseContent(fs.readFileSync(path2), path.extname(path2).slice(1));
    const diff = genDiff(content1, content2);
    expect(chooseFormater(diff, formatName)).toBe(fs.readFileSync(path3, 'utf-8'));
    expect(chooseFormater(diff, formatName)).toBe(fs.readFileSync(path3, 'utf-8'));
    expect(chooseFormater(diff, formatName)).toBe(fs.readFileSync(path3, 'utf-8'));
  });
});
