import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';
import chooseFormater from '../src/formatters/index.js';
import { getFixturePath } from '../src/helpers.js';
import parseContent from '../src/parsers.js';

describe('genDiff', () => {
  test.each([
    [getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish', getFixturePath('stylish.test.txt')],
    [getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish', getFixturePath('stylish.test.txt')],
    [getFixturePath('file1.json'), getFixturePath('file2.yml'), 'stylish', getFixturePath('stylish.test.txt')],
    [getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain', getFixturePath('plain.test.txt')],
    [getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain', getFixturePath('plain.test.txt')],
    [getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain', getFixturePath('plain.test.txt')],
    [getFixturePath('file1.json'), getFixturePath('file2.json'), 'json', getFixturePath('json.test.json')],
    [getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json', getFixturePath('json.test.json')],
    [getFixturePath('file1.json'), getFixturePath('file2.yml'), 'json', getFixturePath('json.test.json')],
  ])('.genDiff', (path1, path2, formatName, path3) => {
    const content1 = parseContent(fs.readFileSync(path1), path.extname(path1).slice(1));
    const content2 = parseContent(fs.readFileSync(path2), path.extname(path2).slice(1));
    const diff = genDiff(content1, content2);
    expect(chooseFormater(diff, formatName)).toBe(fs.readFileSync(path3, 'utf-8'));
    expect(chooseFormater(diff, formatName)).toBe(fs.readFileSync(path3, 'utf-8'));
    expect(chooseFormater(diff, formatName)).toBe(fs.readFileSync(path3, 'utf-8'));
  });
});
