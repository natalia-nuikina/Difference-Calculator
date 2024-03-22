import path from 'path';
// import cwd from 'node:process';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

// const configPath = 'path/to/eslint';
// const format = path.extname(configPath);
// const data = fs.readSync(configPath);

// Выбирается функция-парсер в зависимости от расширения файла

const parseFile = (file) => {
  const format = path.extname(file);

  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(fs.readFileSync(path.resolve('./__fixtures__', file)));
};

export default parseFile;
