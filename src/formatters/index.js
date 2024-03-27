import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormater = (file1, file2, diff, formatName) => {
  let result;
  if (formatName === 'plain') {
    result = plain(file1, file2, diff);
  } else {
    result = stylish(file1, file2, diff);
  }
  return result;
};

export default chooseFormater;
