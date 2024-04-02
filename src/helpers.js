import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import fs from 'fs';

export const getFixturePath = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '..', '__fixtures__', fileName);
};

export const readContent = (filePath) => fs.readFileSync(resolve(process.cwd(), filePath));

export const getLine = (currentIndent, key, char, value) => `${currentIndent}${char} ${key}: ${value}`;
