import fs from 'fs';
import genDiff from '../src/gendiff.js';
import chooseFormater from '../src/formatters/index.js';
import { getFixturePath } from '../src/helpers.js';
import parseContent from '../src/parsers.js';

const readContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

const jsonContent1 = parseContent(readContent('file3.json'), 'json');
const jsonContent2 = parseContent(readContent('file4.json'), 'json');
const yamlContent1 = parseContent(readContent('file3.yml'), 'yml');
const yamlContent2 = parseContent(readContent('file4.yml'), 'yml');

const diffJson = genDiff(jsonContent1, jsonContent2);
const diffYaml = genDiff(yamlContent1, yamlContent2);
const diffMixJsonYaml = genDiff(jsonContent1, yamlContent2);

describe('genDiff', () => {
  test.each([
    [diffJson],
    [diffYaml],
    [diffMixJsonYaml],
  ])('.genDiff', (diff) => {
    expect(chooseFormater(diff, 'stylish')).toBe(readContent('file2.test.txt'));
    expect(chooseFormater(diff, 'plain')).toBe(readContent('plain.test.txt'));
    expect(chooseFormater(diff, 'json')).toBe(readContent('json.test.json'));
  });
});
