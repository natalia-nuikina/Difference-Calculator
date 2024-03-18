import path from 'node:path'; 
import fs from 'fs';

const gendiff = (filepath1, filepath2) => {
  console.log(JSON.parse(fs.readFileSync(path.resolve(filepath1))));
  console.log(JSON.parse(fs.readFileSync(path.resolve(filepath2))));
  return;
}

export default gendiff;