const path = require('node:path'); 
const fs = require('fs');

const gendiff = (filepath1, filepath2) => {
  console.log(path.resolve(filepath1));
  console.log(JSON.parse(fs.readFileSync(path.resolve(filepath1))));
  console.log(JSON.parse(fs.readFileSync(path.resolve(filepath2))));
  return path.resolve(filepath1)
}

export default gendiff;